import { ogSize, renderPostOg } from "../og";
import { getPost } from "../posts";

const slug = "engineering-2tb-file-transfers";

export const alt = getPost(slug)?.title ?? "Blog post";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderPostOg(slug);
}
