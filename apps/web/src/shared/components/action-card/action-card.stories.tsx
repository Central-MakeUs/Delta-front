import type { Meta, StoryObj } from "@storybook/react";
import { ActionCard } from "@/shared/components/action-card/action-card";

const meta = {
  title: "shared/ActionCard",
  component: ActionCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "아이콘(원형 배경) + 타이틀로 구성된 액션 카드 컴포넌트입니다. `title`, `iconName`을 상위에서 주입받습니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "33.5rem", padding: "2.4rem" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "사진 촬영",
    iconName: "graphic-camera",
    circleSizeRem: 6.4,
    iconSize: 3.2,
    disabled: false,
    type: "button",
  },
} satisfies Meta<typeof ActionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  args: {
    title: "앨범에서 선택",
    iconName: "graphic-gallery",
  },
};

export const Camera: Story = {
  args: {
    title: "사진 촬영",
    iconName: "graphic-camera",
  },
};
