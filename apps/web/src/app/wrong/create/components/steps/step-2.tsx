type Step2Props = {
  onNext: () => void;
};

const Step2 = ({ onNext }: Step2Props) => {
  return (
    <div>
      Step2 UI
      <button type="button" onClick={onNext}>
        다음
      </button>
    </div>
  );
};

export default Step2;
