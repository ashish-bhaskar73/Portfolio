"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile } from "../../lib/data";

/*
 * "Living photo": depth-map parallax on the hero portrait.
 *
 * A grayscale depth map (white = near, black = far; generated once with
 * Depth Anything V2) tells a fragment shader how far to shift each pixel as
 * the pointer moves. Near pixels and far pixels shift in opposite directions
 * around the `FOCUS` plane, which the eye reads as 3D.
 *
 * Progressive enhancement: the plain <Image> always renders (SEO, LCP,
 * no-JS). The canvas fades in on top only once WebGL works and both textures
 * have loaded. Reduced motion → no canvas at all.
 */

const PHOTO_SRC = profile.photo;
const DEPTH_SRC = "/ashish-headshot-depth.png";

const STRENGTH = 0.03; // max UV shift; raise for more 3D, lower if it wobbles
// Depth that stays still. Measured on the depth map: face ≈ 0.71, arm ≈ 0.81,
// wall ≈ 0.45, skyline ≈ 0.00 — so the face is anchored and the room orbits it.
const FOCUS = 0.7;
const EASE = 0.08; // pointer smoothing per frame (0..1)

const VERT = `
attribute vec2 p;
varying vec2 uv;
void main() {
  uv = vec2(p.x * 0.5 + 0.5, 0.5 - p.y * 0.5); // clip space → image UV (top-left origin)
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
varying vec2 uv;
uniform sampler2D photo;
uniform sampler2D depth;
uniform vec2 pointer;   // -1..1 on each axis
uniform float strength;
uniform float focus;
void main() {
  float d = texture2D(depth, uv).r;                          // 0 far .. 1 near
  vec2 st = clamp(uv + (d - focus) * pointer * strength, 0.0, 1.0);
  gl_FragColor = texture2D(photo, st);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function texture(gl: WebGLRenderingContext, img: HTMLImageElement, unit: number) {
  const t = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, t);
  // Non-power-of-two images in WebGL1 require CLAMP + no mipmaps.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  return t;
}

export default function DepthPortrait({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const photoRef = useRef<HTMLImageElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const photoEl = photoRef.current;
    if (!canvas || !photoEl) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return; // no WebGL → plain photo stays

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // One full-screen quad (two triangles as a strip).
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uPointer = gl.getUniformLocation(prog, "pointer");
    gl.uniform1f(gl.getUniformLocation(prog, "strength"), STRENGTH);
    gl.uniform1f(gl.getUniformLocation(prog, "focus"), FOCUS);

    const noHover = matchMedia("(hover: none)").matches;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    let loaded = false;
    let onScreen = true;
    let disposed = false;

    const draw = () => {
      gl.uniform2f(uPointer, cur.x, cur.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const frame = (t: number) => {
      raf = 0;
      if (noHover) {
        // Phones: slow drift, two different periods so it never looks looped.
        target.x = Math.sin((t / 8000) * Math.PI * 2) * 0.6;
        target.y = Math.cos((t / 11000) * Math.PI * 2) * 0.35;
      }
      cur.x += (target.x - cur.x) * EASE;
      cur.y += (target.y - cur.y) * EASE;
      draw();
      start();
    };

    // Only animate while loaded, on screen, and in a visible tab.
    const start = () => {
      if (!raf && loaded && onScreen && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (loaded) draw();
    };

    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);
    if (!noHover) window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    // Texture from the <img> already on the page: it holds the optimised size
    // the browser picked. Loading PHOTO_SRC again fetched the raw 808 KB PNG.
    Promise.all([photoEl.decode().then(() => photoEl), loadImage(DEPTH_SRC)])
      .then(([photo, depth]) => {
        if (disposed) return;
        texture(gl, photo, 0);
        texture(gl, depth, 1);
        gl.uniform1i(gl.getUniformLocation(prog, "photo"), 0);
        gl.uniform1i(gl.getUniformLocation(prog, "depth"), 1);
        loaded = true;
        resize();
        setReady(true);
        start();
      })
      .catch(() => {
        /* a texture failed → keep the plain photo */
      });

    return () => {
      disposed = true;
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className={`feather relative ${className}`}>
      <Image
        ref={photoRef}
        src={PHOTO_SRC}
        alt={`Portrait of ${profile.name}`}
        width={748}
        height={841}
        priority
        sizes="(min-width: 768px) 36vw, 78vw"
        className="w-full h-auto"
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
