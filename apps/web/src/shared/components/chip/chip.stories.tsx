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
          "### Props",
          "- label: 표시할 텍스트",
          "- size: xs | md | lg",
          "  - lg: 기본 medium, active일 때 semibold (디자인 반영)",
          "- shape: pill | square",
          "- state: default | active",
          "  - state가 active면 버튼에 aria-pressed=true가 설정됩니다.",
          "- tone: auto | surface | soft | solid | white | white-accent",
          "  - auto(기본): state 기반 컬러 적용(default=surface, active=soft)",
          "  - solid: 메인 컬러로 꽉 찬 스타일(예: '공통수학1')",
          "  - white / white-accent: 흰 배경 칩(예: '10개', '8개')",
          "- fullWidth: true면 width:100%, 기본은 padding 기반의 fit-content",
          "- disabled/onClick/type/ariaLabel 지원",
          "",
          "### Usage guide",
          "- 단원/카테고리 선택: size=md, shape=pill, state=active + tone=solid",
          "- 개수 표시: size=xs, shape=pill, tone=white 또는 white-accent",
          "- 태그(짧은 라벨): size=xs, shape=square, tone=surface",
        ].join("\n"),
      },
    },
  },
  args: {
    label: "Text",
    size: "lg",
    shape: "pill",
    state: "default",
    tone: "auto",
    fullWidth: false,
    disabled: false,
    type: "button",
    ariaLabel: "chip",
  },
  argTypes: {
    label: { control: "text" },
    size: { control: "inline-radio", options: ["xs", "md", "lg"] },
    shape: { control: "inline-radio", options: ["pill", "square"] },
    state: { control: "inline-radio", options: ["default", "active"] },
    tone: {
      control: "select",
      options: ["auto", "surface", "soft", "solid", "white", "white-accent"],
    },
    fullWidth: { control: "boolean" },
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

export const Basic: Story = {
  name: "Basic",
  args: { label: "Text" },
};

export const Pill: Story = {
  name: "Pill",
  args: { shape: "pill" },
};

export const Square: Story = {
  name: "Square",
  args: { shape: "square" },
};

export const Default: Story = {
  name: "State / Default",
  args: { state: "default" },
};

export const Active: Story = {
  name: "State / Active",
  args: { state: "active" },
};

export const Disabled: Story = {
  name: "Disabled",
  args: { disabled: true },
};

export const Sizes: Story = {
  name: "Sizes (xs/md/lg)",
  render: (args) => (
    <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
      <Chip {...args} size="xs" label="xs" />
      <Chip {...args} size="md" label="md" />
      <Chip {...args} size="lg" label="lg" />
      <Chip {...args} size="lg" state="active" label="lg active (semibold)" />
    </div>
  ),
  args: { label: "Text" },
};

export const Tones: Story = {
  name: "Tones",
  render: (args) => (
    <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
      <Chip {...args} tone="auto" label="auto" />
      <Chip {...args} tone="surface" label="surface" />
      <Chip {...args} tone="soft" label="soft" />
      <Chip {...args} tone="solid" state="active" label="solid (active)" />
      <Chip {...args} tone="white" label="white" />
      <Chip {...args} tone="white-accent" label="white-accent" />
    </div>
  ),
  args: { size: "xs", shape: "pill", state: "default" },
};

export const RealExamples: Story = {
  name: "Real examples (Figma cases)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
      {/* 상단: 태그/카운트 */}
      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
        <Chip size="xs" shape="square" tone="surface" label="다항식" />
        <Chip size="xs" shape="pill" tone="white-accent" label="8개" />
        <Chip size="xs" shape="pill" tone="white" label="10개" />
      </div>

      {/* 중단: 단원/칩 */}
      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
        <Chip
          size="md"
          shape="pill"
          state="active"
          tone="solid"
          label="공통수학1"
        />
        <Chip size="md" shape="square" tone="surface" label="다항식" />
        <Chip size="md" shape="pill" tone="surface" label="풀이" />
      </div>

      {/* 하단: 기존 lg들 */}
      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
        <Chip size="lg" shape="pill" state="default" label="Text" />
        <Chip size="lg" shape="pill" state="active" label="Text" />
        <Chip size="lg" shape="square" state="default" label="Text" />
        <Chip size="lg" shape="square" state="active" label="Text" />
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  name: "FullWidth",
  render: (args) => (
    <div
      style={{
        width: "32rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
    >
      <Chip {...args} fullWidth label="fullWidth chip" />
      <Chip {...args} fullWidth shape="square" label="fullWidth square" />
    </div>
  ),
  args: { size: "lg", state: "default", tone: "surface" },
};
