"use client";

import { useState } from "react";
import * as s from "@/app/graph/graph.css";
import LineTabBar from "@/shared/components/tab-bar/line-tab-bar/line-tab-bar";
import BarGraphHorizontal from "@/shared/components/bar-graph/bar-graph-horizontal/bar-graph-horizontal";
import Filter from "@/shared/components/filter/filter";
import WrongStatus from "@/app/graph/components/wrong-status/wrong-status";

const GraphPage = () => {
  const [tab, setTab] = useState<"unit" | "type">("unit");

  return (
    <div className={s.page}>
      <div className={s.stickyTop}>
        <LineTabBar
          items={[
            { value: "unit", label: "단원별" },
            { value: "type", label: "유형별" },
          ]}
          value={tab}
          onValueChange={setTab}
          ariaLabel="학습 탭"
        />
      </div>

      <div className={s.content}>
        <div className={s.titleSection}>
          <h1 className={s.title}>단원별 분석 그래프</h1>
          <Filter label="기본순" background="transparent" icon="chevron" />
        </div>
        <div className={s.grapWrap}>
          <WrongStatus />
          <div className={s.graphList}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={s.graphRow}>
                <div className={s.graphRowInner}>
                  <BarGraphHorizontal
                    label="공통수학1"
                    rows={[
                      { value: 8, valueLabel: "8개", tone: "active" },
                      { value: 7, valueLabel: "7개", tone: "inactive" },
                    ]}
                    minBarWidthRem={12.0}
                    maxBarWidthRem={22.6}
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
