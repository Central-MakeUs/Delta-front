"use client";

import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import * as styles from "./date-picker.css";
import Icon from "../icon/icon";
import { Button } from "../button/button/button";

export interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  className?: string;
  overlayClassName?: string;
}

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export const DatePicker = ({
  isOpen,
  onClose,
  selectedDate,
  onDateSelect,
  className,
  overlayClassName,
}: DatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate || new Date()
  );
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const monthYearButtonRef = useRef<HTMLButtonElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  
  // 모달이 열릴 때 선택된 날짜를 임시 선택 날짜로 초기화
  // useState의 lazy initialization을 사용하여 isOpen이 true일 때만 초기화
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(() => {
    return isOpen ? selectedDate : null;
  });
  
  // 모달이 열릴 때마다 tempSelectedDate를 selectedDate로 초기화
  // useLayoutEffect를 사용하여 동기적으로 업데이트
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

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isYearDropdownOpen &&
        yearDropdownRef.current &&
        monthYearButtonRef.current &&
        !yearDropdownRef.current.contains(event.target as Node) &&
        !monthYearButtonRef.current.contains(event.target as Node)
      ) {
        setIsYearDropdownOpen(false);
      }
    };

    if (isYearDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isYearDropdownOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // 저번달 정보 계산
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthDays = prevMonthLastDay.getDate();

    const days: Array<{ day: number; isCurrentMonth: boolean } | null> = [];
    
    // 저번달 날짜 추가
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
      });
    }
    
    // 이번달 날짜 추가
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
      });
    }

    return days;
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
    setIsYearDropdownOpen(!isYearDropdownOpen);
  };

  const handleYearSelect = (selectedYear: number) => {
    setCurrentMonth(
      new Date(selectedYear, currentMonth.getMonth(), 1)
    );
    setIsYearDropdownOpen(false);
  };

  const getYearList = () => {
    const currentYear = currentMonth.getFullYear();
    const startYear = currentYear - 10;
    const endYear = currentYear + 10;
    const years: number[] = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
    return years;
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
      // 저번달 날짜 클릭 시 해당 달로 이동
      const prevMonth = currentMonth.getMonth() === 0 ? 11 : currentMonth.getMonth() - 1;
      const prevYear = currentMonth.getMonth() === 0 ? currentMonth.getFullYear() - 1 : currentMonth.getFullYear();
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

  const isSelectedDate = (day: number | null, isCurrentMonth: boolean) => {
    if (!day || !tempSelectedDate) return false;
    if (!isCurrentMonth) {
      // 저번달 날짜인 경우
      const prevMonth = currentMonth.getMonth() === 0 ? 11 : currentMonth.getMonth() - 1;
      const prevYear = currentMonth.getMonth() === 0 ? currentMonth.getFullYear() - 1 : currentMonth.getFullYear();
      return (
        day === tempSelectedDate.getDate() &&
        prevMonth === tempSelectedDate.getMonth() &&
        prevYear === tempSelectedDate.getFullYear()
      );
    }
    return (
      day === tempSelectedDate.getDate() &&
      currentMonth.getMonth() === tempSelectedDate.getMonth() &&
      currentMonth.getFullYear() === tempSelectedDate.getFullYear()
    );
  };

  const isToday = (day: number | null, isCurrentMonth: boolean) => {
    if (!day) return false;
    const today = new Date();
    if (!isCurrentMonth) {
      // 저번달 날짜인 경우
      const prevMonth = currentMonth.getMonth() === 0 ? 11 : currentMonth.getMonth() - 1;
      const prevYear = currentMonth.getMonth() === 0 ? currentMonth.getFullYear() - 1 : currentMonth.getFullYear();
      return (
        day === today.getDate() &&
        prevMonth === today.getMonth() &&
        prevYear === today.getFullYear()
      );
    }
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const days = getDaysInMonth(currentMonth);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

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
        <div className={styles.header}>
          <button
            type="button"
            className={styles.navButton}
            onClick={handlePrevMonth}
            aria-label="이전 달"
          >
            <Icon name="arrow" size={3.6} />
          </button>
          
          <div className={styles.monthYearContainer}>
            <button
              ref={monthYearButtonRef}
              type="button"
              className={styles.monthYear}
              onClick={handleMonthYearClick}
              aria-label="년도 선택"
              aria-expanded={isYearDropdownOpen}
            >
              {year}.{MONTHS[month]}
            </button>
            {isYearDropdownOpen && (
              <div ref={yearDropdownRef} className={styles.yearDropdown}>
                <div className={styles.yearDropdownList}>
                  {getYearList().map((yearOption) => (
                    <button
                      key={yearOption}
                      type="button"
                      className={clsx(styles.yearOption, {
                        [styles.selectedYear]: yearOption === year,
                      })}
                      onClick={() => handleYearSelect(yearOption)}
                    >
                      {yearOption}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            className={styles.navButton}
            onClick={handleNextMonth}
            aria-label="다음 달"
          >
            <Icon name="arrow" size={3.6} rotate={180} />
          </button>
        </div>

        <div className={styles.calendar}>
          <div className={styles.weekDays}>
            {DAYS.map((day, index) => (
              <div key={index} className={styles.weekDay}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.days}>
            {days.map((dayInfo, index) => {
              if (dayInfo === null) {
                return (
                  <div key={index} className={styles.empty} />
                );
              }
              const { day, isCurrentMonth } = dayInfo;
              return (
                <button
                  key={`${day}-${index}-${isCurrentMonth}`}
                  type="button"
                  className={clsx(styles.day, {
                    [styles.selected]: isSelectedDate(day, isCurrentMonth),
                    [styles.today]: isToday(day, isCurrentMonth) && !isSelectedDate(day, isCurrentMonth),
                    [styles.prevMonth]: !isCurrentMonth,
                  })}
                  onClick={() => handleDateClick(day, isCurrentMonth)}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className={styles.buttonContainer}>
            <Button label="닫기" size="48" tone="surface" fullWidth onClick={onClose} />
            <Button 
              label="선택 완료" 
              size="48" 
              tone="dark" 
              fullWidth
              onClick={handleComplete}
              disabled={!tempSelectedDate}
            />
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default DatePicker;
