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

export default PdfCard;
