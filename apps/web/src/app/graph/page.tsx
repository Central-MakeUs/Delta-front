"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as s from "@/app/graph/graph.css";
import LineTabBar from "@/shared/components/tab-bar/line-tab-bar/line-tab-bar";
import BarGraphHorizontal from "@/shared/components/bar-graph/bar-graph-horizontal/bar-graph-horizontal";
import type { BarRow } from "@/shared/components/bar-graph/bar-graph-horizontal/bar-graph-horizontal";
import Filter from "@/shared/components/filter/filter";
import WrongStatus from "@/app/graph/components/wrong-status/wrong-status";
import { GRAPH_TABS, ROUTES, type GraphTab } from "@/shared/constants/routes";
import BottomSheetSort from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort";
import {
  GRAPH_SORT_OPTIONS,
  type GraphSortId,
} from "@/app/graph/constants/sort";
import type { ProblemStatsSort } from "@/shared/apis/graph/graph-types";
import { useGraphUnitStatsQuery } from "@/shared/apis/graph/hooks/use-graph-unit-stats-query";
import { useGraphTypeStatsQuery } from "@/shared/apis/graph/hooks/use-graph-type-stats-query";

const isGraphTab = (v: string | null): v is GraphTab =>
  v === GRAPH_TABS.UNIT || v === GRAPH_TABS.WRONG;

const TITLE_BY_TAB: Record<GraphTab, string> = {
  [GRAPH_TABS.UNIT]: "단원별 분석 그래프",
  [GRAPH_TABS.WRONG]: "유형별 분석 그래프",
};

const SORT_TO_API: Record<string, ProblemStatsSort> = {
  "most-wrong": "MAX",
  "least-wrong": "MIN",
  default: "DEFAULT",
};

const toNonEmptyTuple = <T,>(
  arr: readonly T[]
): readonly [T, ...T[]] | null => {
  if (arr.length === 0) return null;
  return arr as readonly [T, ...T[]];
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

  const apiSort: ProblemStatsSort = SORT_TO_API[selectedSortId] ?? "DEFAULT";

  const unitStatsQuery = useGraphUnitStatsQuery({
    sort: apiSort,
    enabled: tab === GRAPH_TABS.UNIT,
  });

  const typeStatsQuery = useGraphTypeStatsQuery({
    sort: apiSort,
    enabled: tab === GRAPH_TABS.WRONG,
  });

  const unitGroups = unitStatsQuery.data ?? [];
  const typeGroups = typeStatsQuery.data ?? [];

  const graphGroups = useMemo(
    () => (tab === GRAPH_TABS.UNIT ? unitGroups : typeGroups),
    [tab, unitGroups, typeGroups]
  );

  const all = useMemo(
    () => graphGroups.flatMap((g) => g.rows.map((r) => r.value)),
    [graphGroups]
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
            {graphGroups.map((g) => {
              const barRows = g.rows.map<BarRow>((r) => ({
                id: r.id,
                value: r.value,
                tone: r.tone,
                valueLabel: r.valueLabel,
              }));

              const rowsTuple = toNonEmptyTuple(barRows);
              if (!rowsTuple) return null;

              return (
                <div key={g.id} className={s.graphRow}>
                  <div className={s.graphRowInner}>
                    <BarGraphHorizontal
                      label={g.label}
                      rows={rowsTuple}
                      minValue={domainMin}
                      maxValue={domainMax}
                      minBarWidthRem={7}
                      maxBarWidthRem={26}
                      animate
                    />
                  </div>
                </div>
              );
            })}
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
