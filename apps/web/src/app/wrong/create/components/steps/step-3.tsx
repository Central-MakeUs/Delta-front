type Step3TypeProps = {
  onNext: () => void;
  onPrev: () => void;
};

export const Step3Type = ({ onNext, onPrev }: Step3TypeProps) => {
  return (
    <div>
      Step3 UI
      <button type="button" onClick={onPrev}>
        이전
      </button>
      <button type="button" onClick={onNext}>
        다음
      </button>
    </div>
  );
};

export default Step3Type;
