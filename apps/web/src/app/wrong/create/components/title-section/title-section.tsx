import clsx from "clsx";
import * as s from "@/app/wrong/create/components/title-section/title-section.css";

type TitleSectionProps = {
  title: string;
  subTitle?: string;
  className?: string;
  ariaLabel?: string;
};

const TitleSection = ({
  title,
  subTitle,
  className,
  ariaLabel,
}: TitleSectionProps) => {
  return (
    <div className={clsx(s.titleSection, className)} aria-label={ariaLabel}>
      <h1 className={s.title}>{title}</h1>
      {subTitle ? <span className={s.subTitle}>{subTitle}</span> : null}
    </div>
  );
};

export default TitleSection;
