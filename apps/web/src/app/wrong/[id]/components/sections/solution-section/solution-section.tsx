import Chip from "@/shared/components/chip/chip";
import TextField from "@/shared/components/text-field/text-field";
import * as styles from "./solution-section.css";

interface SolutionSectionProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const SolutionSection = ({
  value,
  onChange,
  disabled,
}: SolutionSectionProps) => {
  return (
    <div className={styles.solutionInputWrapper}>
      <TextField
        heightSize="lg"
        focusEffect={false}
        fullWidth
        prefix={<Chip size="md" shape="pill" label="풀이" />}
        placeholder="풀이를 입력해주세요."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="body3"
        readOnly={disabled}
      />
    </div>
  );
};

export default SolutionSection;
