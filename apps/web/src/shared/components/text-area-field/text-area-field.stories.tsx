import type { Meta, StoryObj } from "@storybook/react";
import TextAreaField from "./text-area-field";

const meta = {
  title: "Shared/TextAreaField",
  component: TextAreaField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
> 여러 줄 입력을 위한 TextArea 컴포넌트입니다.

- \`fullWidth\`로 너비를 100%로 확장할 수 있어요.
- \`disabled\` 상태 및 placeholder 지원
- 기본은 \`resize: none\` (디자인 고정형)
        `.trim(),
      },
    },
    layout: "centered",
  },
  argTypes: {
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    rows: { control: "number" },
    value: { control: "text" },
  },
  args: {
    placeholder: "풀이를 입력해주세요.",
    fullWidth: false,
    disabled: false,
    rows: 6,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "36rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextAreaField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "비활성화 상태입니다.",
  },
};

export const WithValue: Story = {
  args: {
    value: "예시 풀이 텍스트입니다.\n줄바꿈도 가능해요.",
  },
};
