import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentType } from "react";

import AppBar from "@/shared/components/app-bar/app-bar";
import type { AppBarProps } from "@/shared/components/app-bar/types/app-bar";

const meta: Meta<AppBarProps> = {
  title: "Shared/app-bar",
  component: AppBar as ComponentType<AppBarProps>,
  tags: ["autodocs"],
  parameters: {
    nextjs: { appDirectory: true },
    docs: {
      description: {
        component: [
          "AppBar는 페이지 상단 헤더 UI를 제공하는 컴포넌트입니다.",
          "variant에 따라 기본/액션/로고/진행도/타이틀 형태로 렌더링됩니다.",
          "기본 동작(back)은 onBack 미지정 시 router.back()으로 폴백됩니다.",
        ].join("\n"),
      },
    },
  },
  decorators: [
    (Story, ctx) => {
      const isDocs = ctx.viewMode === "docs";

      return (
        <div
          style={{
            minHeight: isDocs ? undefined : "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: isDocs ? undefined : "center",
            padding: "2.4rem",
            backgroundColor: isDocs ? "#f6f7f9" : undefined,
          }}
        >
          <div style={{ width: "100%", maxWidth: "43rem", margin: "0 auto" }}>
            <Story />
          </div>
        </div>
      );
    },
  ],

  args: { className: "" },
};

export default meta;

type Story = StoryObj<AppBarProps>;

export const Default: Story = {
  args: {
    variant: "default",
    onLogoClick: () => undefined,
    onUserClick: () => undefined,
  },
};

export const Basic: Story = {
  args: {
    variant: "basic",
    title: "Title",
    onBack: () => undefined,
  },
};

export const BasicAction: Story = {
  args: {
    variant: "basicAction",
    title: "오답 상세 보기",
    actionLabel: "수정하기",
    onBack: () => undefined,
    onActionClick: () => undefined,
  },
};

export const Progress: Story = {
  args: {
    variant: "progress",
    total: 5,
    currentStep: 2,
    onBack: () => undefined,
    onSkip: () => undefined,
    onStepChange: () => undefined,
    showSkip: true,
    skipLabel: "건너뛰기",
  },
};

export const Title: Story = {
  args: {
    variant: "title",
    title: "타이틀",
  },
};
