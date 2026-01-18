import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/shared/styles/theme.css";
import { typo } from "@/shared/styles/typography.css";

export const formSection = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "24px",
});

export const fieldGroup = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "12px",
  width: "100%",
});

export const fieldLabel = style([
  typo.body2.semibold,
  {
    color: vars.color.grayscale[700],
  },
]);

export const inputWrapper = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  width: "100%",
});

export const textFieldContainer = style({
  width: "100%",
});

export const dateFieldContainer = style({
  width: "100%",
  flex: 1,
});

const containerClass = String(textFieldContainer).split(" ")[0] || "";
const containerSelector = containerClass ? `.${containerClass}` : "";

const dateContainerClass = String(dateFieldContainer).split(" ")[0] || "";
const dateContainerSelector = dateContainerClass ? `.${dateContainerClass}` : "";

if (containerSelector) {
  globalStyle(`${containerSelector} > div`, {
    border: "none !important",
    padding: "0 !important",
    backgroundColor: "transparent !important",
    minHeight: "auto !important",
    maxHeight: "none !important",
  });

  globalStyle(`${containerSelector} textarea`, {
    padding: "0 !important",
    height: "24px !important",
    minHeight: "24px !important",
    maxHeight: "24px !important",
  });
}

// 생년월일 필드의 prefix를 오른쪽 정렬
if (dateContainerSelector) {
  globalStyle(`${dateContainerSelector} > div`, {
    border: "none !important",
    padding: "0 !important",
    backgroundColor: "transparent !important",
    minHeight: "auto !important",
    maxHeight: "none !important",
  });

  globalStyle(`${dateContainerSelector} textarea`, {
    padding: "0 !important",
    height: "24px !important",
    minHeight: "24px !important",
    maxHeight: "24px !important",
  });

  // textareaWrapper를 row 방향으로 변경하고 prefix를 오른쪽에 배치
  globalStyle(`${dateContainerSelector} > div > div`, {
    flexDirection: "row",
    alignItems: "center",
  });

  // prefix를 오른쪽에 배치
  globalStyle(`${dateContainerSelector} > div > div > div:first-child`, {
    order: 2,
    marginLeft: "auto",
  });

  // textarea를 왼쪽에 배치
  globalStyle(`${dateContainerSelector} > div > div > textarea`, {
    order: 1,
  });
}
