import type { Meta, StoryObj } from "@storybook/react";
import FabButton from "@/shared/components/button/fab-button/fab-button";

const meta = {
  title: "Shared/Button/FabButton",
  component: FabButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
원형 Floating Action Button(FAB) 컴포넌트입니다.

- 배경색: \`vars.color.main[500]\`
- 아이콘 색상: \`vars.color.grayscale[0]\` (currentColor)
- 그림자: \`vars.shadow.e400\`
- 아이콘은 상위에서 \`icon="name"\` 형태로 주입합니다.
- \`iconSize\` 기본값은 **2.4rem** 입니다.

예)
\`\`\`tsx
<FabButton icon="file" label="추가" onClick={() => {}} />
\`\`\`
        `.trim(),
      },
    },
  },
  argTypes: {
    icon: {
      control: "text",
      description: 'Icon 컴포넌트의 name (예: "plus")',
    },
    iconSize: {
      control: { type: "number", min: 1.2, max: 4, step: 0.1 },
      description: "아이콘 크기 (rem 단위 숫자)",
    },
    label: {
      control: "text",
      description: "aria-label 용도 (접근성)",
    },
    onClick: { action: "clicked" },
  },
  args: {
    icon: "file",
    iconSize: 2.4,
    label: "추가",
  },
} satisfies Meta<typeof FabButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const CustomIconSize: Story = {
  args: {
    iconSize: 3.2,
    label: "커스텀 아이콘 사이즈",
  },
};

export const InContainer: Story = {
  args: {
    label: "우측 하단 FAB",
  },
  render: (args) => (
    <div
      style={{
        width: 360,
        height: 640,
        position: "relative",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: 16 }}>화면 영역 예시</div>

      <div style={{ position: "absolute", right: 16, bottom: 16 }}>
        <FabButton {...args} />
      </div>
    </div>
  ),
};
