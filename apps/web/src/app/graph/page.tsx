"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import * as s from "@/app/graph/graph.css";
import LineTabBar from "@/shared/components/tab-bar/line-tab-bar/line-tab-bar";
import BarGraphHorizontal from "@/shared/components/bar-graph/bar-graph-horizontal/bar-graph-horizontal";
import Filter from "@/shared/components/filter/filter";
import WrongStatus from "@/app/graph/components/wrong-status/wrong-status";
import { MOCK_LIST } from "@/app/graph/data/mock-list";
import { GRAPH_TABS, ROUTES, type GraphTab } from "@/shared/constants/routes";

const isGraphTab = (v: string | null): v is GraphTab =>
  v === GRAPH_TABS.UNIT || v === GRAPH_TABS.WRONG;

const TITLE_BY_TAB: Record<GraphTab, string> = {
  [GRAPH_TABS.UNIT]: "단원별 분석 그래프",
  [GRAPH_TABS.WRONG]: "유형별 분석 그래프",
};

const GraphPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const urlTab = searchParams.get("tab");
  const tab: GraphTab = isGraphTab(urlTab) ? urlTab : GRAPH_TABS.UNIT;

  const replayKey = `${pathname}:${tab}`;

  const all = MOCK_LIST.flatMap((g) => g.rows.map((r) => r.value));
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
          <Filter label="기본순" background="transparent" icon="chevron" />
        </div>

        <div className={s.graphWrap}>
          <WrongStatus />

          <div className={s.graphList}>
            {MOCK_LIST.map((g) => (
              <div key={g.id} className={s.graphRow}>
                <div className={s.graphRowInner}>
                  <BarGraphHorizontal
                    key={`${tab}-${g.id}`}
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
    </div>
  );
};

export default GraphPage;
