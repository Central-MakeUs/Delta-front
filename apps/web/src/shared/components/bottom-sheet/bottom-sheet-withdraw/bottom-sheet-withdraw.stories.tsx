import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { lightTheme } from "@/shared/styles/theme.css";
import { Button } from "@/shared/components/button/button/button";
  import BottomSheetWithdraw from "./bottom-sheet-withdraw";

const meta: Meta<typeof BottomSheetWithdraw> = {
  title: "Shared/BottomSheet/BottomSheetWithdraw",
  component: BottomSheetWithdraw,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Delta BottomSheet 컴포넌트입니다.",
          "화면 하단에서 올라오는 모달 형태의 컴포넌트입니다.",
          "`title / description / confirmLabel / cancelLabel`를 지원합니다.",
          "ESC 키 또는 오버레이 클릭으로 닫을 수 있습니다.",
          "Vanilla Extract를 사용하여 스타일링되었습니다.",
          "",
          "### Props",
          "- `isOpen: boolean` (필수)",
          "- `onClose: () => void` (필수)",
          "- `title: string` (필수)",
          "- `description?: string`",
          "- `confirmLabel?: string` (기본값: '확인')",
          "- `cancelLabel?: string` (기본값: '취소')",
          "- `onConfirm?: () => void`",
          "- `onCancel?: () => void`",
          "- `disabled?: boolean`",
        ].join("\n"),
      },
    },
  },
  args: {
    isOpen: true,
    title: "제목",
    description:
      "내용",
    confirmLabel: "확인",
    cancelLabel: "취소",
    disabled: false,
  },
  argTypes: {
    isOpen: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
    disabled: { control: "boolean" },
    onClose: { action: "closed" },
    onCancel: { action: "cancelled" },
    onConfirm: { action: "confirmed" },
  },
  decorators: [
    (Story) => (
      <div
        className={lightTheme}
        style={{ width: "100%", height: "100vh", position: "relative" }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BottomSheetWithdraw>;

/** 기본 바텀 시트 */
export const Default: Story = {
  render: () => {
    const DefaultComponent = () => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <>
          <div style={{ padding: "2.4rem" }}>
            <Button label="바텀 시트 열기" onClick={() => setIsOpen(true)} />
          </div>
          <BottomSheetWithdraw
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="제목"
            description="내용"
            confirmLabel="확인"
            cancelLabel="취소"
          />
        </>
      );
    };
    return <DefaultComponent />;
  },
};

/** 탈퇴 확인 바텀 시트 */
export const WithdrawMembership: Story = {
  render: () => {
    const WithdrawMembershipComponent = () => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <>
          <div style={{ padding: "2.4rem" }}>
            <Button label="바텀 시트 열기" onClick={() => setIsOpen(true)} />
          </div>
          <BottomSheetWithdraw
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="정말 세모를 탈퇴하실건가요?"
            description="탈퇴 시 계정 및 이용 기록은 모두 삭제되며, 삭제된 데이터는 복구가 불가능해요.<br/> 또한 탈퇴 후 동일 계정의 재가입 시 제한을 받을 수 있어요.<br/><br/> 탈퇴를 진행할까요?"
            confirmLabel="네, 탈퇴할래요"
            cancelLabel="더 써볼래요"
          />
        </>
      );
    };
    return <WithdrawMembershipComponent />;
  },
};

/** Disabled 상태 */
export const Disabled: Story = {
  render: () => {
    const DisabledComponent = () => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <>
          <div style={{ padding: "2.4rem" }}>
            <Button label="바텀 시트 열기" onClick={() => setIsOpen(true)} />
          </div>
          <BottomSheetWithdraw
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="정말 세모를 탈퇴하실건가요?"
            description="탈퇴 시 계정 및 이용 기록은 모두 삭제되며, 삭제된 데이터는 복구가 불가능해요."
            confirmLabel="탈퇴하기"
            cancelLabel="더 써볼래요"
            disabled
          />
        </>
      );
    };
    return <DisabledComponent />;
  },
};

