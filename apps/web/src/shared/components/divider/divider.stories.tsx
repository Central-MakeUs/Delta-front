import type { Meta, StoryObj } from "@storybook/react";

import Divider from "@/shared/components/divider/divider";
import * as story from "@/shared/components/divider/divider.css";

const meta = {
  title: "Shared/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Divider는 구분선 컴포넌트입니다.",
          "",
          "- 인라인 스타일 없이 동작합니다.",
          "- props는 프리셋(full/hug, base/hairline, bgColor 토큰 tone)만 지원합니다.",
          "- 임의 width/height/색상은 사용처에서 `className`으로 확장합니다.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    width: { control: "radio", options: ["full", "hug"] },
    height: { control: "radio", options: ["base", "hairline"] },
    tone: { control: "text" },
    className: { control: false },
    ariaHidden: { control: "boolean" },
  },
  args: {
    width: "full",
    height: "base",
    tone: "grayscale-50",
    ariaHidden: true,
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  name: "Playground",
  render: (args) => (
    <div className={story.stack}>
      <div className={story.label}>기본</div>
      <Divider {...args} />
    </div>
  ),
};

export const Presets: Story = {
  name: "Presets",
  render: () => (
    <div className={story.stack}>
      <div className={story.label}>Default (full / base / grayscale-50)</div>
      <Divider />

      <div className={story.label}>Hairline</div>
      <Divider height="hairline" />

      <div className={story.label}>Tone: grayscale-100</div>
      <Divider tone="grayscale-100" />

      <div className={story.label}>Tone: grayscale-200</div>
      <Divider tone="grayscale-200" />
    </div>
  ),
};
