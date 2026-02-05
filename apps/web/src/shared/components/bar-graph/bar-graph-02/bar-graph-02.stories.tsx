import type { Meta, StoryObj } from "@storybook/react";
import BarGraph02 from "@/shared/components/bar-graph/bar-graph-02/bar-graph-02";

const meta = {
  title: "Shared/BarGraph/BarGraph02",
  component: BarGraph02,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
세로형 막대 그래프 컴포넌트입니다. 상단에 값 칩(valueLabel)과 필요 시 왕관(showCrown)을 표시합니다.

### 높이 계산 로직
- \`maxValue\`는 0 이하일 경우 0으로 나누는 문제를 피하기 위해 \`safeMax=1\`로 보정합니다.
- \`value\`는 \`0~safeMax\` 범위로 clamp 됩니다.
- 비율 \`ratio = safeValue / safeMax\` (0~1 clamp)
- 최종 높이(rem):
  - \`range = max(maxHeightRem - minHeightRem, 0)\`
  - \`heightRem = minHeightRem + range * ratio\`
- 계산된 \`heightRem\`이 CSS 변수(\`barHeightVar\`)로 주입됩니다.

### 톤(tone)
- \`active\`: 진한 배경
- \`inactive\`: 연한 배경
        `.trim(),
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "18rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: { type: "number", min: 0, step: 1 },
      description: "막대 값. 내부에서 `0~safeMax`로 clamp 됩니다.",
      table: { type: { summary: "number" } },
    },
    maxValue: {
      control: { type: "number", min: 0, step: 1 },
      description:
        "비교 기준 최대값. 0 이하인 경우 safeMax=1로 보정되어 높이를 계산합니다.",
      table: { type: { summary: "number" } },
    },
    valueLabel: {
      control: "text",
      description: "상단 칩에 표시되는 텍스트(예: `10개`).",
      table: { type: { summary: "string" } },
    },
    tone: {
      control: "radio",
      options: ["active", "inactive"],
      description:
        "막대 톤. 미지정 시 `active`. (active: 진한 배경 / inactive: 연한 배경)",
      table: { type: { summary: '"active" | "inactive"' } },
    },
    showTarget: {
      control: "boolean",
      description: "상단에 왕관 아이콘 표시 여부.",
      table: { type: { summary: "boolean" } },
    },
    maxHeightRem: {
      control: { type: "number", min: 0, step: 0.1 },
      description: "막대의 최대 높이(rem). 기본값은 11.1 입니다.",
      table: { type: { summary: "number" }, defaultValue: { summary: "11.1" } },
    },
    minHeightRem: {
      control: { type: "number", min: 0, step: 0.1 },
      description:
        "막대의 최소 높이(rem). 기본값은 4 입니다. maxHeightRem보다 크면 range=0으로 처리되어 항상 minHeightRem이 됩니다.",
      table: { type: { summary: "number" }, defaultValue: { summary: "4" } },
    },
    className: {
      control: false,
      description:
        "외부 레이아웃 조정이 필요할 때만 사용하세요(기본 스타일은 vanilla-extract로 관리).",
      table: { type: { summary: "string" } },
    },
  },
} satisfies Meta<typeof BarGraph02>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    value: 10,
    maxValue: 10,
    valueLabel: "10개",
    tone: "active",
  },
  render: (args) => <BarGraph02 {...args} />,
};

export const Inactive: Story = {
  args: {
    value: 8,
    maxValue: 10,
    valueLabel: "8개",
    tone: "inactive",
  },
  render: (args) => <BarGraph02 {...args} />,
};

export const WithCrown: Story = {
  args: {
    value: 10,
    maxValue: 10,
    valueLabel: "10개",
    tone: "active",
    showTarget: true,
  },
  render: (args) => <BarGraph02 {...args} />,
};

export const MidValue: Story = {
  name: "Mid (value/maxValue)",
  args: {
    value: 5,
    maxValue: 10,
    valueLabel: "5개",
    tone: "active",
  },
  render: (args) => <BarGraph02 {...args} />,
};

export const ZeroValue: Story = {
  name: "Zero value",
  args: {
    value: 0,
    maxValue: 10,
    valueLabel: "0개",
    tone: "inactive",
  },
  render: (args) => <BarGraph02 {...args} />,
};
