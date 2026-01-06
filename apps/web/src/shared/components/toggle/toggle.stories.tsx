import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "@/shared/components/toggle/toggle";

type ToggleValue = "objective" | "subjective";

const OPTIONS = [
  { value: "objective", label: "객관식" },
  { value: "subjective", label: "주관식" },
] as const;

const meta = {
  title: "Shared/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
2-way Toggle 컴포넌트입니다. 상위에서 상태(\`useState\`)로 선택 값을 들고 있다가
\`value\` / \`onValueChange\`로 내려주면 됩니다.

\`\`\`tsx

type ToggleValue = "objective" | "subjective";
const OPTIONS = [
  { value: "objective", label: "객관식" },
  { value: "subjective", label: "주관식" },
] as const;
const [type, setType] = useState<ToggleValue>("objective");

<Toggle<ToggleValue>
  value={type}
  onValueChange={setType}
  options={OPTIONS}
/>


\`\`\`
      `.trim(),
      },
    },
  },

  args: {
    ariaLabel: "question-type-toggle",
    options: OPTIONS,
    defaultValue: "objective" as ToggleValue,
  },
  argTypes: {
    options: { control: false },
    value: { control: false },
    onValueChange: { action: "valueChanged" },
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  name: "Uncontrolled (defaultValue)",
  args: {
    defaultValue: "objective",
  },
};

const ControlledExample = (args: React.ComponentProps<typeof Toggle>) => {
  const [value, setValue] = useState<ToggleValue>("objective");

  return (
    <Toggle<ToggleValue>
      {...args}
      options={OPTIONS}
      value={value}
      defaultValue={undefined}
      onValueChange={(next) => {
        setValue(next);
        args.onValueChange?.(next);
      }}
    />
  );
};

export const Controlled: Story = {
  name: "Controlled",
  render: (args) => <ControlledExample {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "objective",
  },
};

export const OptionDisabled: Story = {
  name: "Option Disabled",
  args: {
    defaultValue: "objective",
    options: [
      { value: "objective", label: "객관식" },
      { value: "subjective", label: "주관식", disabled: true },
    ] as const,
  },
};
