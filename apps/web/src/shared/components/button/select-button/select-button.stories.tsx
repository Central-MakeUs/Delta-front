import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SelectButton } from "@/shared/components/button/select-button/select-button";

const meta = {
  title: "Components/SelectButton",
  component: SelectButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
옵션 선택(토글)용 버튼 컴포넌트입니다.

- \`active\`: 선택 상태 (true면 강조 스타일)
- \`fullWidth\`: 부모 너비 100%로 확장
- 기본 \`type\`은 "button" 입니다.

예)
\`\`\`tsx
<SelectButton label="버튼A" active />
<SelectButton label="버튼B" />
\`\`\`
    `.trim(),
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    active: { control: "boolean" },
    fullWidth: { control: "boolean" },
    onClick: { action: "clicked" },
  },
  args: {
    label: "Text",
    active: false,
    fullWidth: false,
  },
} satisfies Meta<typeof SelectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

function PairExample() {
  const [selected, setSelected] = useState<"default" | "active">("default");

  return (
    <div style={{ display: "flex", gap: 12, width: 410 }}>
      <SelectButton
        fullWidth
        label="Default"
        active={selected === "default"}
        onClick={() => setSelected("default")}
      />
      <SelectButton
        fullWidth
        label="Active"
        active={selected === "active"}
        onClick={() => setSelected("active")}
      />
    </div>
  );
}

export const Pair: Story = {
  render: () => <PairExample />,
};
export const Playground: Story = {};

export const Active: Story = {
  args: {
    active: true,
    label: "Active",
  },
};

export const Inactive: Story = {
  args: {
    active: false,
    label: "Inactive",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: "Full Width",
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <SelectButton {...args} />
    </div>
  ),
};
