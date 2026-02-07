"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as s from "@/app/graph/graph.css";
import BarGraphHorizontal from "@/shared/components/bar-graph/bar-graph-horizontal/bar-graph-horizontal";
import Filter from "@/shared/components/filter/filter";
import WrongStatus from "@/app/graph/components/wrong-status/wrong-status";
import { GRAPH_TABS, type GraphTab } from "@/shared/constants/routes";
import BottomSheetSort, {
  type SortOption,
} from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort";
import {
  GRAPH_SORT_OPTIONS,
  type GraphSortId,
} from "@/app/graph/constants/sort";
import { TITLE_BY_TAB } from "@/app/graph/constants/graph-title";
import { SORT_TO_API } from "@/app/graph/constants/graph-sort-to-api";
import { computeDomain } from "@/app/graph/utils/graph-domain";
import { toBarRowsTuple } from "@/app/graph/utils/to-bar-rows-tuple";
import { useGraphGroups } from "@/app/graph/hooks/use-graph-groups";
import EmptyState from "@/shared/components/empty-state/empty-state";

const isGraphTab = (v: string | null): v is GraphTab =>
  v === GRAPH_TABS.UNIT || v === GRAPH_TABS.WRONG;

const GraphPage = () => {
  const searchParams = useSearchParams();
  const urlTab = searchParams.get("tab");
  const tab: GraphTab = isGraphTab(urlTab) ? urlTab : GRAPH_TABS.UNIT;

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSortId, setSelectedSortId] =
    useState<GraphSortId>("most-wrong");

  const openSort = () => setIsSortOpen(true);
  const closeSort = () => setIsSortOpen(false);

  const effectiveSortId: GraphSortId =
    tab === GRAPH_TABS.WRONG && selectedSortId === "default"
      ? "most-wrong"
      : selectedSortId;

  const sortOptions: SortOption[] =
    tab === GRAPH_TABS.WRONG
      ? [...GRAPH_SORT_OPTIONS].filter((o) => o.id !== "default")
      : [...GRAPH_SORT_OPTIONS];

  const selectedSortLabel =
    sortOptions.find((o) => o.id === effectiveSortId)?.label ?? "최다 오답순";

  const apiSort = SORT_TO_API[effectiveSortId] ?? "DEFAULT";

  const { groups: graphGroups } = useGraphGroups(tab, apiSort);

  const { minValue: domainMin, maxValue: domainMax } = useMemo(
    () => computeDomain(graphGroups),
    [graphGroups]
  );

  const replayKey = `${tab}-${effectiveSortId}`;

  const hasRenderableGraph = graphGroups.some((g) =>
    Boolean(toBarRowsTuple(g.rows))
  );

  return (
    <div className={s.page}>
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

          {!hasRenderableGraph ? (
            <div className={s.emptyWrap}>
              <EmptyState
                iconName="empty-graph"
                iconSize={5.6}
                label={`아직 분석을 진행 중이에요.\n문제를 더 풀수록 그래프가 완성돼요.`}
              />
            </div>
          ) : (
            <div className={s.graphList}>
              {graphGroups.map((g) => {
                const rowsTuple = toBarRowsTuple(g.rows);
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
                        replayKey={replayKey}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <BottomSheetSort
        isOpen={isSortOpen}
        onClose={closeSort}
        options={sortOptions}
        selectedOptionId={effectiveSortId}
        onSelect={(optionId) => setSelectedSortId(optionId as GraphSortId)}
      />
    </div>
  );
};

export default GraphPage;
