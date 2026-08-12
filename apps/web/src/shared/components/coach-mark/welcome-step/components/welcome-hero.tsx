import * as s from "@/shared/components/coach-mark/welcome-step/components/welcome-hero.css";

const GRADIENT_ID = "coach-mark-welcome-hero-gradient";

export const WelcomeHero = () => {
  return (
    <svg
      className={s.hero}
      viewBox="0 0 91 87"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={GRADIENT_ID}
          x1="87.4037"
          y1="-5.3656"
          x2="-3.29821"
          y2="86.6344"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFA79A" />
          <stop offset="1" stopColor="#FF604A" />
        </linearGradient>
      </defs>
      <path
        d="M90.0527 82.6344V4.00799C90.0527 0.485253 85.8285 -1.31737 83.2851 1.12003L1.24017 79.7465C-1.36246 82.2406 0.402992 86.6344 4.00778 86.6344H86.0527C88.2619 86.6344 90.0527 84.8435 90.0527 82.6344Z"
        fill={`url(#${GRADIENT_ID})`}
      />
    </svg>
  );
};

export default WelcomeHero;
