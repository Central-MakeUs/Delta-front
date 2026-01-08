import type { Meta, StoryObj } from "@storybook/react";
import BarGraphHorizontal from "@/shared/components/bar-graph/bar-graph-horizontal/bar-graph-horizontal";

const meta = {
  title: "Shared/BarGraph/BarGraphHorizontal",
  component: BarGraphHorizontal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "BarGraphHorizontal은 좌측 라벨 + 우측 막대(복수 row)를 렌더링합니다.",
          "",
          "- rows의 value를 기반으로 width를 계산합니다.",
          "- valueLabel이 없으면 formatValueLabel(value)로 자동 생성합니다. (기본: `${value}개`)",
          "- minValue/maxValue로 도메인을 고정할 수 있습니다.",
        ].join("\n"),
      },
    },
  },
  args: {
    label: "공통수학1",
    rows: [
      { value: 8, tone: "active" },
      { value: 7, tone: "inactive" },
    ],
    minBarWidthRem: 12.0,
    maxBarWidthRem: 22.6,
    ariaLabel: "bar graph horizontal",
  },
  argTypes: {
    label: { control: "text" },
    rows: { control: "object" },
    minValue: { control: "number" },
    maxValue: { control: "number" },
    minBarWidthRem: { control: "number" },
    maxBarWidthRem: { control: "number" },
    ariaLabel: { control: "text" },
    className: { control: false },
    formatValueLabel: { control: false },
  },
} satisfies Meta<typeof BarGraphHorizontal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default (auto valueLabel)",
};

export const WithValueLabelOverride: Story = {
  name: "With valueLabel override",
  args: {
    rows: [
      { value: 8, valueLabel: "8개", tone: "active" },
      { value: 7, valueLabel: "7개", tone: "inactive" },
    ],
  },
};

export const CustomFormatter: Story = {
  name: "Custom formatValueLabel",
  args: {
    rows: [
      { value: 12, tone: "active" },
      { value: 4, tone: "inactive" },
    ],
    formatValueLabel: (v: number) => `${v}문항`,
  },
};

export const FixedDomain: Story = {
  name: "Fixed domain (minValue/maxValue)",
  args: {
    rows: [
      { value: 3, tone: "active" },
      { value: 1, tone: "inactive" },
    ],
    minValue: 0,
    maxValue: 10,
  },
};

export const WideRange: Story = {
  name: "Wide range values",
  args: {
    label: "대수",
    rows: [
      { value: 30, tone: "active" },
      { value: 2, tone: "inactive" },
    ],
    minValue: 0,
    maxValue: 30,
    minBarWidthRem: 7,
    maxBarWidthRem: 26,
  },
};
