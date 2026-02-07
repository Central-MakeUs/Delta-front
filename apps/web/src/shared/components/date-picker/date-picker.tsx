"use client";

import clsx from "clsx";
import * as styles from "@/shared/components/date-picker/date-picker.css";
import { CalendarView } from "@/shared/components/date-picker/components/calendar-view/calendar-view";
import { YearMonthPicker } from "@/shared/components/date-picker/components/year-month-picker/year-month-picker";
import { YearPicker } from "@/shared/components/date-picker/components/year-picker/year-picker";
import { useViewStackHeight } from "@/shared/components/date-picker/hooks/use-view-stack-height";
import { useDatePickerState } from "@/shared/components/date-picker/hooks/use-date-picker-state";
import { useDatePickerHandlers } from "@/shared/components/date-picker/hooks/use-date-picker-handlers";
import { useDatePickerEffects } from "@/shared/components/date-picker/hooks/use-date-picker-effects";
import {
  getDaysInMonth,
  isSelectedDate,
  isToday,
  getYearList,
} from "@/shared/components/date-picker/utils/date-utils";
import {
  getPanelAnimClass,
  getTargetView,
} from "@/shared/components/date-picker/utils/transition-utils";

export interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  className?: string;
  overlayClassName?: string;
}

export const DatePicker = ({
  isOpen,
  onClose,
  selectedDate,
  onDateSelect,
  className,
  overlayClassName,
}: DatePickerProps) => {
  const { state, refs, actions } = useDatePickerState(isOpen, selectedDate);
  const {
    transition,
    currentMonth,
    isYearMonthPickerOpen,
    isYearPickerOpen,
    draftYearMonth,
    draftYear,
    yearRange,
    tempSelectedDate,
  } = state;

  const {
    datePickerRef,
    monthYearButtonRef,
    yearMonthPickerRef,
    yearPickerRef,
    viewStackRef,
  } = refs;

  const handlers = useDatePickerHandlers(state, actions, onClose, onDateSelect);

  useDatePickerEffects(isOpen, onClose, refs, state, actions);

  const targetView = getTargetView(
    transition,
    isYearPickerOpen,
    isYearMonthPickerOpen
  );

  useViewStackHeight({
    isOpen,
    viewStackRef,
    viewRefs: {
      yearMonth: yearMonthPickerRef,
      year: yearPickerRef,
    },
    transition,
    activeView: targetView,
    depsKey: `${currentMonth.getTime()}-${draftYearMonth.year}-${draftYearMonth.month}`,
  });

  if (!isOpen) return null;

  const viewStackSizeClass =
    targetView === "calendar"
      ? styles.viewStackCalendar
      : styles.viewStackPicker;

  return (
    <div
      className={clsx(styles.overlay, overlayClassName)}
      onClick={handlers.handleOverlayClick}
    >
      <div
        ref={datePickerRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={clsx(styles.datePicker, className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={viewStackRef}
          className={clsx(styles.viewStack, viewStackSizeClass)}
        >
          {!isYearPickerOpen &&
            (!isYearMonthPickerOpen ||
              transition?.to === "calendar" ||
              transition?.from === "calendar") && (
              <CalendarView
                currentMonth={currentMonth}
                tempSelectedDate={tempSelectedDate}
                monthYearButtonRef={monthYearButtonRef}
                isYearMonthPickerOpen={isYearMonthPickerOpen}
                onPrevMonth={handlers.handlePrevMonth}
                onNextMonth={handlers.handleNextMonth}
                onMonthYearClick={handlers.handleMonthYearClick}
                onDateClick={handlers.handleDateClick}
                onComplete={handlers.handleComplete}
                onClose={onClose}
                getDaysInMonth={getDaysInMonth}
                isSelectedDate={(day, isCurrentMonth, tempSelected, current) =>
                  isSelectedDate(day, isCurrentMonth, tempSelected, current)
                }
                isToday={(day, isCurrentMonth, current) =>
                  isToday(day, isCurrentMonth, current)
                }
                animationClass={getPanelAnimClass("calendar", transition)}
              />
            )}

          {(isYearPickerOpen ||
            transition?.to === "year" ||
            transition?.from === "year") && (
            <YearPicker
              yearRange={yearRange}
              draftYear={draftYear}
              yearPickerRef={yearPickerRef}
              getYearList={() => getYearList(yearRange)}
              onYearRangeChange={handlers.handleYearRangeChange}
              onDraftYearSelect={handlers.handleDraftYearSelect}
              onCancel={handlers.handleYearPickerCancel}
              onComplete={handlers.handleYearPickerComplete}
              animationClass={getPanelAnimClass("year", transition)}
            />
          )}

          {!isYearPickerOpen &&
            (isYearMonthPickerOpen ||
              transition?.to === "yearMonth" ||
              transition?.from === "yearMonth") && (
              <YearMonthPicker
                draftYearMonth={draftYearMonth}
                yearMonthPickerRef={yearMonthPickerRef}
                onDraftYearChange={handlers.handleDraftYearChange}
                onYearDisplayClick={handlers.handleYearDisplayClick}
                onDraftMonthSelect={handlers.handleDraftMonthSelect}
                onCancel={handlers.handleYearMonthCancel}
                onComplete={handlers.handleYearMonthComplete}
                animationClass={getPanelAnimClass("yearMonth", transition)}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
