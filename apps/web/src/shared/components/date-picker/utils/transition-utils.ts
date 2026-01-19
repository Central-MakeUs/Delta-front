import * as styles from "../date-picker.css";

export type View = "calendar" | "yearMonth" | "year";
export type TransitionDir = "left" | "right";

export interface Transition {
  from: View;
  to: View;
  dir: TransitionDir;
}

export const getPanelAnimClass = (
  view: View,
  transition: Transition | null
) => {
  if (!transition) return undefined;
  const isFrom = transition.from === view;
  const isTo = transition.to === view;
  if (!isFrom && !isTo) return undefined;

  if (transition.dir === "right") {
    // next enters from right, current exits to left
    if (isTo) return styles.enterFromRight;
    if (isFrom) return styles.exitToLeft;
  } else {
    // next enters from left, current exits to right
    if (isTo) return styles.enterFromLeft;
    if (isFrom) return styles.exitToRight;
  }
  return undefined;
};

export const getTargetView = (
  transition: Transition | null,
  isYearPickerOpen: boolean,
  isYearMonthPickerOpen: boolean
): View => {
  if (transition) return transition.to;
  if (isYearPickerOpen) return "year";
  if (isYearMonthPickerOpen) return "yearMonth";
  return "calendar";
};
