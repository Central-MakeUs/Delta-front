/* 그래프 페이지 tab은 ?tab=wrong|unit) */

"use client";

import { useState } from "react";
import LineTabBar from "@/shared/components/tab-bar/line-tab-bar/line-tab-bar";

const GraphPage = () => {
  const [tab, setTab] = useState<"unit" | "type">("unit");
  return (
    <LineTabBar
      items={[
        { value: "unit", label: "단원별" },
        { value: "type", label: "유형별" },
      ]}
      value={tab}
      onValueChange={setTab}
      ariaLabel="학습 탭"
    />
  );
};

export default GraphPage;
