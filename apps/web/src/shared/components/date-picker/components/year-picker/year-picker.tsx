"use client";

import React from "react";
import clsx from "clsx";
import * as styles from "./year-picker.css";
import * as sharedStyles from "../../date-picker.css";
import * as shellStyles from "../picker-shell/picker-shell.css";
import Icon from "../../../icon/icon";
import { Button } from "../../../button/button/button";

interface YearPickerProps {
  yearRange: { start: number; end: number };
  draftYear: number;
  yearPickerRef: React.RefObject<HTMLDivElement | null>;
  getYearList: () => number[];
  onYearRangeChange: (delta: number) => void;
  onDraftYearSelect: (selectedYear: number) => void;
  onCancel: () => void;
  onComplete: () => void;
  animationClass?: string;
}

export const YearPicker: React.FC<YearPickerProps> = ({
  yearRange,
  draftYear,
  yearPickerRef,
  getYearList,
  onYearRangeChange,
  onDraftYearSelect,
  onCancel,
  onComplete,
  animationClass,
}) => {
  return (
    <div
      ref={yearPickerRef}
      className={clsx(
        sharedStyles.viewPanel,
        shellStyles.pickerShell,
        animationClass
      )}
    >
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <button
            type="button"
            className={styles.yearNavButton}
            onClick={() => onYearRangeChange(-12)}
            aria-label="이전 12년"
          >
            <Icon name="chevron" size={2.4} rotate={180} />
          </button>
          <div className={styles.yearDisplay}>
            {yearRange.start}-{yearRange.end}
          </div>
          <button
            type="button"
            className={styles.yearNavButton}
            onClick={() => onYearRangeChange(12)}
            aria-label="다음 12년"
          >
            <Icon name="chevron" size={2.4} />
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.yearSection}>
          <div className={styles.yearGrid}>
            {(() => {
              const yearList = getYearList();
              return [0, 1, 2, 3].map((rowIndex) => {
                const rowYears = yearList.slice(rowIndex * 3, rowIndex * 3 + 3);
                return (
                  <div key={rowIndex} className={styles.yearRow}>
                    {rowYears.map((year) => (
                      <button
                        key={year}
                        type="button"
                        className={clsx(styles.yearOption, {
                          [styles.selectedYear]: year === draftYear,
                        })}
                        onClick={() => onDraftYearSelect(year)}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                );
              });
            })()}
          </div>
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
