"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { TabItem } from "@/shared/components/tab-bar/tab-bar/tab-bar";
import TabBar from "@/shared/components/tab-bar/tab-bar/tab-bar";
import CardGraph01 from "@/shared/components/card-graph/card-graph-01/card-graph-01";
import ViewAllButton from "@/app/(home)/components/view-all-button/view-all-button";
import * as s from "@/app/(home)/home.css";
import CardGraph02, {
  type CardGraph02Item,
} from "@/shared/components/card-graph/card-graph-02/card-graph-02";
import { GRAPH_TABS, ROUTES } from "@/shared/constants/routes";

import type { ProblemStatsSort } from "@/shared/apis/graph/graph-types";
import { useGraphUnitStatsQuery } from "@/shared/apis/graph/hooks/use-graph-unit-stats-query";
import { useGraphTypeStatsQuery } from "@/shared/apis/graph/hooks/use-graph-type-stats-query";

type TabValue = "최다 오답 단원" | "최다 오답 유형";

const Home = () => {
  const pathname = usePathname();
  const router = useRouter();

  const tabs: readonly TabItem<TabValue>[] = [
    { value: "최다 오답 단원", label: "최다 오답 단원" },
    { value: "최다 오답 유형", label: "최다 오답 유형" },
  ];

  const [value, setValue] = useState<TabValue>("최다 오답 단원");
  const isUnitTab = value === "최다 오답 단원";

  const sort: ProblemStatsSort = "MAX";

  const { data: unitGroups = [] } = useGraphUnitStatsQuery({
    sort,
    enabled: isUnitTab,
  });

  const { data: typeGroups = [] } = useGraphTypeStatsQuery({
    sort,
    enabled: !isUnitTab,
  });

  const items: readonly CardGraph02Item[] = useMemo(() => {
    const groups = isUnitTab ? unitGroups : typeGroups;

    return groups.slice(0, 4).map((g) => {
      const total = g.rows.reduce((acc, r) => acc + (r.value ?? 0), 0);

      return {
        value: total,
        title: g.label,
        valueLabel: `${total}개`,
      };
    });
  }, [isUnitTab, unitGroups, typeGroups]);

  const handleActionClick = () => {
    router.push(`${ROUTES.WRONG.ROOT}?sort=wrong-incomplete`);
  };

  const handleViewAll = () => {
    const tab = isUnitTab ? GRAPH_TABS.UNIT : GRAPH_TABS.WRONG;
    router.push(ROUTES.GRAPH.tab(tab));
  };

  return (
    <div className={s.page}>
      <div className={s.incorrect}>
        <h1 className={s.title}>
          안녕하세요
          <br /> 오늘도 세모랑 같이 오답 정리해요!
        </h1>
        <CardGraph01
          monthLabel="1월"
          registeredCount={24}
          graphPercent={80}
          graphLabel="16/24"
          onActionClick={handleActionClick}
          replayKey={pathname}
        />
      </div>

      <div className={s.graph}>
        <TabBar
          tabs={tabs}
          value={value}
          onValueChange={setValue}
          rightSlot={<ViewAllButton onClick={handleViewAll} />}
        />
        <CardGraph02 items={items} />
      </div>
    </div>
  );
};

export default Home;
