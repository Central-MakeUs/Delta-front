import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("html, body", {
  height: "100%",
  margin: 0,
  fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
});

globalStyle("body", {
  background: "#eeeeee",
});

export const rootStyle = style({
  width: "100%",
  maxWidth: "430px",
  minWidth: "370px",
  minHeight: "100dvh",
  backgroundColor: "#ffffff",
  margin: "0 auto",

  "@media": {
    "(min-width: 431px)": {
      boxShadow: "0 0 16px rgba(0,0,0,0.2)",
    },
  },
});
