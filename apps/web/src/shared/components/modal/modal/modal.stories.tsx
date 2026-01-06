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
          "`title / description / cancelLabel / confirmLabel / size`를 지원합니다.",
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
          '- `size?: "sm" | "md" | "lg"` (기본값: "md")',
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

export const Playground: Story = {
  render: (args) => {
    const PlaygroundComponent = () => {
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
    return <PlaygroundComponent />;
  },
};

/** 기본 모달 */
export const Default: Story = {
  render: () => {
    const DefaultComponent = () => {
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
            confirmLabel="확인"
            onCancel={() => console.log("취소 클릭")}
            onConfirm={() => console.log("확인 클릭")}
          />
        </>
      );
    };
    return <DefaultComponent />;
  },
};

/** 설명 없는 모달 */
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
            onConfirm={() => console.log("확인 클릭")}
          />
        </>
      );
    };
    return <WithoutDescriptionComponent />;
  },
};

/** 크기별 모달 */
export const Sizes: Story = {
  render: () => {
    const SizesComponent = () => {
      const [isOpenSm, setIsOpenSm] = useState(false);
      const [isOpenMd, setIsOpenMd] = useState(false);
      const [isOpenLg, setIsOpenLg] = useState(false);

      return (
        <>
          <div
            style={{
              padding: "2.4rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            <Button label="Small 모달 열기" onClick={() => setIsOpenSm(true)} />
            <Button label="Medium 모달 열기" onClick={() => setIsOpenMd(true)} />
            <Button label="Large 모달 열기" onClick={() => setIsOpenLg(true)} />
          </div>

          <Modal
            isOpen={isOpenSm}
            onClose={() => setIsOpenSm(false)}
            title="Small 모달"
            description="작은 크기의 모달입니다."
            size="sm"
          />

          <Modal
            isOpen={isOpenMd}
            onClose={() => setIsOpenMd(false)}
            title="Medium 모달"
            description="중간 크기의 모달입니다."
            size="md"
          />

          <Modal
            isOpen={isOpenLg}
            onClose={() => setIsOpenLg(false)}
            title="Large 모달"
            description="큰 크기의 모달입니다."
            size="lg"
          />
        </>
      );
    };
    return <SizesComponent />;
  },
};

/** 커스텀 버튼 텍스트 */
export const CustomButtons: Story = {
  render: () => {
    const CustomButtonsComponent = () => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <>
          <div style={{ padding: "2.4rem" }}>
            <Button label="모달 열기" onClick={() => setIsOpen(true)} />
          </div>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="삭제 확인"
            description="이 항목을 삭제하시겠습니까?"
            cancelLabel="아니오"
            confirmLabel="삭제"
            onCancel={() => console.log("아니오 클릭")}
            onConfirm={() => console.log("삭제 클릭")}
          />
        </>
      );
    };
    return <CustomButtonsComponent />;
  },
};

/** 다양한 사용 사례 */
export const UseCases: Story = {
  render: () => {
    const UseCasesComponent = () => {
      const [logoutOpen, setLogoutOpen] = useState(false);
      const [deleteOpen, setDeleteOpen] = useState(false);
      const [saveOpen, setSaveOpen] = useState(false);

      return (
        <>
          <div
            style={{
              padding: "2.4rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            <Button label="로그아웃 모달" onClick={() => setLogoutOpen(true)} />
            <Button label="삭제 확인 모달" onClick={() => setDeleteOpen(true)} />
            <Button label="저장 확인 모달" onClick={() => setSaveOpen(true)} />
          </div>

          {/* 로그아웃 모달 */}
          <Modal
            isOpen={logoutOpen}
            onClose={() => setLogoutOpen(false)}
            title="로그아웃"
            description="정말 로그아웃할까요?"
            onConfirm={() => {
              console.log("로그아웃 실행");
              setLogoutOpen(false);
            }}
          />

          {/* 삭제 확인 모달 */}
          <Modal
            isOpen={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            title="삭제 확인"
            description="이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
            cancelLabel="취소"
            confirmLabel="삭제"
            onConfirm={() => {
              console.log("삭제 실행");
              setDeleteOpen(false);
            }}
          />

          {/* 저장 확인 모달 */}
          <Modal
            isOpen={saveOpen}
            onClose={() => setSaveOpen(false)}
            title="저장 확인"
            description="변경사항을 저장하시겠습니까?"
            cancelLabel="저장 안 함"
            confirmLabel="저장"
            onConfirm={() => {
              console.log("저장 실행");
              setSaveOpen(false);
            }}
          />
        </>
      );
    };
    return <UseCasesComponent />;
  },
};

