type Step4Props = {
  onPrev: () => void;
  onComplete: () => void;
};

const Step4 = ({ onPrev, onComplete }: Step4Props) => {
  return (
    <div>
      Step4 UI
      <button type="button" onClick={onPrev}>
        이전
      </button>
      <button type="button" onClick={onComplete}>
        완료
      </button>
    </div>
  );
};

export default Step4;
