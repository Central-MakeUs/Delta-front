import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { lightTheme } from "@/shared/styles/theme.css";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Delta Checkbox 컴포넌트입니다.",
          "`checked / disabled`를 지원합니다.",
          "체크 아이콘은 SVG Sprite 기반 `Icon` 컴포넌트를 사용합니다.",
          "",
          "### Props",
          "- `label?: string`",
          "- `checked?: boolean`",
          "- `disabled?: boolean`",
          "- `onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void`",
          "- 나머지 input 기본 props 지원",
        ].join("\n"),
      },
    },
  },
  args: {
    label: "체크박스",
    checked: false,
    disabled: false,
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    onChange: { action: "changed" },
  },
  decorators: [
    (Story) => (
      <div className={lightTheme} style={{ padding: "2.4rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  render: (args) => {
    const PlaygroundComponent = () => {
      const [checked, setChecked] = useState(args.checked ?? false);
      return (
        <Checkbox
          {...args}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      );
    };
    return <PlaygroundComponent />;
  },
};

/** 기본 상태 */
export const Default: Story = {
  render: () => {
    const DefaultComponent = () => {
      const [checked, setChecked] = useState(false);
      return (
        <div
          className={lightTheme}
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <Checkbox
            label="체크되지 않음"
            checked={checked}
            // iconColor="red"
            onChange={(e) => setChecked(e.target.checked)}
          />
          <Checkbox
            label="체크됨"
            checked={!checked}
            // iconColor="blue"
            onChange={(e) => setChecked(!e.target.checked)}
          />
        </div>
      );
    };
    return <DefaultComponent />;
  },
};

/** Disabled 상태 */
export const Disabled: Story = {
  render: () => {
    return (
      <div
        className={lightTheme}
        style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
      >
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Checked" checked disabled />
      </div>
    );
  },
};

/** Label 없이 사용 */
export const WithoutLabel: Story = {
  render: () => {
    const WithoutLabelComponent = () => {
      const [checked, setChecked] = useState(false);
      return (
        <div
          className={lightTheme}
          style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}
        >
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            aria-label="라벨 없는 체크박스"
          />
        </div>
      );
    };
    return <WithoutLabelComponent />;
  },
};
