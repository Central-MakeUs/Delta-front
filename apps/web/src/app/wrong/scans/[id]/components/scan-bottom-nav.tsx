"use client";

import Icon from "@/shared/components/icon/icon";
import type { WrongCreateGroupItem } from "@/app/wrong/create/utils/group-context";
import * as s from "@/app/wrong/scans/[id]/page.css";

type ScanBottomNavProps = {
  prevItem: WrongCreateGroupItem | null;
  nextItem: WrongCreateGroupItem | null;
  onMove: (scanId: number) => void;
};

const ScanBottomNav = ({
  prevItem,
  nextItem,
  onMove,
}: ScanBottomNavProps) => {
  return (
    <div className={s.bottomNav}>
      <button
        type="button"
        className={s.navButton}
        disabled={!prevItem}
        onClick={() => prevItem && onMove(prevItem.scanId)}
      >
        <Icon name="chevron" size={2.4} rotate={180} />
        이전 문제
      </button>
      <button
        type="button"
        className={s.navButton}
        disabled={!nextItem}
        onClick={() => nextItem && onMove(nextItem.scanId)}
      >
        다음 문제
        <Icon name="chevron" size={2.4} />
      </button>
    </div>
  );
};

export default ScanBottomNav;
