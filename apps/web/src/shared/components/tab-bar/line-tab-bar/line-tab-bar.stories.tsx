import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import LineTabBar, {
  type LineTabBarProps,
} from "@/shared/components/tab-bar/line-tab-bar/line-tab-bar";

type TabValue = "unit" | "wrong" | "disabled";

const BoundLineTabBar = (props: LineTabBarProps<TabValue>) => {
  return <LineTabBar<TabValue> {...props} />;
};

const items = [
  { value: "unit", label: "단원별" },
  { value: "wrong", label: "유형별" },
  { value: "disabled", label: "Disabled", disabled: true },
] as const satisfies LineTabBarProps<TabValue>["items"];

const meta = {
  title: "Shared/TabBar/LineTabBar",
  component: BoundLineTabBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "LineTabBar는 선택된 탭에 underline이 표시되는 탭바입니다.",
          "",
          "- `value/onValueChange`를 전달하면 Controlled로 동작합니다.",
          "- `defaultValue`를 전달하면 Uncontrolled로 동작합니다.",
        ].join("\n"),
      },
    },
  },
  args: {
    items,
    size: "lg",
    ariaLabel: "tab bar",
  },
  argTypes: {
    items: { control: "object" },
    size: { control: "radio", options: ["lg"] },
    ariaLabel: { control: "text" },
    className: { control: false },
    value: { control: false },
    defaultValue: { control: false },
    onValueChange: { control: false },
  },
} satisfies Meta<typeof BoundLineTabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  name: "Uncontrolled (defaultValue)",
  render: (args) => (
    <div style={{ padding: "2.0rem", background: "#fff" }}>
      <BoundLineTabBar {...args} defaultValue="unit" />
    </div>
  ),
};

export const UncontrolledWithDisabled: Story = {
  name: "Uncontrolled + disabled item",
  render: (args) => (
    <div style={{ padding: "2.0rem", background: "#fff" }}>
      <BoundLineTabBar {...args} defaultValue="disabled" />
      <div style={{ marginTop: "1.2rem", fontSize: "12px", color: "#999" }}>
        Arrow key로 이동 시 disabled는 건너뜁니다.
      </div>
    </div>
  ),
};

const ControlledExample = (props: LineTabBarProps<TabValue>) => {
  const [value, setValue] = useState<TabValue>("unit");

  return (
    <div
      style={{
        padding: "2.0rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.6rem",
      }}
    >
      <LineTabBar<TabValue>
        {...props}
        value={value}
        onValueChange={(next) => setValue(next)}
      />
      <div>
        현재 선택된 탭: <b>{value}</b>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  name: "Controlled",
  render: (args) => <ControlledExample {...args} />,
};

const itemsNoDisabled = [
  { value: "unit", label: "단원별" },
  { value: "wrong", label: "유형별" },
] as const satisfies LineTabBarProps<TabValue>["items"];

const ControlledNoDisabledExample = (
  props: Omit<LineTabBarProps<TabValue>, "items">
) => {
  const [value, setValue] = useState<TabValue>("wrong");

  return (
    <div
      style={{
        padding: "2.0rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.6rem",
      }}
    >
      <LineTabBar<TabValue>
        {...props}
        items={itemsNoDisabled}
        value={value}
        onValueChange={(next) => setValue(next)}
      />
      <div>
        현재 선택된 탭: <b>{value}</b>
      </div>
    </div>
  );
};

export const ControlledNoDisabled: Story = {
  name: "Controlled (no disabled)",
  render: (args) => <ControlledNoDisabledExample {...args} />,
};
