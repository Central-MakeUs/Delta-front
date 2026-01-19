export type View = "calendar" | "yearMonth" | "year";

export interface Transition {
  from: View;
  to: View;
}

import * as sharedStyles from "../date-picker.css";

type Anim =
  | typeof sharedStyles.enterFromLeft
  | typeof sharedStyles.enterFromRight
  | typeof sharedStyles.exitToLeft
  | typeof sharedStyles.exitToRight;

export const getPanelAnimClass = (
  view: View,
  transition: Transition | null
) => {
  if (!transition) return undefined;

  const isFrom = transition.from === view;
  const isTo = transition.to === view;
  if (!isFrom && !isTo) return undefined;

  const from = transition.from;
  const to = transition.to;

  if (
    (from === "year" && to === "yearMonth") ||
    (from === "yearMonth" && to === "year")
  ) {
    return undefined;
  }

  const isCalendarToYearMonth = from === "calendar" && to === "yearMonth";
  const isYearMonthToCalendar = from === "yearMonth" && to === "calendar";

  if (isCalendarToYearMonth) {
    if (isTo) return sharedStyles.enterFromRight as Anim;
    if (isFrom) return sharedStyles.exitToLeft as Anim;
  }

  if (isYearMonthToCalendar) {
    if (isTo) return sharedStyles.enterFromLeft as Anim;
    if (isFrom) return sharedStyles.exitToRight as Anim;
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
