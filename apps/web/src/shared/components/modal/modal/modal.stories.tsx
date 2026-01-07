import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { lightTheme } from "@/shared/styles/theme.css";
import { Button } from "@/shared/components/button/button/button";
import { Modal } from "./modal";

const meta: Meta<typeof Modal> = {
  title: "Shared/Modal/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Delta Modal 컴포넌트입니다.",
          "`title / description / cancelLabel / confirmLabel / size(md로 고정)`를 지원합니다.",
          "ESC 키 또는 오버레이 클릭으로 닫을 수 있습니다.",
          "Vanilla Extract를 사용하여 스타일링되었습니다.",
          "",
          "### Props",
          "- `isOpen: boolean` (필수)",
          "- `onClose: () => void` (필수)",
          "- `title: string` (필수)",
          "- `description?: string`",
          "- `cancelLabel?: string` (기본값: '취소')",
          "- `confirmLabel?: string` (기본값: '확인')",
          "- `onCancel?: () => void`",
          "- `onConfirm?: () => void`",
          '- `size?: "md"` (고정)',
        ].join("\n"),
      },
    },
  },
  args: {
    isOpen: true,
    title: "모달 제목",
    description: "모달 설명",
    cancelLabel: "취소",
    confirmLabel: "확인",
    size: "md",
  },
  argTypes: {
    isOpen: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
    cancelLabel: { control: "text" },
    confirmLabel: { control: "text" },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    onClose: { action: "closed" },
    onCancel: { action: "cancelled" },
    onConfirm: { action: "confirmed" },
  },
  decorators: [
    (Story) => (
      <div className={lightTheme} style={{ width: "100%", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const DefaultModalComponent = () => {
      const [isOpen, setIsOpen] = useState(args.isOpen ?? true);
      return (
        <>
          <Button
            label="모달 열기"
            onClick={() => setIsOpen(true)}
            style={{ margin: "2.4rem" }}
          />
          <Modal
            {...args}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </>
      );
    };
    return <DefaultModalComponent />;
  },
};

export const LogoutModal: Story = {
  render: () => {
    const LogoutModalComponent = () => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <>
          <div style={{ padding: "2.4rem" }}>
            <Button label="모달 열기" onClick={() => setIsOpen(true)} />
          </div>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="로그아웃"
            description="정말 로그아웃할까요?"
            cancelLabel="취소"
            confirmLabel="로그아웃"
          />
        </>
      );
    };
    return <LogoutModalComponent />;
  },
};

export const WithoutDescription: Story = {
  render: () => {
    const WithoutDescriptionComponent = () => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <>
          <div style={{ padding: "2.4rem" }}>
            <Button label="모달 열기" onClick={() => setIsOpen(true)} />
          </div>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="알림"
            cancelLabel="닫기"
            confirmLabel="확인"
          />
        </>
      );
    };
    return <WithoutDescriptionComponent />;
  },
};
