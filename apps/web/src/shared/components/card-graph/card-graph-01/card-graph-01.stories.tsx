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

상태 분기:
- \`registeredCount === 0\`이면
  - 버튼 문구: “새로운 문제 등록하기”
  - BarGraph 라벨: “아직 등록한 문제가 없어요!”
  - 클릭 핸들러: \`onEmptyActionClick\` 우선, 없으면 \`onActionClick\` 사용
- \`solvedCount === 0\`이면(등록 여부와 무관)
  - BarGraph 최소 채움 표시 + tip(화살표) 숨김
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
      table: { type: { summary: "string" } },
    },
    registeredCount: {
      control: { type: "number", min: 0 },
      description:
        "등록한 문제 수. `등록한 문제 | N개`로 표시되며, 0이면 Empty 상태 문구/버튼으로 전환됩니다.",
      table: { type: { summary: "number" } },
    },
    solvedCount: {
      control: { type: "number", min: 0 },
      description:
        "완료한 문제 수. 0이면(등록 여부와 무관) BarGraph tip(화살표)이 숨겨지고 최소 채움이 표시됩니다.",
      table: { type: { summary: "number" } },
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
      description:
        "BarGraph01에 표시되는 라벨(예: `16/24`). 단, registeredCount가 0이면 '아직 등록한 문제가 없어요!'로 대체됩니다.",
      table: { type: { summary: "string" } },
    },
    onActionClick: {
      action: "action-click",
      description:
        "기본 액션 버튼 클릭 시 호출되는 핸들러입니다(기본: “남은 문제 오답하기”). Empty 상태에서도 onEmptyActionClick이 없으면 fallback으로 사용됩니다.",
      table: { type: { summary: "() => void" } },
    },
    onEmptyActionClick: {
      action: "empty-action-click",
      description:
        "등록한 문제가 0개일 때(“새로운 문제 등록하기”) 버튼 클릭 시 호출되는 핸들러입니다.",
      table: { type: { summary: "() => void" } },
    },
    className: {
      control: false,
      description:
        "외부에서 레이아웃 조정이 필요할 때만 사용하세요(기본 스타일은 vanilla-extract로 관리).",
      table: { type: { summary: "string" } },
    },
    ariaLabel: {
      control: "text",
      description: "section의 aria-label. 접근성/테스트 식별용으로 사용합니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "card graph 01" },
      },
    },
    replayKey: {
      control: false,
      description:
        "BarGraph 애니메이션 리플레이 기준 키. 기본은 pathname을 사용합니다.",
      table: { type: { summary: "string | number" } },
    },
  },
} satisfies Meta<typeof CardGraph01>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    monthLabel: "1월",
    registeredCount: 24,
    solvedCount: 16,
    graphPercent: 67,
    graphLabel: "16/24",
    ariaLabel: "card graph 01",
  },
  render: (args) => <CardGraph01 {...args} />,
};

export const EmptyRegistered: Story = {
  name: "Empty / registered 0",
  args: {
    monthLabel: "1월",
    registeredCount: 0,
    solvedCount: 0,
    graphPercent: 0,
    graphLabel: "0/0",
  },
  render: (args) => <CardGraph01 {...args} />,
};

export const RegisteredButSolvedZero: Story = {
  name: "Registered > 0 / solved 0 (min fill, no tip)",
  args: {
    monthLabel: "1월",
    registeredCount: 10,
    solvedCount: 0,
    graphPercent: 0,
    graphLabel: "0/10",
  },
  render: (args) => <CardGraph01 {...args} />,
};

export const TenThree: Story = {
  name: "Registered 10 / solved 3",
  args: {
    monthLabel: "1월",
    registeredCount: 10,
    solvedCount: 3,
    graphPercent: 30,
    graphLabel: "3/10",
  },
  render: (args) => <CardGraph01 {...args} />,
};

export const OutOfRangePercent: Story = {
  name: "Out of Range (clamp demo)",
  args: {
    monthLabel: "1월",
    registeredCount: 24,
    solvedCount: 24,
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
    solvedCount: 52,
    graphPercent: 42,
    graphLabel: "52/124",
  },
  render: (args) => <CardGraph01 {...args} />,
};

export const WithoutActionHandlers: Story = {
  name: "Without Action Handlers",
  args: {
    monthLabel: "1월",
    registeredCount: 24,
    solvedCount: 16,
    graphPercent: 67,
    graphLabel: "16/24",
    onActionClick: undefined,
    onEmptyActionClick: undefined,
  },
  render: (args) => <CardGraph01 {...args} />,
};
