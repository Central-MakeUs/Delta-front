"use client";

import { useState, useMemo } from "react";
import Icon from "@/shared/components/icon/icon";
import TextField from "@/shared/components/text-field/text-field";
import DatePicker from "@/shared/components/date-picker/date-picker";
import * as styles from "./form-section.css";

interface FormSectionProps {
  name: string;
  birthDate: string;
  onNameChange: (value: string) => void;
  onBirthDateChange: (value: string) => void;
}

const FormSection = ({
  name,
  birthDate,
  onNameChange,
  onBirthDateChange,
}: FormSectionProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const selectedDate = useMemo(() => {
    if (!birthDate) return null;
    const parts = birthDate.split("/");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month, day);
      }
    }
    return null;
  }, [birthDate]);

  const handleDateFieldClick = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    onBirthDateChange(`${year}/${month}/${day}`);
  };

  return (
    <>
      <div className={styles.formSection}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>이름</label>
          <TextField
            variant="plain"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            fullWidth
            size="body2"
            rows={1}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>생년월일</label>
          <TextField
            variant="plain"
            direction="row"
            prefixPosition="right"
            prefix={
              <Icon
                name="calendar"
                onClick={handleDateFieldClick}
                aria-label="생년월일 선택"
                size={2.4}
              />
            }
            placeholder="YYYY/MM/DD"
            value={birthDate}
            readOnly
            onClick={handleDateFieldClick}
            fullWidth
            size="body2"
            rows={1}
          />
        </div>
      </div>

      <DatePicker
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
    </>
  );
};

export default FormSection;
