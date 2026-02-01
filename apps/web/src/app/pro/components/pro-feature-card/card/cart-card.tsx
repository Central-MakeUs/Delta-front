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

export default ChartCard;
