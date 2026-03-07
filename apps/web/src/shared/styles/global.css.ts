import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("html, body", {
  height: "100%",
  margin: 0,
  overflow: "hidden",
  fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
});

globalStyle("body", {
  background: "#eeeeee",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
  WebkitTouchCallout: "none",
});

export const rootStyle = style({
  width: "100%",
  maxWidth: "430px",
  minWidth: "370px",
  height: "100dvh",
  overflowY: "auto",
  overscrollBehavior: "none",
  WebkitOverflowScrolling: "touch",
  backgroundColor: "#ffffff",
  margin: "0 auto",

  "@media": {
    "(min-width: 431px)": {
      boxShadow: "0 0 16px rgba(0,0,0,0.2)",
    },
  },
});

globalStyle("img", {
  userSelect: "none",
  WebkitUserSelect: "none",
  WebkitTouchCallout: "none",
  ...{ WebkitUserDrag: "none" },
});
