import { createTheme, createThemeContract } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: { bg: null, fg: null, brand: null, muted: null, border: null },
  space: { 0: null, 2: null, 3: null, 4: null, 6: null },
  radius: { sm: null, md: null, lg: null },
});

export const lightTheme = createTheme(vars, {
  color: {
    bg: "#fff",
    fg: "#111827",
    brand: "#448081",
    muted: "#F3F4F6",
    border: "#E5E7EB",
  },
  space: { 0: "0", 2: "8px", 3: "12px", 4: "16px", 6: "24px" },
  radius: { sm: "8px", md: "12px", lg: "16px" },
});
