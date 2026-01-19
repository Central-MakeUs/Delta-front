"use client";

import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import * as styles from "./date-picker.css";
import { CalendarView } from "./components/calendar-view/calendar-view";
import { YearMonthPicker } from "./components/year-month-picker/year-month-picker";
import { YearPicker } from "./components/year-picker/year-picker";
import { useViewStackHeight } from "./hooks/use-view-stack-height";
import {
  getDaysInMonth,
  isSelectedDate,
  isToday,
  getYearList,
} from "./utils/date-utils";
import {
  getPanelAnimClass,
  getTargetView,
  type Transition,
} from "./utils/transition-utils";

export interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  className?: string;
  overlayClassName?: string;
}

const TRANSITION_MS = 600;

export const DatePicker = ({
  isOpen,
  onClose,
  selectedDate,
  onDateSelect,
  className,
  overlayClassName,
}: DatePickerProps) => {
  const [transition, setTransition] = useState<Transition | null>(null);
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate || new Date()
  );
  const [isYearMonthPickerOpen, setIsYearMonthPickerOpen] = useState(false);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const [draftYearMonth, setDraftYearMonth] = useState(() => ({
    year: (selectedDate || new Date()).getFullYear(),
    month: (selectedDate || new Date()).getMonth(),
  }));
  const [draftYear, setDraftYear] = useState(
    () => (selectedDate || new Date()).getFullYear()
  );
  const [yearRange, setYearRange] = useState(() => {
    const currentYear = (selectedDate || new Date()).getFullYear();
    const startYear = currentYear - 5;
    const endYear = currentYear + 6;
    return { start: startYear, end: endYear };
  });

  const datePickerRef = useRef<HTMLDivElement | null>(null);
  const monthYearButtonRef = useRef<HTMLButtonElement | null>(null);
  const yearMonthPickerRef = useRef<HTMLDivElement | null>(null);
  const yearPickerRef = useRef<HTMLDivElement | null>(null);
  const viewStackRef = useRef<HTMLDivElement | null>(null);

  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(() => {
    return isOpen ? selectedDate : null;
  });

  React.useLayoutEffect(() => {
    if (isOpen) {
      setTempSelectedDate(selectedDate);
    }
  }, [isOpen, selectedDate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && datePickerRef.current) {
      datePickerRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isYearMonthPickerOpen &&
        yearMonthPickerRef.current &&
        monthYearButtonRef.current &&
        !yearMonthPickerRef.current.contains(event.target as Node) &&
        !monthYearButtonRef.current.contains(event.target as Node)
      ) {
        setIsYearMonthPickerOpen(false);
      }
    };

    if (isYearMonthPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isYearMonthPickerOpen]);

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
    deps: [currentMonth, draftYearMonth],
  });

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleMonthYearClick = () => {
    if (transition) return;
    if (isYearMonthPickerOpen) {
      setTransition({ from: "yearMonth", to: "calendar" });
      window.setTimeout(() => {
        setIsYearMonthPickerOpen(false);
        setTransition(null);
      }, TRANSITION_MS);
      return;
    }

    setDraftYearMonth({
      year: currentMonth.getFullYear(),
      month: currentMonth.getMonth(),
    });
    setIsYearMonthPickerOpen(true);
    setTransition({ from: "calendar", to: "yearMonth" });

    window.setTimeout(() => setTransition(null), TRANSITION_MS);
  };

  const handleYearMonthCancel = () => {
    if (transition) return;
    setTransition({ from: "yearMonth", to: "calendar" });
    window.setTimeout(() => {
      setIsYearMonthPickerOpen(false);
      setTransition(null);
    }, TRANSITION_MS);
  };

  const handleYearMonthComplete = () => {
    setCurrentMonth(new Date(draftYearMonth.year, draftYearMonth.month, 1));
    setIsYearMonthPickerOpen(false);
  };

  const handleDraftYearChange = (delta: number) => {
    setDraftYearMonth((prev) => ({
      ...prev,
      year: prev.year + delta,
    }));
  };

  const handleDraftMonthSelect = (selectedMonth: number) => {
    setDraftYearMonth((prev) => ({
      ...prev,
      month: selectedMonth,
    }));
  };

  const handleYearDisplayClick = () => {
    if (transition) return;
    const currentYear = draftYearMonth.year;
    setDraftYear(currentYear);
    const startYear = currentYear - 5;
    const endYear = currentYear + 6;
    setYearRange({ start: startYear, end: endYear });
    setIsYearPickerOpen(true);
    setTransition({ from: "yearMonth", to: "year" });
    window.setTimeout(() => {
      setIsYearMonthPickerOpen(false);
      setTransition(null);
    }, TRANSITION_MS);
  };

  const handleYearPickerCancel = () => {
    if (transition) return;
    setIsYearMonthPickerOpen(true);
    setTransition({ from: "year", to: "yearMonth" });
    window.setTimeout(() => {
      setIsYearPickerOpen(false);
      setTransition(null);
    }, TRANSITION_MS);
  };

  const handleYearPickerComplete = () => {
    setDraftYearMonth((prev) => ({
      ...prev,
      year: draftYear,
    }));
    setIsYearPickerOpen(false);
    setIsYearMonthPickerOpen(true);
    setTransition(null);
  };

  const handleDraftYearSelect = (selectedYear: number) => {
    setDraftYear(selectedYear);
  };

  const handleDateClick = (day: number, isCurrentMonth: boolean) => {
    let selected: Date;
    if (isCurrentMonth) {
      selected = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
    } else {
      const prevMonth =
        currentMonth.getMonth() === 0 ? 11 : currentMonth.getMonth() - 1;
      const prevYear =
        currentMonth.getMonth() === 0
          ? currentMonth.getFullYear() - 1
          : currentMonth.getFullYear();
      selected = new Date(prevYear, prevMonth, day);
      setCurrentMonth(selected);
    }
    setTempSelectedDate(selected);
  };

  const handleComplete = () => {
    if (tempSelectedDate) {
      onDateSelect(tempSelectedDate);
      onClose();
    }
  };
  const viewStackSizeClass =
    targetView === "calendar"
      ? styles.viewStackCalendar
      : styles.viewStackPicker;

  return (
    <div
      className={clsx(styles.overlay, overlayClassName)}
      onClick={handleOverlayClick}
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
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onMonthYearClick={handleMonthYearClick}
              onDateClick={handleDateClick}
              onComplete={handleComplete}
              onClose={onClose}
              getDaysInMonth={getDaysInMonth}
              isSelectedDate={(day, isCurrentMonth) =>
                isSelectedDate(day, isCurrentMonth, tempSelectedDate, currentMonth)
              }
              isToday={(day, isCurrentMonth) =>
                isToday(day, isCurrentMonth, currentMonth)
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
              onYearRangeChange={(delta) => {
                const newStart = yearRange.start + delta;
                const newEnd = yearRange.end + delta;
                setYearRange({ start: newStart, end: newEnd });
              }}
              onDraftYearSelect={handleDraftYearSelect}
              onCancel={handleYearPickerCancel}
              onComplete={handleYearPickerComplete}
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
              onDraftYearChange={handleDraftYearChange}
              onYearDisplayClick={handleYearDisplayClick}
              onDraftMonthSelect={handleDraftMonthSelect}
              onCancel={handleYearMonthCancel}
              onComplete={handleYearMonthComplete}
              animationClass={getPanelAnimClass("yearMonth", transition)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
