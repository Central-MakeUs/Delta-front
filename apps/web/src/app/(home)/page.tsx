"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { TabItem } from "@/shared/components/tab-bar/tab-bar/tab-bar";
import TabBar from "@/shared/components/tab-bar/tab-bar/tab-bar";
import CardGraph01 from "@/shared/components/card-graph/card-graph-01/card-graph-01";
import ViewAllButton from "@/app/(home)/components/view-all-button/view-all-button";
import * as s from "@/app/(home)/home.css";
import CardGraph02, {
  type CardGraph02Item,
} from "@/shared/components/card-graph/card-graph-02/card-graph-02";
import { ROUTES } from "@/shared/constants/routes";

type TabValue = "최다 오답 단원" | "최다 오답 유형";

const Home = () => {
  const pathname = usePathname();
  const router = useRouter();
  const tabs: readonly TabItem<TabValue>[] = [
    { value: "최다 오답 단원", label: "최다 오답 단원" },
    { value: "최다 오답 유형", label: "최다 오답 유형" },
  ];

  const [value, setValue] = useState<TabValue>("최다 오답 단원");

  const items: readonly CardGraph02Item[] = [
    { value: 10, title: "단원명", valueLabel: "10개", tone: "active" },
    { value: 8, title: "단원명", valueLabel: "8개" },
    { value: 7, title: "단원명", valueLabel: "7개" },
    { value: 5, title: "단원명", valueLabel: "5개" },
  ];

  const handleActionClick = () => {
    router.push(`${ROUTES.WRONG.ROOT}?sort=wrong-incomplete`);
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
          rightSlot={<ViewAllButton onClick={() => console.log("view all")} />}
        />
        <CardGraph02 items={items} />
      </div>
    </div>
  );
};

export default Home;
