"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/button/button/button";
import Chip from "@/shared/components/chip/chip";
import Divider from "@/shared/components/divider/divider";
import { ROUTES } from "@/shared/constants/routes";
import {
  readWrongCreateGroupContext,
  type WrongCreateGroupItem,
} from "@/app/wrong/create/utils/group-context";
import * as s from "./scans.css";

type TabId = "all" | "done" | "review";

const WrongCreateScansPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("group");
  const [activeTab, setActiveTab] = useState<TabId>("all");

  const group = useMemo(() => readWrongCreateGroupContext(groupId), [groupId]);

  useEffect(() => {
    if (!groupId || group) return;
    router.replace(ROUTES.WRONG.ROOT);
  }, [group, groupId, router]);

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
              <Link
                key={item.scanId}
                href={buildProblemHref(item)}
                className={s.card}
              >
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

                <Chip
                  as="span"
                  label={item.subjectName}
                  size="md"
                  shape="square"
                  tone="solid"
                  state="active"
                  className={s.subjectChip}
                />
              </Link>
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
    </div>
  );
};

export default WrongCreateScansPage;
