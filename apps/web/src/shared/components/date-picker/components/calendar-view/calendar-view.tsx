"use client";

import React from "react";
import clsx from "clsx";
import * as styles from "@/shared/components/date-picker/components/calendar-view/calendar-view.css";
import * as sharedStyles from "@/shared/components/date-picker/date-picker.css";
import Icon from "@/shared/components/icon/icon";
import { Button } from "@/shared/components/button/button/button";
import { DAYS, MONTHS } from "@/shared/components/date-picker/constants";
import { isFutureDate } from "@/shared/components/date-picker/utils/date-utils";

interface CalendarViewProps {
  currentMonth: Date;
  tempSelectedDate: Date | null;
  monthYearButtonRef: React.RefObject<HTMLButtonElement | null>;
  isYearMonthPickerOpen: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onMonthYearClick: () => void;
  onDateClick: (
    day: number,
    isCurrentMonth: boolean,
    isPrevMonth: boolean
  ) => void;
  onComplete: () => void;
  onClose: () => void;
  getDaysInMonth: (date: Date) => Array<{
    day: number;
    isCurrentMonth: boolean;
    isPrevMonth: boolean;
  } | null>;
  isSelectedDate: (
    day: number | null,
    isCurrentMonth: boolean,
    tempSelectedDate: Date | null,
    currentMonth: Date,
    isPrevMonth: boolean
  ) => boolean;
  isToday: (
    day: number | null,
    isCurrentMonth: boolean,
    currentMonth: Date,
    isPrevMonth: boolean
  ) => boolean;
  animationClass?: string;
}

export const CalendarView = ({
  currentMonth,
  tempSelectedDate,
  monthYearButtonRef,
  isYearMonthPickerOpen,
  onPrevMonth,
  onNextMonth,
  onMonthYearClick,
  onDateClick,
  onComplete,
  onClose,
  getDaysInMonth,
  isSelectedDate,
  isToday,
  animationClass,
}: CalendarViewProps) => {
  const days = getDaysInMonth(currentMonth);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  return (
    <div className={clsx(sharedStyles.viewPanel, animationClass)}>
      <div className={styles.header}>
        <div className={styles.datePickerContent}>
          <button
            type="button"
            className={styles.navButton}
            onClick={onPrevMonth}
            aria-label="이전 달"
          >
            <Icon name="chevron" rotate={180} size={2.4} />
          </button>

          <div className={styles.monthYearContainer}>
            <button
              ref={monthYearButtonRef}
              type="button"
              className={styles.monthYear}
              onClick={onMonthYearClick}
              aria-label="년도 월 선택"
              aria-expanded={isYearMonthPickerOpen}
            >
              {year}.{MONTHS[month]}
            </button>
          </div>
          <button
            type="button"
            className={styles.navButton}
            onClick={onNextMonth}
            aria-label="다음 달"
          >
            <Icon name="chevron" size={2.4} />
          </button>
        </div>
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
            if (dayInfo === null)
              return <div key={index} className={styles.empty} />;

            const { day, isCurrentMonth, isPrevMonth } = dayInfo;
            const isFuture = isFutureDate(
              day,
              isCurrentMonth,
              isPrevMonth,
              currentMonth
            );

            return (
              <button
                key={`${day}-${index}-${isCurrentMonth}`}
                type="button"
                disabled={isFuture}
                className={clsx(styles.day, {
                  [styles.selected]: isSelectedDate(
                    day,
                    isCurrentMonth,
                    tempSelectedDate,
                    currentMonth,
                    isPrevMonth
                  ),
                  [styles.today]:
                    isToday(day, isCurrentMonth, currentMonth, isPrevMonth) &&
                    !isSelectedDate(
                      day,
                      isCurrentMonth,
                      tempSelectedDate,
                      currentMonth,
                      isPrevMonth
                    ),
                  [styles.prevMonth]: !isCurrentMonth,
                })}
                onClick={() => {
                  if (!isFuture) onDateClick(day, isCurrentMonth, isPrevMonth);
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
        <div className={styles.buttonContainer}>
          <Button
            label="닫기"
            size="48"
            tone="surface"
            fullWidth
            onClick={onClose}
          />
          <Button
            label="선택 완료"
            size="48"
            tone="dark"
            fullWidth
            onClick={onComplete}
            disabled={!tempSelectedDate}
          />
        </div>
      </div>
    </div>
  );
};
