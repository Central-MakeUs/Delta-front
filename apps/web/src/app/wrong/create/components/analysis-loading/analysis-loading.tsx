"use client";

import Icon from "@/shared/components/icon/icon";
import * as s from "./analysis-loading.css";

export type AnalysisLoadingProps = {
  message?: string;
};

const AnalysisLoading = ({
  message = "문제의 단원과 유형을 분석 중이에요..",
}: AnalysisLoadingProps) => {
  return (
    <div
      className={s.overlay}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={s.center}>
        <div className={s.spinnerBox} aria-hidden="true">
          <div className={s.ring} />
          <div className={s.icon}>
            <Icon name="modal-icon" width={4.4} height={4} />
          </div>
        </div>

        <p className={s.message}>{message}</p>
      </div>
    </div>
  );
};

export default AnalysisLoading;
