import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/shared/components/button/button/button";
import { ToastProvider } from "@/shared/components/toast/toast-provider/toast-provider";
import {
  showToast,
  toastError,
  toastSuccess,
} from "@/shared/components/toast/toast";
import type { ToastVariant } from "@/shared/components/toast/toast";

type ToastPlaygroundProps = {
  successMessage: string;
  errorMessage: string;
  customVariant: ToastVariant;
  customMessage: string;
  bottomOffsetRem: number;
  durationMs?: number;
};

const ToastPlayground = ({
  successMessage,
  errorMessage,
  customVariant,
  customMessage,
  bottomOffsetRem,
  durationMs,
}: ToastPlaygroundProps) => {
  return (
    <main
      style={{
        padding: "2.0rem",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
    >
      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
        <Button
          label="Success Toast"
          onClick={() => toastSuccess(successMessage, bottomOffsetRem)}
        />
        <Button
          label="Error Toast"
          onClick={() => toastError(errorMessage, bottomOffsetRem)}
        />
      </div>

      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
        <Button
          label="Custom (showToast)"
          onClick={() =>
            showToast({
              variant: customVariant,
              message: customMessage,
              bottomOffsetRem,
              duration: durationMs,
            })
          }
        />
        <Button
          label="여러 개"
          onClick={() => {
            toastSuccess("옵션이 적용되었어요.", bottomOffsetRem);
            toastSuccess("이미지 업로드가 완료됐어요.", bottomOffsetRem);
            toastError("용량을 초과했어요.", bottomOffsetRem);
          }}
        />
      </div>

      <div style={{ marginTop: "0.8rem", opacity: 0.8 }}>
        <p style={{ margin: 0 }}>
          현재 설정: bottomOffsetRem = <b>{bottomOffsetRem}</b> / durationMs ={" "}
          <b>{durationMs ?? "default"}</b>
        </p>
      </div>
    </main>
  );
};

const meta: Meta<typeof ToastPlayground> = {
  title: "Shared/Toast",
  component: ToastPlayground,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <ToastProvider />
        <Story />
      </>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "앱 전역에서 사용하는 토스트 유틸(`toastSuccess`, `toastError`, `showToast`)의 동작을 검증하기 위한 Story입니다.",
          "",
          "### 구조",
          "- 렌더링은 `react-hot-toast`의 `toast.custom`을 사용해 `ToastItem`을 그립니다.",
          "- 실제 출력은 전역 `ToastProvider(Toaster)`가 담당하므로, 사용처(앱/스토리)에서 `ToastProvider`가 반드시 한 번은 마운트되어 있어야 합니다.",
          "",
          "### API",
          "- `toastSuccess(message, bottomOffsetRem?)`",
          "- `toastError(message, bottomOffsetRem?)`",
          "- `showToast({ variant, message, bottomOffsetRem?, duration? })`",
          "",
          "### bottomOffsetRem",
          "- 개별 토스트를 위로 띄우기 위한 추가 오프셋입니다(rem 단위).",
          "- 내부적으로 wrapper에 transform을 적용하는 방식이라 레이아웃 spacing을 늘리지 않습니다.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    successMessage: {
      control: "text",
      description: "성공 토스트 메시지",
    },
    errorMessage: {
      control: "text",
      description: "에러 토스트 메시지",
    },
    customVariant: {
      control: { type: "radio" },
      options: ["success", "error"],
      description: "`showToast`로 띄울 variant",
    },
    customMessage: {
      control: "text",
      description: "`showToast`로 띄울 메시지",
    },
    bottomOffsetRem: {
      control: { type: "number", min: 0, step: 0.1 },
      description:
        "토스트를 위로 띄우는 추가 오프셋(rem). 예) 6.5 → translateY(-6.5rem)",
    },
    durationMs: {
      control: { type: "number", min: 0, step: 100 },
      description:
        "`showToast`에서만 사용되는 duration(ms). undefined면 react-hot-toast 기본/Toaster 설정을 따릅니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToastPlayground>;

export const Playground: Story = {
  args: {
    successMessage: "옵션이 적용되었어요.",
    errorMessage: "이미지 형식에 맞지 않아요.",
    customVariant: "success",
    customMessage: "커스텀 토스트에요.",
    bottomOffsetRem: 1.6,
    durationMs: 2500,
  },
  parameters: {
    docs: {
      description: {
        story:
          "버튼을 눌러 토스트를 직접 띄워보고, `bottomOffsetRem`/`durationMs` 변경에 따른 동작을 확인합니다.",
      },
    },
  },
};

export const OffsetRem: Story = {
  args: {
    successMessage: "하단 버튼/바텀시트가 있는 화면을 가정해요.",
    errorMessage: "토스트를 더 위로 올려야 해요.",
    customVariant: "error",
    customMessage: "bottomOffsetRem = 6.5 적용",
    bottomOffsetRem: 6.5,
    durationMs: 2500,
  },
  parameters: {
    docs: {
      description: {
        story:
          "`bottomOffsetRem=6.5` 환경을 가정한 스토리입니다. 하단 UI(바텀시트/바텀버튼)와 겹치는 상황에서 사용합니다.",
      },
    },
  },
};
