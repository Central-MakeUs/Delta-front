"use client";

import React from "react";
import clsx from "clsx";
import * as styles from "./year-month-picker.css";
import * as sharedStyles from "../../date-picker.css";
import * as shellStyles from "../picker-shell/picker-shell.css";
import Icon from "../../../icon/icon";
import { Button } from "../../../button/button/button";
import { YEAR_MONTHS } from "../../constants";

interface YearMonthPickerProps {
  draftYearMonth: { year: number; month: number };
  yearMonthPickerRef: React.RefObject<HTMLDivElement | null>;
  onDraftYearChange: (delta: number) => void;
  onYearDisplayClick: () => void;
  onDraftMonthSelect: (selectedMonth: number) => void;
  onCancel: () => void;
  onComplete: () => void;
  animationClass?: string;
}

export const YearMonthPicker: React.FC<YearMonthPickerProps> = ({
  draftYearMonth,
  yearMonthPickerRef,
  onDraftYearChange,
  onYearDisplayClick,
  onDraftMonthSelect,
  onCancel,
  onComplete,
  animationClass,
}) => {
  return (
    <div
      ref={yearMonthPickerRef}
      className={clsx(
        sharedStyles.viewPanel,
        shellStyles.pickerShell,
        animationClass
      )}
    >
      <div className={styles.header}>
        <button
          type="button"
          className={styles.yearNavButton}
          onClick={() => onDraftYearChange(-1)}
          aria-label="이전 년도"
        >
          <Icon name="chevron" size={2.4} rotate={180} />
        </button>
        <button
          type="button"
          className={styles.yearDisplayButton}
          onClick={onYearDisplayClick}
        >
          {draftYearMonth.year}
        </button>
        <button
          type="button"
          className={styles.yearNavButton}
          onClick={() => onDraftYearChange(1)}
          aria-label="다음 년도"
        >
          <Icon name="chevron" size={2.4} />
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.monthSection}>
          {[0, 1, 2, 3].map((rowIndex) => (
            <div key={rowIndex} className={styles.monthRow}>
              {YEAR_MONTHS.slice(rowIndex * 3, rowIndex * 3 + 3).map(
                (monthName, colIndex) => {
                  const monthIndex = rowIndex * 3 + colIndex;
                  return (
                    <button
                      key={monthIndex}
                      type="button"
                      className={clsx(styles.monthOption, {
                        [styles.selectedMonth]:
                          monthIndex === draftYearMonth.month,
                      })}
                      onClick={() => onDraftMonthSelect(monthIndex)}
                    >
                      {monthName}
                    </button>
                  );
                }
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <Button
          label="닫기"
          size="48"
          tone="surface"
          fullWidth
          onClick={onCancel}
        />
        <Button
          label="선택 완료"
          size="48"
          tone="dark"
          fullWidth
          onClick={onComplete}
        />
      </div>
    </div>
  );
};
