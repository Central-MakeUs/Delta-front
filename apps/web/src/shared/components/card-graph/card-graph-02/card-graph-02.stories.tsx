import type { Meta, StoryObj } from "@storybook/react";
import CardGraph02, {
  type CardGraph02Item,
} from "@/shared/components/card-graph/card-graph-02/card-graph-02";

const meta = {
  title: "Shared/CardGraph/CardGraph02",
  component: CardGraph02,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Top 4 오답 데이터를 막대 그래프 + 랭킹 리스트 형태로 보여주는 카드 컴포넌트입니다.

- 입력된 \`items\`에서 **상위 4개만 사용**합니다.
- \`items\`가 4개 미만이면 **빈 데이터(value=0, title="", valueLabel="0개")로 패딩**합니다.
- 막대 그래프의 \`maxValue\`는 **1등(첫 번째 항목)의 value**를 기준으로 사용합니다.
  - 1등 value가 0 이하인 경우, 0으로 나누는 문제를 피하기 위해 **maxValue=1**로 fallback 됩니다.
- \`tone\`이 지정되지 않으면 **1등은 active, 나머지는 inactive**로 자동 적용됩니다.
- 1등(첫 번째 막대)에는 \`showTarget\`이 활성화됩니다(BarGraph02에 전달).
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
    items: {
      control: "object",
      description: `
그래프에 표시할 데이터 배열입니다.

- **상위 4개만 사용**됩니다.
- 부족한 개수는 빈 데이터로 자동 패딩됩니다.
- 각 item:
  - \`value\`: 막대 값
  - \`title\`: 아래 리스트의 단원명(말줄임 처리)
  - \`valueLabel\`(optional): 표시 텍스트(미지정 시 \`\${value}개\`)
  - \`tone\`(optional): "active" | "inactive"(미지정 시 1등 active, 나머지 inactive)
      `.trim(),
      table: {
        type: { summary: "readonly CardGraph02Item[]" },
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
        defaultValue: { summary: "card graph 02" },
      },
    },
  },
} satisfies Meta<typeof CardGraph02>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseItems: readonly CardGraph02Item[] = [
  { value: 10, title: "집합과 명제", valueLabel: "10개" },
  { value: 8, title: "함수의 극한", valueLabel: "8개" },
  { value: 7, title: "미분법", valueLabel: "7개" },
  { value: 5, title: "적분법", valueLabel: "5개" },
];

export const Default: Story = {
  args: {
    items: baseItems,
    ariaLabel: "card graph 02",
  },
  render: (args) => <CardGraph02 {...args} />,
};

export const LessThan4Items: Story = {
  name: "Items < 4 (padding)",
  args: {
    items: [
      { value: 10, title: "집합과 명제", valueLabel: "10개" },
      { value: 8, title: "함수의 극한", valueLabel: "8개" },
    ],
  },
  render: (args) => <CardGraph02 {...args} />,
};

export const MoreThan4Items: Story = {
  name: "Items > 4 (top4 only)",
  args: {
    items: [
      ...baseItems,
      { value: 4, title: "수열", valueLabel: "4개" },
      { value: 3, title: "확률과 통계", valueLabel: "3개" },
    ],
  },
  render: (args) => <CardGraph02 {...args} />,
};

export const CustomTone: Story = {
  name: "Custom Tone Override",
  args: {
    items: [
      { value: 10, title: "집합과 명제", tone: "inactive" },
      { value: 8, title: "함수의 극한", tone: "active" },
      { value: 7, title: "미분법" },
      { value: 5, title: "적분법" },
    ],
  },
  render: (args) => <CardGraph02 {...args} />,
};

export const ZeroMaxFallback: Story = {
  name: "MaxValue Fallback (first value = 0)",
  args: {
    items: [
      { value: 0, title: "집합과 명제" },
      { value: 0, title: "함수의 극한" },
      { value: 0, title: "미분법" },
      { value: 0, title: "적분법" },
    ],
  },
  render: (args) => <CardGraph02 {...args} />,
};

export const LongTitleEllipsis: Story = {
  name: "Long Title (ellipsis)",
  args: {
    items: [
      {
        value: 10,
        title: "아주아주아주아주 긴 단원명이라서 말줄임이 필요한 케이스",
        valueLabel: "10개",
      },
      { value: 8, title: "함수의 극한", valueLabel: "8개" },
      { value: 7, title: "미분법", valueLabel: "7개" },
      { value: 5, title: "적분법", valueLabel: "5개" },
    ],
  },
  render: (args) => <CardGraph02 {...args} />,
};
