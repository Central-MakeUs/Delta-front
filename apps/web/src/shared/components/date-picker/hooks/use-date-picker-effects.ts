import { useEffect } from "react";
import type {
  DatePickerRefs,
  DatePickerState,
  DatePickerStateActions,
} from "./use-date-picker-state";

export const useDatePickerEffects = (
  isOpen: boolean,
  onClose: () => void,
  refs: DatePickerRefs,
  state: DatePickerState,
  actions: DatePickerStateActions
) => {
  const { datePickerRef, monthYearButtonRef, yearMonthPickerRef } = refs;
  const { isYearMonthPickerOpen } = state;
  const { setIsYearMonthPickerOpen } = actions;

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
  }, [isOpen, datePickerRef]);

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
  }, [
    isYearMonthPickerOpen,
    yearMonthPickerRef,
    monthYearButtonRef,
    setIsYearMonthPickerOpen,
  ]);
};
