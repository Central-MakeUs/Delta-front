"use client";

import { useMemo } from "react";
import TitleSection from "@/app/wrong/create/components/title-section/title-section";
import { WRONG_CREATE_STEP_COPY } from "@/app/wrong/create/constants/step-copy";
import Loading from "@/shared/components/loading/loading";
import * as s from "@/app/wrong/create/create.css";
import Step1 from "@/app/wrong/create/components/steps/step-1";
import { useWrongCreateRoute } from "@/app/wrong/create/hooks/use-wrong-create-route";
import { useStep1SummaryTransition } from "@/app/wrong/create/hooks/step1/use-step1-summary-transition";
import { LOADING_MESSAGES } from "@/shared/constants/loading-messages";
import { ROUTES } from "@/shared/constants/routes";

const isValidInternalPath = (path: string) => {
  if (!path.startsWith("/")) return false;
  if (path.startsWith("//")) return false;
  return true;
};

const parseFrom = (raw: string | null) => {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    return isValidInternalPath(decoded) ? decoded : null;
  } catch {
    return null;
  }
};

const WrongCreatePage = () => {
  const { router, params, scanIds, groupId, goStep } = useWrongCreateRoute();
  const copy = WRONG_CREATE_STEP_COPY[1];

  const { handleUploaded, isStep1Blocked } = useStep1SummaryTransition({
    scanIds,
    groupId,
    goStep,
    router,
  });

  const from = useMemo(
    () => parseFrom(params.get("from")) ?? ROUTES.WRONG.ROOT,
    [params]
  );

  return (
    <div className={s.page}>
      <TitleSection title={copy.title} subTitle={copy.subTitle} />

      <div className={s.stepShell}>
        <div className={s.stepContent}>
          <Step1 onNext={handleUploaded} disabled={isStep1Blocked} />
        </div>
      </div>

      {isStep1Blocked ? (
        <Loading
          variant="overlay"
          message={LOADING_MESSAGES.ANALYZE_UNIT_TYPE}
          onBack={() => router.replace(from)}
        />
      ) : null}
    </div>
  );
};

export default WrongCreatePage;
