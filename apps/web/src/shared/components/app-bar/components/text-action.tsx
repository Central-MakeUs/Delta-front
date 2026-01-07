import * as s from "@/shared/components/app-bar/app-bar.css";

export const TextAction = ({
  label,
  tone = "action",
  onClick,
  ariaLabel,
}: {
  label: string;
  tone?: "action" | "skip";
  onClick?: () => void;
  ariaLabel?: string;
}) => {
  const textClass = tone === "skip" ? s.skipText : s.actionText;

  if (typeof onClick !== "function") {
    return <span className={textClass}>{label}</span>;
  }

  return (
    <button
      type="button"
      className={s.buttonReset}
      aria-label={ariaLabel ?? label}
      onClick={onClick}
    >
      <span className={textClass}>{label}</span>
    </button>
  );
};

export default TextAction;
