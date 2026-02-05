import type { Meta, StoryObj } from "@storybook/react";
import { TabButton } from "@/shared/components/button/tab-button/tab-button";

const meta = {
  title: "Shared/Button/TabButton",
  component: TabButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "TabBar 컴포넌트에서 사용하는 전용 탭 버튼 컴포넌트입니다.",
          "",
          "- 상태: `active / inactive`",
          "- 공통 베이스: radius 12px, body3, py 0.8rem / px 1.2rem",
          "- active: bg main-500 + text grayscale-0 + semibold",
          "- inactive: bg transparent + text grayscale-700 + medium",
          "",
          "보통은 단독으로 사용하기보다 `TabBar`가 상위에서 상태를 관리하며 함께 사용됩니다.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    isActive: {
      control: "boolean",
      description: "탭 활성화 여부 (true면 active 스타일 적용)",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    children: {
      control: "text",
      description: "탭 라벨",
    },
  },
  args: {
    children: "Text",
    isActive: false,
    disabled: false,
  },
} satisfies Meta<typeof TabButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  name: "Active",
  args: {
    isActive: true,
    children: "Text",
  },
};

export const Inactive: Story = {
  name: "Inactive",
  args: {
    isActive: false,
    children: "Text",
  },
};

export const Disabled: Story = {
  name: "Disabled",
  args: {
    disabled: true,
    isActive: false,
    children: "Text",
  },
};

export const ActiveDisabled: Story = {
  name: "Active Disabled",
  args: {
    disabled: true,
    isActive: true,
    children: "Text",
  },
};
