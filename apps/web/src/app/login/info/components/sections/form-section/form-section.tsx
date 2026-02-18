"use client";

import TextField from "@/shared/components/text-field/text-field";
import * as styles from "./form-section.css";

interface FormSectionProps {
  name: string;
  onNameChange: (value: string) => void;
}

const FormSection = ({ name, onNameChange }: FormSectionProps) => {
  return (
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
    </div>
  );
};

export default FormSection;
