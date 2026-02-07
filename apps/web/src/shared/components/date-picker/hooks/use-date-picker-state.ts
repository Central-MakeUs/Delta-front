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
  const baseDate = selectedDate ?? new Date(DEFAULT_YEAR, 0, 1);
  const baseYear = baseDate.getFullYear();
  const baseMonth = baseDate.getMonth();

  const [transition, setTransition] = useState<Transition | null>(null);
  const [currentMonth, setCurrentMonth] = useState(baseDate);

  const [isYearMonthPickerOpen, setIsYearMonthPickerOpen] = useState(false);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);

  const [draftYearMonth, setDraftYearMonth] = useState(() => ({
    year: baseYear,
    month: baseMonth,
  }));

  const [draftYear, setDraftYear] = useState(() => baseYear);

  const [yearRange, setYearRange] = useState(() => {
    const startYear = baseYear - 5;
    const endYear = baseYear + 6;
    return { start: startYear, end: endYear };
  });

  const datePickerRef = useRef<HTMLDivElement | null>(null);
  const monthYearButtonRef = useRef<HTMLButtonElement | null>(null);
  const yearMonthPickerRef = useRef<HTMLDivElement | null>(null);
  const yearPickerRef = useRef<HTMLDivElement | null>(null);
  const viewStackRef = useRef<HTMLDivElement | null>(null);

  const [userSelectedDate, setUserSelectedDate] = useState<Date | null>(null);
  const prevIsOpenRef = useRef(isOpen);

  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      requestAnimationFrame(() => {
        setUserSelectedDate(null);
      });
    } else if (!isOpen && prevIsOpenRef.current) {
      requestAnimationFrame(() => {
        setIsYearMonthPickerOpen(false);
        setIsYearPickerOpen(false);
        setTransition(null);
      });
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen]);

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
