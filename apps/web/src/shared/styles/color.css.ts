import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const color = {
  // Main Color
  "main-50": style({ color: vars.color.main[50] }),
  "main-100": style({ color: vars.color.main[100] }),
  "main-200": style({ color: vars.color.main[200] }),
  "main-300": style({ color: vars.color.main[300] }),
  "main-400": style({ color: vars.color.main[400] }),
  "main-500": style({ color: vars.color.main[500] }),
  "main-600": style({ color: vars.color.main[600] }),
  "main-700": style({ color: vars.color.main[700] }),
  "main-800": style({ color: vars.color.main[800] }),
  "main-900": style({ color: vars.color.main[900] }),
  // Grayscale Color
  "grayscale-0": style({ color: vars.color.grayscale[0] }),
  "grayscale-50": style({ color: vars.color.grayscale[50] }),
  "grayscale-100": style({ color: vars.color.grayscale[100] }),
  "grayscale-200": style({ color: vars.color.grayscale[200] }),
  "grayscale-300": style({ color: vars.color.grayscale[300] }),
  "grayscale-400": style({ color: vars.color.grayscale[400] }),
  "grayscale-500": style({ color: vars.color.grayscale[500] }),
  "grayscale-600": style({ color: vars.color.grayscale[600] }),
  "grayscale-700": style({ color: vars.color.grayscale[700] }),
  "grayscale-800": style({ color: vars.color.grayscale[800] }),
  "grayscale-900": style({ color: vars.color.grayscale[900] }),
  "grayscale-1000": style({ color: vars.color.grayscale[1000] }),
  // Overlay Color
  "overDim-40": style({ color: vars.color.overDim[40] }),
  // Success Color
  "success-100": style({ color: vars.color.success[100] }),
  "success-500": style({ color: vars.color.success[500] }),
  "success-700": style({ color: vars.color.success[700] }),
  // Warning Color
  "warning-100": style({ color: vars.color.warning[100] }),
  "warning-500": style({ color: vars.color.warning[500] }),
  "warning-600": style({ color: vars.color.warning[600] }),
  // Error Color
  "error-100": style({ color: vars.color.error[100] }),
  "error-500": style({ color: vars.color.error[500] }),
  "error-700": style({ color: vars.color.error[700] }),
  // ETC Color
  "login-kakao": style({ color: vars.color.login.kakao }),
  "etc-crown": style({ color: vars.color.etc.crown }),
};

export const bgColor = {
  // Main Background Color
  "main-50": style({ backgroundColor: vars.color.main[50] }),
  "main-100": style({ backgroundColor: vars.color.main[100] }),
  "main-200": style({ backgroundColor: vars.color.main[200] }),
  "main-300": style({ backgroundColor: vars.color.main[300] }),
  "main-400": style({ backgroundColor: vars.color.main[400] }),
  "main-500": style({ backgroundColor: vars.color.main[500] }),
  "main-600": style({ backgroundColor: vars.color.main[600] }),
  "main-700": style({ backgroundColor: vars.color.main[700] }),
  "main-800": style({ backgroundColor: vars.color.main[800] }),
  "main-900": style({ backgroundColor: vars.color.main[900] }),
  // Grayscale Background Color
  "grayscale-0": style({ backgroundColor: vars.color.grayscale[0] }),
  "grayscale-50": style({ backgroundColor: vars.color.grayscale[50] }),
  "grayscale-100": style({ backgroundColor: vars.color.grayscale[100] }),
  "grayscale-200": style({ backgroundColor: vars.color.grayscale[200] }),
  "grayscale-300": style({ backgroundColor: vars.color.grayscale[300] }),
  "grayscale-400": style({ backgroundColor: vars.color.grayscale[400] }),
  "grayscale-500": style({ backgroundColor: vars.color.grayscale[500] }),
  "grayscale-600": style({ backgroundColor: vars.color.grayscale[600] }),
  "grayscale-700": style({ backgroundColor: vars.color.grayscale[700] }),
  "grayscale-800": style({ backgroundColor: vars.color.grayscale[800] }),
  "grayscale-900": style({ backgroundColor: vars.color.grayscale[900] }),
  "grayscale-1000": style({ backgroundColor: vars.color.grayscale[1000] }),
  // Overlay Color
  "overDim-40": style({ backgroundColor: vars.color.overDim[40] }),
  // Success Background Color
  "success-100": style({ backgroundColor: vars.color.success[100] }),
  "success-500": style({ backgroundColor: vars.color.success[500] }),
  "success-700": style({ backgroundColor: vars.color.success[700] }),
  // Warning Background Color
  "warning-100": style({ backgroundColor: vars.color.warning[100] }),
  "warning-500": style({ backgroundColor: vars.color.warning[500] }),
  "warning-600": style({ backgroundColor: vars.color.warning[600] }),
  // Error Background Color
  "error-100": style({ backgroundColor: vars.color.error[100] }),
  "error-500": style({ backgroundColor: vars.color.error[500] }),
  "error-700": style({ backgroundColor: vars.color.error[700] }),
  // ETC Color
  "login-kakao": style({ backgroundColor: vars.color.login.kakao }),
  "etc-crown": style({ backgroundColor: vars.color.etc.crown }),
};

export const myGradient = {
  "my-bg": vars.color.etc.myGradient,
} as const;

export const bgGradient = {
  "login-bg": vars.color.login.bgGradient,
} as const;

export const wrongCardGradient = {
  "wrong-card-gradient": vars.color.etc.wrongCardGradient,
} as const;
