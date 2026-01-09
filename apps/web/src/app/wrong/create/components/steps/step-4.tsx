"use client";

import { useState } from "react";
import TextField from "@/shared/components/text-field/text-field";
import Image from "next/image";
import * as s from "./step.css";
import SampleImg from "@/shared/assets/images/wrong-sample.png";
import { Toggle } from "@/shared/components/toggle/toggle";
import { NumberChoice } from "@/shared/components/number-choice/number-choice";

type Step4Props = {
  onPrev: () => void;
  onComplete: () => void;
  onNextEnabledChange?: (enabled: boolean) => void;
};

type ToggleValue = "objective" | "subjective";
const OPTIONS = [
  { value: "objective", label: "객관식" },
  { value: "subjective", label: "주관식" },
] as const;

const Step4 = ({ onPrev, onComplete }: Step4Props) => {
  const [type, setType] = useState<ToggleValue>("objective");
  const [answer, setAnswer] = useState<number | null>(null);
  return (
    <div className={s.step4Container}>
      <Image
        src={SampleImg}
        alt="Step4 안내 이미지"
        width={SampleImg.width}
        height={SampleImg.height}
        className={s.image}
        priority
      />
      <div className={s.explanationSection}>
        <div className={s.explanationContent}>
          <div className={s.numberTitleRow}>
            <span className={s.explanationTitle}>정답</span>
            <Toggle<ToggleValue>
              value={type}
              onValueChange={setType}
              options={OPTIONS}
            />
          </div>
          <NumberChoice value={answer} onValueChange={setAnswer} />
        </div>
        <div className={s.explanationContent}>
          <span className={s.explanationTitle}>풀이</span>
          <TextField placeholder="풀이를 입력해주세요." />
        </div>
        <div />
      </div>
    </div>
  );
};

export default Step4;
