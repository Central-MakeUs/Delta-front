import { vars } from "@/shared/styles/theme.css";
import * as s from "@/shared/components/coach-mark/welcome-step/components/welcome-hero.css";

const GRADIENT_ID = "coach-mark-welcome-hero-gradient";

/** 환영 화면 중앙의 세모 심볼. 로고와 동일한 삼각형에 그라데이션을 입힌다. */
export const WelcomeHero = () => {
  return (
    <svg
      className={s.hero}
      viewBox="0 0 23 22"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={vars.color.main[300]} />
          <stop offset="100%" stopColor={vars.color.main[500]} />
        </linearGradient>
      </defs>
      <path
        d="M22.7416 21.5056V1.16612C22.7416 0.72961 22.2172 0.507293 21.9035 0.810793L0.878355 21.1503C0.558947 21.4593 0.777685 22 1.22209 22H22.2472C22.5202 22 22.7416 21.7787 22.7416 21.5056Z"
        fill={`url(#${GRADIENT_ID})`}
      />
    </svg>
  );
};

export default WelcomeHero;
