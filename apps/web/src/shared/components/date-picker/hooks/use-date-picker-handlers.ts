import type {
  DatePickerState,
  DatePickerStateActions,
} from "./use-date-picker-state";

const TRANSITION_MS = 600;

export interface DatePickerHandlers {
  handleOverlayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleMonthYearClick: () => void;
  handleYearMonthCancel: () => void;
  handleYearMonthComplete: () => void;
  handleDraftYearChange: (delta: number) => void;
  handleDraftMonthSelect: (selectedMonth: number) => void;
  handleYearDisplayClick: () => void;
  handleYearPickerCancel: () => void;
  handleYearPickerComplete: () => void;
  handleDraftYearSelect: (selectedYear: number) => void;
  handleDateClick: (
    day: number,
    isCurrentMonth: boolean,
    isPrevMonth: boolean
  ) => void;
  handleComplete: () => void;
  handleYearRangeChange: (delta: number) => void;
}

export const useDatePickerHandlers = (
  state: DatePickerState,
  actions: DatePickerStateActions,
  onClose: () => void,
  onDateSelect: (date: Date) => void
): DatePickerHandlers => {
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
    setTransition,
    setCurrentMonth,
    setIsYearMonthPickerOpen,
    setIsYearPickerOpen,
    setDraftYearMonth,
    setDraftYear,
    setYearRange,
    setTempSelectedDate,
  } = actions;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      if (isYearPickerOpen || isYearMonthPickerOpen) {
        setIsYearPickerOpen(false);
        setIsYearMonthPickerOpen(false);
        setTransition(null);
        onClose();
      } else {
        onClose();
      }
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

  const handleDateClick = (
    day: number,
    isCurrentMonth: boolean,
    isPrevMonth: boolean
  ) => {
    let selected: Date;
    if (isCurrentMonth) {
      selected = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
    } else if (isPrevMonth) {
      const prevMonth =
        currentMonth.getMonth() === 0 ? 11 : currentMonth.getMonth() - 1;
      const prevYear =
        currentMonth.getMonth() === 0
          ? currentMonth.getFullYear() - 1
          : currentMonth.getFullYear();
      selected = new Date(prevYear, prevMonth, day);
      setCurrentMonth(selected);
    } else {
      const nextMonth =
        currentMonth.getMonth() === 11 ? 0 : currentMonth.getMonth() + 1;
      const nextYear =
        currentMonth.getMonth() === 11
          ? currentMonth.getFullYear() + 1
          : currentMonth.getFullYear();
      selected = new Date(nextYear, nextMonth, day);
      setCurrentMonth(selected);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
    if (selected > today) {
      return;
    }

    setTempSelectedDate(selected);
  };

  const handleComplete = () => {
    if (tempSelectedDate) {
      onDateSelect(tempSelectedDate);
      onClose();
    }
  };

  const handleYearRangeChange = (delta: number) => {
    const newStart = yearRange.start + delta;
    const newEnd = yearRange.end + delta;
    setYearRange({ start: newStart, end: newEnd });
  };

  return {
    handleOverlayClick,
    handlePrevMonth,
    handleNextMonth,
    handleMonthYearClick,
    handleYearMonthCancel,
    handleYearMonthComplete,
    handleDraftYearChange,
    handleDraftMonthSelect,
    handleYearDisplayClick,
    handleYearPickerCancel,
    handleYearPickerComplete,
    handleDraftYearSelect,
    handleDateClick,
    handleComplete,
    handleYearRangeChange,
  };
};
