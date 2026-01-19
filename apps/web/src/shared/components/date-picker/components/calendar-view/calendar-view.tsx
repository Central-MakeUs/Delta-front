"use client";

import React from "react";
import clsx from "clsx";
import * as styles from "./calendar-view.css";
import * as sharedStyles from "../../date-picker.css";
import Icon from "../../../icon/icon";
import { Button } from "../../../button/button/button";
import { DAYS, MONTHS } from "../../constants";

interface CalendarViewProps {
  currentMonth: Date;
  tempSelectedDate: Date | null;
  monthYearButtonRef: React.RefObject<HTMLButtonElement | null>;
  isYearMonthPickerOpen: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onMonthYearClick: () => void;
  onDateClick: (day: number, isCurrentMonth: boolean) => void;
  onComplete: () => void;
  onClose: () => void;
  getDaysInMonth: (date: Date) => Array<{ day: number; isCurrentMonth: boolean } | null>;
  isSelectedDate: (day: number | null, isCurrentMonth: boolean) => boolean;
  isToday: (day: number | null, isCurrentMonth: boolean) => boolean;
  animationClass?: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
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
}) => {
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
            <Icon name="arrow" size={3.6} />
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
            <Icon name="arrow" size={3.6} rotate={180} />
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
            if (dayInfo === null) {
              return <div key={index} className={styles.empty} />;
            }
            const { day, isCurrentMonth } = dayInfo;
            return (
              <button
                key={`${day}-${index}-${isCurrentMonth}`}
                type="button"
                className={clsx(styles.day, {
                  [styles.selected]: isSelectedDate(day, isCurrentMonth),
                  [styles.today]:
                    isToday(day, isCurrentMonth) &&
                    !isSelectedDate(day, isCurrentMonth),
                  [styles.prevMonth]: !isCurrentMonth,
                })}
                onClick={() => onDateClick(day, isCurrentMonth)}
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
