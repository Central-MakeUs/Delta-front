import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TabBar from "@/shared/components/tab-bar/tab-bar/tab-bar";
import type {
  TabBarProps,
  TabItem,
} from "@/shared/components/tab-bar/tab-bar/tab-bar";

type TabValue = "최다 오답 단원" | "최다 오답 유형" | "Disabled";

const tabs: readonly TabItem<TabValue>[] = [
  { value: "최다 오답 단원", label: "최다 오답 단원" },
  { value: "최다 오답 유형", label: "최다 오답 유형" },
  { value: "Disabled", label: "Disabled", disabled: true },
];

const BoundTabBar = (props: TabBarProps<TabValue>) => {
  return <TabBar<TabValue> {...props} />;
};

const RightSlotButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        marginLeft: "auto",
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      전체 보기
    </button>
  );
};

const ControlledExample = (args: TabBarProps<TabValue>) => {
  const [value, setValue] = useState<TabValue>("최다 오답 유형");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.6rem",
        padding: "2.0rem",
      }}
    >
      <BoundTabBar
        {...args}
        value={value}
        onValueChange={(next) => setValue(next)}
      />
      <div>
        현재 선택된 탭: <b>{value}</b>
      </div>
    </div>
  );
};

const meta = {
  title: "Shared/TabBar",
  component: BoundTabBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "TabBar는 상위 컴포넌트로, 내부에서 `TabButton`을 사용해 탭 UI를 구성합니다.",
          "",
          "- `tabs` 배열을 기반으로 탭 버튼을 렌더링합니다.",
          "- `value/onValueChange`를 전달하면 Controlled로 동작합니다.",
          "- `defaultValue`를 전달하면 Uncontrolled로 동작합니다.",
          "- `rightSlot`을 사용하면 우측 영역에 액션(예: 전체 보기 버튼)을 주입할 수 있습니다.",
          "- 버튼 간 간격(gap)은 0.4rem이며, 컨테이너는 자식 요소 기준(Hug) 크기입니다.",
        ].join("\n"),
      },
    },
  },
  args: {
    tabs,
    ariaLabel: "tab bar",
    rightSlot: undefined,
  },
  argTypes: {
    tabs: { control: "object", description: "탭 목록 (value/label/disabled)" },
    ariaLabel: { control: "text", description: "tablist aria-label" },
    rightSlot: {
      control: false,
      description: "우측 슬롯(전체 보기 등) 주입용 ReactNode",
      table: { type: { summary: "ReactNode" } },
    },
    className: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    onValueChange: { control: false },
  },
} satisfies Meta<typeof BoundTabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  name: "Uncontrolled (defaultValue)",
  render: (args) => (
    <div style={{ padding: "2.0rem" }}>
      <BoundTabBar {...args} defaultValue="최다 오답 단원" />
    </div>
  ),
};

export const UncontrolledWithRightSlot: Story = {
  name: "Uncontrolled + rightSlot",
  render: (args) => (
    <div style={{ padding: "2.0rem" }}>
      <BoundTabBar
        {...args}
        defaultValue="최다 오답 단원"
        rightSlot={<RightSlotButton onClick={() => console.log("view all")} />}
      />
    </div>
  ),
};

export const Controlled: Story = {
  name: "Controlled (value/onValueChange)",
  render: (args) => <ControlledExample {...args} />,
};

export const ControlledWithRightSlot: Story = {
  name: "Controlled + rightSlot",
  render: (args) => (
    <ControlledExample
      {...args}
      rightSlot={<RightSlotButton onClick={() => console.log("view all")} />}
    />
  ),
};
