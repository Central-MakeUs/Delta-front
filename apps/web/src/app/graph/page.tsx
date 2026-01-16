"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as s from "@/app/graph/graph.css";
import LineTabBar from "@/shared/components/tab-bar/line-tab-bar/line-tab-bar";
import BarGraphHorizontal from "@/shared/components/bar-graph/bar-graph-horizontal/bar-graph-horizontal";
import Filter from "@/shared/components/filter/filter";
import WrongStatus from "@/app/graph/components/wrong-status/wrong-status";
import { MOCK_LIST } from "@/app/graph/data/mock-list";
import { GRAPH_TABS, ROUTES, type GraphTab } from "@/shared/constants/routes";
import BottomSheetSort from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort";
import {
  GRAPH_SORT_OPTIONS,
  type GraphSortId,
} from "@/app/graph/constants/sort";
import { sortGraphList } from "@/app/graph/utils/sort-graph-list";
import { useDeferredAnimateSeed } from "@/app/graph/hooks/use-deferred-animate-seed";

const isGraphTab = (v: string | null): v is GraphTab =>
  v === GRAPH_TABS.UNIT || v === GRAPH_TABS.WRONG;

const TITLE_BY_TAB: Record<GraphTab, string> = {
  [GRAPH_TABS.UNIT]: "단원별 분석 그래프",
  [GRAPH_TABS.WRONG]: "유형별 분석 그래프",
};

const GraphPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlTab = searchParams.get("tab");
  const tab: GraphTab = isGraphTab(urlTab) ? urlTab : GRAPH_TABS.UNIT;

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSortId, setSelectedSortId] =
    useState<GraphSortId>("most-wrong");

  const openSort = () => setIsSortOpen(true);
  const closeSort = () => setIsSortOpen(false);

  const selectedSortLabel =
    GRAPH_SORT_OPTIONS.find((o) => o.id === selectedSortId)?.label ??
    "최다 오답순";

  const listWithMeta = useMemo(
    () => MOCK_LIST.map((g, idx) => ({ ...g, __order: idx })),
    []
  );

  const sortedList = useMemo(
    () => sortGraphList({ list: listWithMeta, sortId: selectedSortId }),
    [listWithMeta, selectedSortId]
  );

  const animateSeed = useDeferredAnimateSeed([selectedSortId, tab]);

  const all = useMemo(
    () => sortedList.flatMap((g) => g.rows.map((r) => r.value)),
    [sortedList]
  );

  const domainMin = all.length > 0 ? Math.min(...all) : 0;
  const domainMax = all.length > 0 ? Math.max(...all) : 1;

  return (
    <div className={s.page}>
      <div className={s.stickyTop}>
        <LineTabBar
          items={[
            { value: GRAPH_TABS.UNIT, label: "단원별" },
            { value: GRAPH_TABS.WRONG, label: "유형별" },
          ]}
          value={tab}
          onValueChange={(next) => router.replace(ROUTES.GRAPH.tab(next))}
          ariaLabel="학습 탭"
        />
      </div>

      <div className={s.content}>
        <div className={s.titleSection}>
          <h1 className={s.title}>{TITLE_BY_TAB[tab]}</h1>

          <Filter
            label={selectedSortLabel}
            background="transparent"
            icon="chevron"
            onClick={openSort}
          />
        </div>

        <div className={s.graphWrap}>
          <WrongStatus />

          <div className={s.graphList}>
            {sortedList.map((g) => (
              <div key={g.id} className={s.graphRow}>
                <div className={s.graphRowInner}>
                  <BarGraphHorizontal
                    key={`${tab}-${animateSeed}-${g.id}`}
                    label={g.label}
                    rows={g.rows}
                    minValue={domainMin}
                    maxValue={domainMax}
                    minBarWidthRem={7}
                    maxBarWidthRem={26}
                    animate
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomSheetSort
        isOpen={isSortOpen}
        onClose={closeSort}
        options={[...GRAPH_SORT_OPTIONS]}
        selectedOptionId={selectedSortId}
        onSelect={(optionId) => setSelectedSortId(optionId as GraphSortId)}
      />
    </div>
  );
};

export default GraphPage;
