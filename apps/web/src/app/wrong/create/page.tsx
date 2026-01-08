"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TitleSection from "@/app/wrong/create/components/title-section/title-section";
import { parseProgress } from "@/shared/components/app-bar/utils/app-bar-routing";
import { WRONG_CREATE_STEP_COPY } from "@/app/wrong/create/constants/step-copy";

import Step1 from "@/app/wrong/create/components/steps/step-1";
import Step2 from "@/app/wrong/create/components/steps/step-2";
import Step3 from "@/app/wrong/create/components/steps/step-3";
import Step4 from "@/app/wrong/create/components/steps/step-4";

import * as s from "@/app/wrong/create/create.css";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const WrongCreatePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const { total, currentStep } = parseProgress(
    new URLSearchParams(sp.toString())
  );

  const goStep = (nextStep: number) => {
    const safe = clamp(nextStep, 1, total);
    const params = new URLSearchParams(sp.toString());
    params.set("step", String(safe));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const copy =
    WRONG_CREATE_STEP_COPY[currentStep as keyof typeof WRONG_CREATE_STEP_COPY];

  return (
    <div className={s.page}>
      <TitleSection title={copy.title} subTitle={copy.subTitle} />

      {currentStep === 1 ? <Step1 onNext={() => goStep(2)} /> : null}
      {currentStep === 2 ? <Step2 onNext={() => goStep(3)} /> : null}
      {currentStep === 3 ? (
        <Step3 onPrev={() => goStep(2)} onNext={() => goStep(4)} />
      ) : null}
      {currentStep === 4 ? (
        <Step4
          onPrev={() => goStep(3)}
          onComplete={() => router.push("/wrong")}
        />
      ) : null}
    </div>
  );
};

export default WrongCreatePage;
