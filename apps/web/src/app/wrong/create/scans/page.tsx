"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/button/button/button";
import Chip from "@/shared/components/chip/chip";
import Divider from "@/shared/components/divider/divider";
import Icon from "@/shared/components/icon/icon";
import CompleteModal from "@/shared/components/modal/complete-modal/complete-modal";
import { ROUTES } from "@/shared/constants/routes";
import {
  readWrongCreateGroupContext,
  saveWrongCreateGroupContext,
  type WrongCreateGroupItem,
  type WrongCreateGroupContext,
} from "@/app/wrong/create/utils/group-context";
import * as s from "./scans.css";

type TabId = "all" | "done" | "review";

const WrongCreateScansPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("group");
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const storedGroup = useMemo(
    () => readWrongCreateGroupContext(groupId),
    [groupId]
  );
  const [updatedGroup, setUpdatedGroup] =
    useState<WrongCreateGroupContext | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<WrongCreateGroupItem | null>(
    null
  );
  const group = updatedGroup?.id === groupId ? updatedGroup : storedGroup;

  useEffect(() => {
    if (!groupId) {
      router.replace(ROUTES.WRONG.CREATE);
      return;
    }

    if (!storedGroup) {
      router.replace(ROUTES.WRONG.ROOT);
    }
  }, [groupId, router, storedGroup]);

  const items = useMemo(() => group?.items ?? [], [group]);

  const tabs = useMemo(
    () => [
      { id: "all" as const, label: `전체 (${items.length})` },
      {
        id: "done" as const,
        label: `분류 완료 (${items.filter((item) => !item.needsReview).length})`,
      },
      {
        id: "review" as const,
        label: `검토 필요 (${items.filter((item) => item.needsReview).length})`,
      },
    ],
    [items]
  );

  const visibleItems = useMemo(() => {
    if (activeTab === "done") return items.filter((item) => !item.needsReview);
    if (activeTab === "review") return items.filter((item) => item.needsReview);
    return items;
  }, [activeTab, items]);

  const buildProblemHref = (item: WrongCreateGroupItem) => {
    if (!groupId) return ROUTES.WRONG.SCAN_DETAIL(item.scanId);
    return `${ROUTES.WRONG.SCAN_DETAIL(item.scanId)}?group=${encodeURIComponent(groupId)}`;
  };

  const handleNext = () => {
    const firstItem = items[0];
    if (!firstItem) return;
    router.push(buildProblemHref(firstItem));
  };

  const handleDeleteConfirm = () => {
    if (!group || !deleteTarget) return;

    const nextGroup = {
      ...group,
      items: group.items.filter((item) => item.scanId !== deleteTarget.scanId),
    };

    saveWrongCreateGroupContext(nextGroup);
    setUpdatedGroup(nextGroup);
    setDeleteTarget(null);
  };

  if (!group) return null;

  return (
    <div className={s.page}>
      <div className={s.header}>
        <h1 className={s.title}>등록한 문제</h1>
        <p className={s.description}>
          AI가 분류한 문제별 단원유형을 확인해보세요.
        </p>
      </div>

      <div className={s.tabSection}>
        <div className={s.tabRow} role="tablist" aria-label="등록 문제 상태">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={clsx(
                s.tabButton,
                activeTab === tab.id && s.tabButtonActive
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
          <Divider
            height="hairline"
            tone="grayscale-50"
            className={s.tabDivider}
          />
        </div>
      </div>

      <div className={s.content}>
        {visibleItems.length === 0 ? (
          <p className={s.empty}>표시할 문제가 없어요.</p>
        ) : (
          <div className={s.grid}>
            {visibleItems.map((item) => (
              <div key={item.scanId} className={s.card}>
                <Link href={buildProblemHref(item)} className={s.cardLink}>
                  <div className={s.cardFrame}>
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        unoptimized
                        className={s.cardImage}
                      />
                    ) : null}
                    <div className={s.cardOverlay} />
                    <div className={s.cardBody}>
                      <div className={s.cardContent}>
                        <div className={s.chipWrap}>
                          <Chip
                            as="span"
                            label={item.unitName}
                            size="xs"
                            shape="square"
                            tone="surface"
                            className={s.unitChip}
                          />
                        </div>
                        <p className={s.cardTitle}>{item.title}</p>
                      </div>
                    </div>
                  </div>

                  <span className={s.subjectChip}>{item.subjectName}</span>
                </Link>
                <button
                  type="button"
                  className={s.deleteButton}
                  aria-label={`${item.title} 삭제`}
                  onClick={() => setDeleteTarget(item)}
                >
                  <Icon name="trash-chip" size={1.8} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={s.footer}>
        <Button
          fullWidth
          size="48"
          tone="dark"
          label="다음"
          onClick={handleNext}
          disabled={items.length === 0}
        />
      </div>

      <CompleteModal
        title="문제를 삭제할까요?"
        description="삭제한 문제는 이번 등록 목록에서 제외돼요."
        cancelLabel="취소"
        confirmLabel="삭제"
        iconName="trash-modal"
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default WrongCreateScansPage;
