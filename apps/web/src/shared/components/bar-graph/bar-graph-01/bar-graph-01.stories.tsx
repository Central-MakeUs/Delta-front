import type { Meta, StoryObj } from "@storybook/react";
import BarGraph01 from "@/shared/components/bar-graph/bar-graph-01/bar-graph-01";

const meta = {
  title: "Shared/BarGraph/BarGraph01",
  component: BarGraph01,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
가로형 진행률(Progress) 바 그래프 컴포넌트입니다.

### 동작 규칙
- \`percent\`는 **0~100으로 clamp**되어 \`aria-valuenow\`에 반영됩니다.
- 실제 채움 비율(시각적 표현)은 \`minPercent~maxPercent\` 범위로 **리매핑(visualPercent)** 됩니다.

\`visualPercent = lo + (rawPercent / 100) * (hi - lo)\`
(\`lo=min(minPercent,maxPercent)\`, \`hi=max(minPercent,maxPercent)\`)

- \`fill\`은 \`visualPercent > 0\`일 때만 렌더됩니다.
- \`tip\`은 \`visualPercent > 0\`일 때만 렌더됩니다.
- \`label\`은 값이 있을 때만 우측에 표시됩니다.
- \`tipOverlapRem\`은 tip이 fill과 겹치는 정도를 rem 단위로 조절합니다(클수록 tip이 왼쪽으로 더 겹칩니다).

### 접근성
- \`role="progressbar"\` + \`aria-valuemin/max/now\`를 제공합니다.
        `.trim(),
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "32rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    percent: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description:
        "실제 퍼센트 값(0~100). 내부에서 clamp 후 aria-valuenow로 사용되며 visualPercent로 리매핑됩니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0~100" },
      },
    },
    label: {
      control: "text",
      description:
        "우측에 표시되는 라벨 텍스트(예: `16/24`). 값이 없으면 렌더되지 않습니다.",
      table: {
        type: { summary: "string" },
      },
    },
    minPercent: {
      control: { type: "number", min: 0, max: 100, step: 1 },
      description:
        "시각적 표현 최소치. percent=0일 때 visualPercent가 이 값에 가까워지도록 리매핑합니다(0~100 clamp).",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "10" },
      },
    },
    maxPercent: {
      control: { type: "number", min: 0, max: 100, step: 1 },
      description:
        "시각적 표현 최대치. percent=100일 때 visualPercent가 이 값에 가까워지도록 리매핑합니다(0~100 clamp).",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "90" },
      },
    },
    tipOverlapRem: {
      control: { type: "number", min: 0, max: 3, step: 0.1 },
      description:
        "tip이 fill과 겹치는 정도(rem). 클수록 tip이 왼쪽으로 더 들어가며, clamp 계산에 반영됩니다.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1.2" },
      },
    },
    ariaLabel: {
      control: "text",
      description:
        "progressbar의 aria-label. 접근성/테스트 식별용으로 사용합니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "progress" },
      },
    },
    className: {
      control: false,
      description:
        "외부 레이아웃 조정이 필요할 때만 사용하세요(기본 스타일은 vanilla-extract로 관리).",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof BarGraph01>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    percent: 70,
    label: "16/24",
  },
  render: (args) => <BarGraph01 {...args} />,
};

export const Zero: Story = {
  name: "0% (no fill/tip)",
  args: {
    percent: 0,
    label: "0/24",
  },
  render: (args) => <BarGraph01 {...args} />,
};

export const Full: Story = {
  name: "100%",
  args: {
    percent: 100,
    label: "24/24",
  },
  render: (args) => <BarGraph01 {...args} />,
};

export const CustomVisualRange: Story = {
  name: "Custom Visual Range (min/max)",
  args: {
    percent: 70,
    label: "16/24",
    minPercent: 0,
    maxPercent: 100,
  },
  render: (args) => <BarGraph01 {...args} />,
};

export const SwappedMinMax: Story = {
  name: "Swapped min/max (auto normalize)",
  args: {
    percent: 70,
    label: "16/24",
    minPercent: 90,
    maxPercent: 10,
  },
  render: (args) => <BarGraph01 {...args} />,
};

export const TipOverlapVariants: Story = {
  name: "Tip Overlap Variants",
  args: {
    percent: 70,
    label: "16/24",
    tipOverlapRem: 2.0,
  },
  render: (args) => <BarGraph01 {...args} />,
};

export const WithoutLabel: Story = {
  name: "No label",
  args: {
    percent: 70,
    label: undefined,
  },
  render: (args) => <BarGraph01 {...args} />,
};

export const OutOfRangePercent: Story = {
  name: "Out of Range (clamp demo)",
  args: {
    percent: 140,
    label: "24/24",
  },
  render: (args) => <BarGraph01 {...args} />,
};
