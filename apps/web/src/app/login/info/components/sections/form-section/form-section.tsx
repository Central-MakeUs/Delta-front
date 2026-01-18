import Icon from "@/shared/components/icon/icon";
import TextField from "@/shared/components/text-field/text-field";
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
  return (
    <div className={styles.formSection}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>이름</label>
        <div className={styles.inputWrapper}>
          <div className={styles.textFieldContainer}>
            <TextField
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              fullWidth
              size="body2"
              rows={1}
            />
          </div>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>생년월일</label>
        <div className={styles.inputWrapper}>
          <div className={styles.dateFieldContainer}>
            <TextField
              placeholder="YYYY/MM/DD"
              value={birthDate}
              prefix={<Icon name="edit" size={2.4} />}
              onChange={(e) => onBirthDateChange(e.target.value)}
              fullWidth
              size="body2"
              rows={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
