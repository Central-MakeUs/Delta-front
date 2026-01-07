import type { Meta, StoryObj } from "@storybook/react";
import CardGraph01 from "@/shared/components/card-graph/card-graph-01/card-graph-01";

const meta = {
  title: "Shared/CardGraph/CardGraph01",
  component: CardGraph01,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
월별 오답 현황을 카드 형태로 보여주는 컴포넌트입니다.

- 상단: \`{monthLabel} 수학 오답 현황\` 칩 + 등록한 문제 수(\`registeredCount\`)
- 하단: 진행률(\`graphPercent\`)을 %로 표시 + 액션 버튼 + BarGraph01(퍼센트/라벨)
- \`graphPercent\`는 내부에서 0~100으로 clamp 후 BarGraph01에 전달됩니다.
- \`onActionClick\`은 “남은 문제 오답하기” 버튼 클릭 시 호출됩니다.
        `.trim(),
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "36rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    monthLabel: {
      control: "text",
      description:
        "월 라벨(예: `1월`). 칩 문구에 `${monthLabel} 수학 오답 현황` 형태로 노출됩니다.",
      table: {
        type: { summary: "string" },
      },
    },
    registeredCount: {
      control: { type: "number", min: 0 },
      description: "등록한 문제 수. `등록한 문제 | N개`로 표시됩니다.",
      table: {
        type: { summary: "number" },
      },
    },
    graphPercent: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description:
        "진행 퍼센트(0~100). 내부에서 clamp 후 반올림 퍼센트 라벨과 BarGraph01에 전달됩니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0~100" },
      },
    },
    graphLabel: {
      control: "text",
      description: "BarGraph01에 표시되는 라벨(예: `16/24`).",
      table: {
        type: { summary: "string" },
      },
    },
    onActionClick: {
      action: "action-click",
      description: "“남은 문제 오답하기” 버튼 클릭 시 호출되는 핸들러입니다.",
      table: {
        type: { summary: "() => void" },
      },
    },
    className: {
      control: false,
      description:
        "외부에서 레이아웃 조정이 필요할 때만 사용하세요(기본 스타일은 vanilla-extract로 관리).",
      table: {
        type: { summary: "string" },
      },
    },
    ariaLabel: {
      control: "text",
      description: "section의 aria-label. 접근성/테스트 식별용으로 사용합니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "card graph 01" },
      },
    },
  },
} satisfies Meta<typeof CardGraph01>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    monthLabel: "1월",
    registeredCount: 24,
    graphPercent: 70,
    graphLabel: "16/24",
    ariaLabel: "card graph 01",
  },
  render: (args) => <CardGraph01 {...args} />,
};

export const LowProgress: Story = {
  name: "Low / 10%",
  args: {
    monthLabel: "1월",
    registeredCount: 24,
    graphPercent: 10,
    graphLabel: "2/24",
  },
  render: (args) => <CardGraph01 {...args} />,
};

export const Complete: Story = {
  name: "Complete / 100%",
  args: {
    monthLabel: "1월",
    registeredCount: 24,
    graphPercent: 100,
    graphLabel: "24/24",
  },
  render: (args) => <CardGraph01 {...args} />,
};

export const OutOfRangePercent: Story = {
  name: "Out of Range (clamp demo)",
  args: {
    monthLabel: "1월",
    registeredCount: 24,
    graphPercent: 140,
    graphLabel: "24/24",
  },
  render: (args) => <CardGraph01 {...args} />,
};

export const LongMonthLabel: Story = {
  name: "Long Month Label",
  args: {
    monthLabel: "2026년 1월",
    registeredCount: 124,
    graphPercent: 42,
    graphLabel: "52/124",
  },
  render: (args) => <CardGraph01 {...args} />,
};

export const WithoutActionHandler: Story = {
  name: "Without onActionClick",
  args: {
    monthLabel: "1월",
    registeredCount: 24,
    graphPercent: 70,
    graphLabel: "16/24",
    onActionClick: undefined,
  },
  render: (args) => <CardGraph01 {...args} />,
};
