"use client";

import Image from "next/image";
import Icon from "@/shared/components/icon/icon";
import type { WrongCreateGroupItem } from "@/app/wrong/create/utils/group-context";
import * as s from "@/app/wrong/scans/[id]/page.css";

type ScanDetailHeroProps = {
  item: WrongCreateGroupItem;
  onEditClick: () => void;
};

const ScanDetailHero = ({ item, onEditClick }: ScanDetailHeroProps) => {
  return (
    <>
      <div className={s.heroHeader}>
        <div className={s.heroMeta}>
          <div className={s.metaRow}>
            <div className={s.chipRow}>
              <div className={s.chip({ kind: "subject" })}>
                {item.subjectName}
              </div>
              {item.typeNames.map((typeName, index) => (
                <div
                  key={`${typeName}-${index}`}
                  className={s.chip({ kind: "type" })}
                >
                  {typeName}
                </div>
              ))}
            </div>
          </div>
          <div className={s.titleRow}>
            <div className={s.heroTitle}>{item.title}</div>
            <button
              type="button"
              className={s.editButton}
              onClick={onEditClick}
            >
              <Icon name="edit-scan" size={2} />
              단원 수정하기
            </button>
          </div>
        </div>
      </div>

      <div className={s.imageWrap}>
        <Image
          src={item.imageUrl}
          alt={item.title}
          unoptimized
          width={1200}
          height={800}
          className={s.image}
        />
      </div>
    </>
  );
};

export default ScanDetailHero;
