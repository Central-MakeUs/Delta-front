import clsx from "clsx";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Chip from "@/shared/components/chip/chip";
import Icon from "@/shared/components/icon/icon";
import * as s from "@/shared/components/scan-card/scan-card.css";

type ScanCardProps = {
  title: string;
  subjectName: string;
  unitNames: readonly string[];
  imageSrc?: string | StaticImageData | null;
  imageAlt?: string;
  href?: string;
  onDelete?: () => void;
  deleteAriaLabel?: string;
  className?: string;
};

export const ScanCard = ({
  title,
  subjectName,
  unitNames,
  imageSrc,
  imageAlt,
  href,
  onDelete,
  deleteAriaLabel,
  className,
}: ScanCardProps) => {
  const content = (
    <>
      <div className={s.cardFrame}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            unoptimized
            className={s.cardImage}
          />
        ) : null}
        <div className={s.cardOverlay} />
        <div className={s.cardBody}>
          <div className={s.cardContent}>
            <div className={s.chipWrap}>
              {unitNames.map((unitName, index) => (
                <Chip
                  key={`${index}-${unitName}`}
                  as="span"
                  label={unitName}
                  size="xs"
                  shape="square"
                  tone="surface"
                  className={s.unitChip}
                />
              ))}
            </div>
            <p className={s.cardTitle}>{title}</p>
          </div>
        </div>
      </div>

      <span className={s.subjectChip}>{subjectName}</span>
    </>
  );

  return (
    <div className={clsx(s.card, className)}>
      {href ? (
        <Link href={href} className={s.cardLink}>
          {content}
        </Link>
      ) : (
        content
      )}

      {onDelete ? (
        <button
          type="button"
          className={s.deleteButton}
          aria-label={deleteAriaLabel ?? `${title} 삭제`}
          onClick={onDelete}
        >
          <Icon name="trash-chip" size={1.8} />
        </button>
      ) : null}
    </div>
  );
};

export default ScanCard;
