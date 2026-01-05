import type { Meta, StoryObj } from "@storybook/react";
import { NumberButton } from "./number-button";

const meta = {
  title: "Components/NumberButton",
  component: NumberButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
객관식 정답 선택 UI(\`NumberChoice\`)에서 사용되는 **번호 버튼** 컴포넌트입니다.

- 단일 버튼 단위로만 책임을 가지며, 선택 상태(\`selected\`)에 따라 스타일이 변경됩니다.
- 실제 "몇 개를 보여줄지 / 어떤 값이 선택됐는지" 같은 정책은 상위(예: \`NumberChoice\`)에서 제어하는 것을 권장합니다.
- 클릭 시 \`onSelect(value)\`를 호출합니다.
- NumberChoice에서 map으로 렌더하는 방식입니다.


        `.trim(),
      },
    },
  },
  argTypes: {
    value: {
      description: "번호 값 (기본 label은 `${value}번`으로 생성됩니다.)",
      control: { type: "number" },
    },
    selected: {
      description: "선택 상태 (true면 active 스타일)",
      control: { type: "boolean" },
    },
    disabled: {
      description: "비활성화",
      control: { type: "boolean" },
    },
    label: {
      description: "표시 텍스트를 커스텀하고 싶을 때 사용 (기본: `${value}번`)",
      control: { type: "text" },
    },
    className: {
      description: "외부에서 확장할 className",
      control: { type: "text" },
    },
    onSelect: {
      description: "클릭 시 호출되는 콜백",
      action: "select",
      table: { type: { summary: "(value: number) => void" } },
    },
    ariaLabel: {
      description: "버튼 aria-label (기본: label 또는 `${value}번`)",
      control: { type: "text" },
    },
  },
  args: {
    value: 1,
    selected: false,
    disabled: false,
  },
} satisfies Meta<typeof NumberButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default",
};

export const Selected: Story = {
  name: "Selected",
  args: {
    selected: true,
  },
};

export const Disabled: Story = {
  name: "Disabled",
  args: {
    disabled: true,
  },
};

export const CustomLabel: Story = {
  name: "Custom label",
  args: {
    label: "1번(보기)",
  },
};
