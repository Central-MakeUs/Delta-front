import type { Meta, StoryObj } from "@storybook/react";
import Chip from "@/shared/components/chip/chip";

const meta = {
  title: "Shared/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Chip은 텍스트 라벨을 가진 버튼형 UI입니다.",
          "",
          "- shape: pill | square",
          "- state: default | active (active면 aria-pressed=true)",
          "- disabled/onClick/type 지원",
        ].join("\n"),
      },
    },
  },
  args: {
    label: "Text",
    shape: "pill",
    state: "default",
    disabled: false,
    type: "button",
    ariaLabel: "chip",
  },
  argTypes: {
    label: { control: "text" },
    shape: { control: "inline-radio", options: ["pill", "square"] },
    state: { control: "inline-radio", options: ["default", "active"] },
    disabled: { control: "boolean" },
    type: { control: "inline-radio", options: ["button", "submit", "reset"] },
    ariaLabel: { control: "text" },
    onClick: { action: "click" },
    className: { control: false },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: "Playground",
};

export const Default: Story = {
  name: "Default",
};

export const Active: Story = {
  name: "Active",
  args: {
    state: "active",
  },
};

export const SquareDefault: Story = {
  name: "Square / Default",
  args: {
    shape: "square",
    state: "default",
  },
};

export const SquareActive: Story = {
  name: "Square / Active",
  args: {
    shape: "square",
    state: "active",
  },
};

export const Disabled: Story = {
  name: "Disabled",
  args: {
    disabled: true,
  },
};
