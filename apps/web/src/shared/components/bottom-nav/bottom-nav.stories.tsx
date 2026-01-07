import type { Meta, StoryObj } from "@storybook/react";
import type { CSSProperties } from "react";
import { useState } from "react";

import BottomNavItem from "@/shared/components/bottom-nav/bottom-nav-item";
import type { IconProps } from "@/shared/components/icon/icon";
import * as s from "@/shared/components/bottom-nav/bottom-nav.css";

type IconName = IconProps["name"];
type NavKey = "home" | "note" | "graph";

type NavItem = {
  key: NavKey;
  label: string;
  iconName: (isActive: boolean) => IconName;
};

const ITEMS: readonly NavItem[] = [
  {
    key: "home",
    label: "홈",
    iconName: () => "home-active",
  },
  {
    key: "note",
    label: "오답 목록",
    iconName: (isActive) => (isActive ? "note-active" : "note-default"),
  },
  {
    key: "graph",
    label: "그래프",
    iconName: (isActive) => (isActive ? "graph-active" : "graph-default"),
  },
];

const storyRootOverride: CSSProperties = {
  position: "relative",
  left: "auto",
  right: "auto",
  bottom: "auto",
};

const BottomNavPreview = ({
  initialActiveKey,
}: {
  initialActiveKey: NavKey;
}) => {
  const [activeKey, setActiveKey] = useState<NavKey>(initialActiveKey);

  return (
    <nav
      className={s.root}
      aria-label="하단 내비게이션"
      style={storyRootOverride}
    >
      <div className={s.container}>
        <div className={s.list}>
          {ITEMS.map((item) => {
            const isActive = item.key === activeKey;

            return (
              <BottomNavItem
                key={item.key}
                isActive={isActive}
                label={item.label}
                iconName={item.iconName(isActive)}
                onClick={() => setActiveKey(item.key)}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
};

const meta = {
  title: "Shared/BottomNav",
  component: BottomNavPreview,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "BottomNav UI 미리보기 스토리입니다.",
          "",
          "- 아이콘/라벨은 active/inactive 상태에 따라 `grayscale-900 / grayscale-400` 컬러가 적용됩니다.",
          "- 실제 앱에서는 `useBottomNav()` 훅이 pathname/searchParams 기반으로 active 상태 및 숨김 여부를 결정합니다.",
          "- 각 아이템을 클릭하면 스토리 내부 state로 active 상태가 바뀝니다.",
        ].join("\n"),
      },
    },
  },
  args: {
    initialActiveKey: "home",
  },
  argTypes: {
    initialActiveKey: {
      control: "inline-radio",
      options: ["home", "note", "graph"],
      description: "초기 활성 탭(클릭으로 변경 가능)",
    },
  },
} satisfies Meta<typeof BottomNavPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  name: "Interactive",
};
