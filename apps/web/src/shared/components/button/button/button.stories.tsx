import type { Meta, StoryObj } from "@storybook/react";
import { lightTheme } from "@/shared/styles/theme.css";
import { Button } from "@/shared/components/button/button/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Delta Button 컴포넌트입니다.",
          "`size / tone / fullWidth`를 지원합니다.",
          "아이콘은 SVG Sprite 기반 `Icon`을 내부에서 렌더링하며, 외부에서는 `icon`, `iconSize`로 제어합니다.",
          "",
          "### Props",
          "- `label: string` (필수)",
          '- `size?: "32" | "40" | "48" | "60"`',
          '- `tone?: "surface" | "default" | "dark" | "kakao"`',
          "- `fullWidth?: boolean`",
          "- `icon?: string` (예: `check`, `plus`)",
          "- `iconSize?: number` (rem 단위, 예: `1.6`)",
          "- 나머지 버튼 기본 props(`onClick`, `disabled` 등) 지원",
        ].join("\n"),
      },
    },
  },
  args: {
    label: "Button",
    size: "48",
    tone: "surface",
    fullWidth: false,
    disabled: false,
    icon: undefined,
    iconSize: 1.8,
  },
  argTypes: {
    size: { control: "radio", options: ["32", "40", "48", "60"] },
    tone: {
      control: "radio",
      options: ["surface", "default", "dark", "kakao"],
    },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },

    icon: {
      control: "text",
      description: "아이콘 이름 (예: check, plus, star, kakao)",
    },
    iconSize: {
      control: { type: "number", min: 1.2, max: 3.2, step: 0.1 },
      description: "아이콘 크기 (rem 단위 숫자, 예: 1.6)",
    },

    onClick: { action: "clicked" },
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
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const FiveCases: Story = {
  render: () => (
    <div
      className={lightTheme}
      style={{ display: "grid", gap: "1.2rem", width: "36rem" }}
    >
      {/* 32 / surface */}
      <Button label="Text" size="32" tone="surface" />

      {/* 40 / surface + icon */}
      <Button label="Text" size="40" tone="surface" icon="star" />

      {/* 48 / default + icon */}
      <Button label="Text" size="48" tone="default" icon="kakao" />

      {/* 60 / dark */}
      <Button label="Text" size="60" tone="dark" />

      {/* kakao login (fullWidth) */}
      <Button
        label="Kakao로 시작하기"
        size="48"
        tone="kakao"
        icon="kakao"
        fullWidth
      />
    </div>
  ),
};

/** 사이즈별 */
export const Sizes: Story = {
  render: () => (
    <div
      className={lightTheme}
      style={{ display: "grid", gap: "1.2rem", width: "36rem" }}
    >
      <Button
        label="Size 32"
        size="32"
        tone="surface"
        icon="star"
        iconSize={1.6}
      />
      <Button label="Size 40" size="40" tone="surface" icon="star" />
      <Button label="Size 48" size="48" tone="surface" icon="star" />
      <Button
        label="Size 60"
        size="60"
        tone="surface"
        icon="star"
        iconSize={2.0}
      />
    </div>
  ),
};

/** 톤별 */
export const Tones: Story = {
  render: () => (
    <div
      className={lightTheme}
      style={{ display: "grid", gap: "1.2rem", width: "36rem" }}
    >
      <Button label="surface" tone="surface" icon="star" fullWidth />
      <Button label="default" tone="default" icon="star" fullWidth />
      <Button label="dark" tone="dark" icon="star" fullWidth />
      <Button label="kakao" tone="kakao" icon="kakao" fullWidth />
    </div>
  ),
};

/** 아이콘 크기 예시 */
export const IconSizes: Story = {
  render: () => (
    <div
      className={lightTheme}
      style={{ display: "grid", gap: "1.2rem", width: "36rem" }}
    >
      <Button label="iconSize 1.4" icon="star" iconSize={1.4} fullWidth />
      <Button label="iconSize 1.8" icon="star" iconSize={1.8} fullWidth />
      <Button label="iconSize 2.4" icon="star" iconSize={2.4} fullWidth />
    </div>
  ),
};
