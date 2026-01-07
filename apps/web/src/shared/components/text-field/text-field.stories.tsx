import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { lightTheme } from "@/shared/styles/theme.css";
import { TextField } from "./text-field";

const meta: Meta<typeof TextField> = {
  title: "Shared/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Delta TextField 컴포넌트입니다.",
          "`placeholder / disabled / fullWidth`를 지원합니다.",
          "Vanilla Extract를 사용하여 스타일링되었습니다.",
          "",
          "### Props",
          "- `placeholder?: string`",
          "- `disabled?: boolean`",
          "- `fullWidth?: boolean`",
          "- `value?: string`",
          "- `onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void`",
          "- 나머지 input 기본 props 지원",
        ].join("\n"),
      },
    },
  },
  args: {
    placeholder: "입력하세요",
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    value: { control: "text" },
    onChange: { action: "changed" },
  },
  decorators: [
    (Story) => (
      <div className={lightTheme} style={{ padding: "2.4rem", width: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextField>;

/** 기본 상태 */
export const Default: Story = {
  render: () => {
    const DefaultComponent = () => {
      const [value, setValue] = useState("");
      return (
        <div>
          <TextField
            placeholder="이름을 입력하세요"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <TextField placeholder="이메일을 입력하세요" />
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
        style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
      >
        <TextField placeholder="Disabled 상태" disabled />
        <TextField placeholder="Disabled 상태 (값 있음)" value="입력된 값" disabled />
      </div>
    );
  },
};

/** FullWidth */
export const FullWidth: Story = {
  render: () => {
    const FullWidthComponent = () => {
      const [value, setValue] = useState("");
      return (
        <div>
          <TextField
            placeholder="전체 너비 사용"
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      );
    };
    return <FullWidthComponent />;
  },
};

