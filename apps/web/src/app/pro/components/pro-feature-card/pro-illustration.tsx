"use client";

import type { ProFeatureCode } from "@/app/pro/constants/pro-features";

type Props = {
  variant: ProFeatureCode;
};

export const ProIllustration = ({ variant }: Props) => {
  if (variant === "pro-01") return <ChartCard />;
  if (variant === "pro-02") return <PdfCard />;
  if (variant === "pro-03") return <TutorCard />;
  if (variant === "pro-04") return <ExpansionCard />;
  return <AnalyticsCard />;
};

const ChartCard = () => {
  return (
    <svg
      width="12.0rem"
      height="12.0rem"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="10"
        y="14"
        width="100"
        height="92"
        rx="12"
        fill="white"
        stroke="rgba(0,0,0,0.06)"
      />
      <text x="20" y="34" fontSize="10" fill="#3f4150" fontWeight="600">
        가장 많이 틀린 유형
      </text>
      <rect x="22" y="44" width="16" height="40" rx="4" fill="#d3d5dd" />
      <rect x="44" y="52" width="16" height="32" rx="4" fill="#bec0cd" />
      <rect x="66" y="60" width="16" height="24" rx="4" fill="#a1a3b6" />
      <rect x="88" y="40" width="16" height="44" rx="4" fill="#ffb6ac" />
      <path d="M20 92 H100" stroke="rgba(0,0,0,0.12)" />
      <path
        d="M24 96 L44 78 L64 86 L84 96 L104 70"
        stroke="#a1a3b6"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="24" cy="96" r="3.5" fill="#ffb6ac" />
      <circle cx="44" cy="78" r="3.5" fill="#ffb6ac" />
      <circle cx="64" cy="86" r="3.5" fill="#ffb6ac" />
      <circle cx="84" cy="96" r="3.5" fill="#ffb6ac" />
      <circle cx="104" cy="70" r="3.5" fill="#ffb6ac" />
    </svg>
  );
};

const PdfCard = () => {
  return (
    <svg
      width="12.0rem"
      height="12.0rem"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="28"
        y="16"
        width="64"
        height="76"
        rx="10"
        fill="#ff604a"
        opacity="0.95"
      />
      <path d="M72 16v20h20" fill="white" opacity="0.3" />
      <path d="M72 16l20 20" stroke="rgba(255,255,255,0.4)" />
      <path
        d="M46 72c10-18 18 18 28 0"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M36 100l20-20"
        stroke="#ffcec7"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M54 84l10 10"
        stroke="#ffcec7"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
};

const TutorCard = () => {
  return (
    <svg
      width="12.0rem"
      height="12.0rem"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <rect x="26" y="22" width="68" height="68" rx="14" fill="#ffcec7" />
      <rect
        x="36"
        y="32"
        width="48"
        height="48"
        rx="12"
        fill="white"
        opacity="0.85"
      />
      <path
        d="M46 46h10"
        stroke="#ff604a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M66 46h10"
        stroke="#ff604a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M46 62h10"
        stroke="#ff604a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M66 62h10"
        stroke="#ff604a"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M78 86l16 16"
        stroke="#515468"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M88 76l18 18"
        stroke="#3f4150"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
};

const ExpansionCard = () => {
  return (
    <svg
      width="12.0rem"
      height="12.0rem"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="20"
        y="28"
        width="80"
        height="60"
        rx="14"
        fill="#ffb6ac"
        opacity="0.9"
      />
      <rect
        x="28"
        y="36"
        width="44"
        height="10"
        rx="4"
        fill="white"
        opacity="0.9"
      />
      <rect
        x="28"
        y="52"
        width="64"
        height="10"
        rx="4"
        fill="white"
        opacity="0.85"
      />
      <rect
        x="28"
        y="68"
        width="54"
        height="10"
        rx="4"
        fill="white"
        opacity="0.8"
      />
      <path
        d="M26 88h72"
        stroke="#ff604a"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
};

const AnalyticsCard = () => {
  return (
    <svg
      width="12.0rem"
      height="12.0rem"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <rect x="22" y="22" width="76" height="76" rx="18" fill="#ffefed" />
      <path
        d="M34 80c10-10 18 6 28-6 8-10 14 6 24-12"
        stroke="#ff806e"
        strokeWidth="4"
        fill="none"
      />
      <circle cx="34" cy="80" r="4" fill="#ff604a" />
      <circle cx="62" cy="74" r="4" fill="#ff604a" />
      <circle cx="86" cy="62" r="4" fill="#ff604a" />
      <path
        d="M40 40h40"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M40 52h28"
        stroke="rgba(0,0,0,0.10)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};
