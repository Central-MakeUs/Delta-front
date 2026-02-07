import { useState, useRef, useMemo, useEffect } from "react";
import type { Transition } from "../utils/transition-utils";

const TRANSITION_MS = 600;
const DEFAULT_YEAR = 2010;

export interface DatePickerState {
  transition: Transition | null;
  currentMonth: Date;
  isYearMonthPickerOpen: boolean;
  isYearPickerOpen: boolean;
  draftYearMonth: { year: number; month: number };
  draftYear: number;
  yearRange: { start: number; end: number };
  tempSelectedDate: Date | null;
}

export interface DatePickerRefs {
  datePickerRef: React.RefObject<HTMLDivElement | null>;
  monthYearButtonRef: React.RefObject<HTMLButtonElement | null>;
  yearMonthPickerRef: React.RefObject<HTMLDivElement | null>;
  yearPickerRef: React.RefObject<HTMLDivElement | null>;
  viewStackRef: React.RefObject<HTMLDivElement | null>;
}

export interface DatePickerStateActions {
  setTransition: React.Dispatch<React.SetStateAction<Transition | null>>;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setIsYearMonthPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsYearPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDraftYearMonth: React.Dispatch<
    React.SetStateAction<{ year: number; month: number }>
  >;
  setDraftYear: React.Dispatch<React.SetStateAction<number>>;
  setYearRange: React.Dispatch<
    React.SetStateAction<{ start: number; end: number }>
  >;
  setTempSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setUserSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export const useDatePickerState = (
  isOpen: boolean,
  selectedDate: Date | null
) => {
  const initialDate = selectedDate ?? new Date(DEFAULT_YEAR, 0, 1);
  const initialYear = initialDate.getFullYear();
  const initialMonth = initialDate.getMonth();

  const [transition, setTransition] = useState<Transition | null>(null);
  const [currentMonth, setCurrentMonth] = useState(initialDate);

  const [isYearMonthPickerOpen, setIsYearMonthPickerOpen] = useState(false);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);

  const [draftYearMonth, setDraftYearMonth] = useState(() => ({
    year: initialYear,
    month: initialMonth,
  }));

  const [draftYear, setDraftYear] = useState(() => initialYear);

  const [yearRange, setYearRange] = useState(() => ({
    start: initialYear - 5,
    end: initialYear + 6,
  }));

  const datePickerRef = useRef<HTMLDivElement | null>(null);
  const monthYearButtonRef = useRef<HTMLButtonElement | null>(null);
  const yearMonthPickerRef = useRef<HTMLDivElement | null>(null);
  const yearPickerRef = useRef<HTMLDivElement | null>(null);
  const viewStackRef = useRef<HTMLDivElement | null>(null);

  const [userSelectedDate, setUserSelectedDate] = useState<Date | null>(null);
  const prevIsOpenRef = useRef(isOpen);

  useEffect(() => {
    const justOpened = isOpen && !prevIsOpenRef.current;
    const justClosed = !isOpen && prevIsOpenRef.current;

    if (justOpened) {
      const date = selectedDate ?? new Date(DEFAULT_YEAR, 0, 1);
      const year = date.getFullYear();
      const month = date.getMonth();

      requestAnimationFrame(() => {
        setUserSelectedDate(null);
        setCurrentMonth(date);
        setDraftYearMonth({ year, month });
        setDraftYear(year);
        setYearRange({ start: year - 5, end: year + 6 });
      });
    }

    if (justClosed) {
      requestAnimationFrame(() => {
        setIsYearMonthPickerOpen(false);
        setIsYearPickerOpen(false);
        setTransition(null);
      });
    }

    prevIsOpenRef.current = isOpen;
  }, [isOpen, selectedDate]);

  const tempSelectedDate = useMemo(() => {
    if (!isOpen) return null;
    return userSelectedDate || selectedDate;
  }, [isOpen, userSelectedDate, selectedDate]);

  const state: DatePickerState = {
    transition,
    currentMonth,
    isYearMonthPickerOpen,
    isYearPickerOpen,
    draftYearMonth,
    draftYear,
    yearRange,
    tempSelectedDate,
  };

  const refs: DatePickerRefs = {
    datePickerRef,
    monthYearButtonRef,
    yearMonthPickerRef,
    yearPickerRef,
    viewStackRef,
  };

  const actions: DatePickerStateActions = {
    setTransition,
    setCurrentMonth,
    setIsYearMonthPickerOpen,
    setIsYearPickerOpen,
    setDraftYearMonth,
    setDraftYear,
    setYearRange,
    setTempSelectedDate: setUserSelectedDate,
    setUserSelectedDate,
  };

  return { state, refs, actions, TRANSITION_MS };
};
