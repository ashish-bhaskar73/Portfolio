export type Theme = "light" | "dark";

// Page background per theme; keep in sync with --background in app/globals.css.
// Used for the mobile browser bar (theme-color).
export const BAR_COLOR: Record<Theme, string> = { light: "#fdfdfd", dark: "#0c0d10" };
