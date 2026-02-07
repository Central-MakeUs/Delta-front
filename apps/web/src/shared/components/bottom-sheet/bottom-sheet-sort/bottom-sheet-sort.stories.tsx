import type { Meta, StoryObj } from "@storybook/react";
import React, { useMemo, useState } from "react";
import { lightTheme } from "@/shared/styles/theme.css";
import { Button } from "@/shared/components/button/button/button";
import BottomSheetSort from "@/shared/components/bottom-sheet/bottom-sheet-sort/bottom-sheet-sort";

const Stage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={lightTheme}
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "43rem",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const meta: Meta<typeof BottomSheetSort> = {
  title: "Shared/BottomSheet/BottomSheetSort",
  component: BottomSheetSort,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        height: "80vh",
      },
      description: {
        component: [
          "정렬 옵션을 선택할 수 있는 BottomSheet 컴포넌트입니다.",
          "화면 하단에서 올라오는 모달 형태의 컴포넌트입니다.",
          "`options` 배열을 통해 정렬 옵션을 전달하고, `selectedOptionId`로 선택된 옵션을 표시합니다.",
          "오버레이 클릭/ESC로 닫을 수 있고, 닫힘 애니메이션 종료 후 `onClose`가 호출됩니다.",
          "",
          "### Props",
          "- `isOpen: boolean` (필수)",
          "- `onClose: () => void` (필수)",
          "- `options: SortOption[]` (필수) - 정렬 옵션 배열",
          "- `selectedOptionId?: string` - 현재 선택된 옵션 ID",
          "- `onSelect?: (optionId: string) => void` - 옵션 선택 시 호출되는 콜백",
        ].join("\n"),
      },
    },
  },
  args: {
    isOpen: true,
    options: [
      { id: "recent", label: "최근 등록순" },
      { id: "oldest", label: "오래된 순" },
      { id: "name", label: "이름순" },
      { id: "popular", label: "인기순" },
      { id: "rating", label: "평점순" },
    ],
    selectedOptionId: "recent",
  },
  argTypes: {
    isOpen: { control: "boolean" },
    selectedOptionId: { control: "text" },
    onClose: { action: "closed" },
    onSelect: { action: "selected" },
  },
  decorators: [
    (Story) => (
      <Stage>
        <Story />
      </Stage>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BottomSheetSort>;

const DEFAULT_OPTIONS = [
  { id: "recent", label: "최근 등록순" },
  { id: "oldest", label: "오래된 순" },
  { id: "name", label: "이름순" },
  { id: "popular", label: "인기순" },
  { id: "rating", label: "평점순" },
];

const DefaultStoryComponent = () => {
  const options = useMemo(() => DEFAULT_OPTIONS, []);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("recent");

  const selectedLabel =
    options.find((o) => o.id === selectedOption)?.label ?? "없음";

  return (
    <>
      <div style={{ padding: "2.4rem" }}>
        <Button label="정렬 바텀 시트 열기" onClick={() => setIsOpen(true)} />
        <p style={{ marginTop: "1rem" }}>현재 선택: {selectedLabel}</p>
      </div>

      <BottomSheetSort
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        options={options}
        selectedOptionId={selectedOption}
        onSelect={(id) => setSelectedOption(id)}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <DefaultStoryComponent />,
};

const NoSelectionStoryComponent = () => {
  const options = useMemo(() => DEFAULT_OPTIONS, []);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div style={{ padding: "2.4rem" }}>
        <Button label="정렬 바텀 시트 열기" onClick={() => setIsOpen(true)} />
        <p style={{ marginTop: "1rem" }}>현재 선택: 없음</p>
      </div>

      <BottomSheetSort
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        options={options}
      />
    </>
  );
};

export const NoSelection: Story = {
  render: () => <NoSelectionStoryComponent />,
};

const OpenByDefaultStoryComponent = () => {
  const options = useMemo(() => DEFAULT_OPTIONS, []);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("recent");

  return (
    <>
      <div style={{ padding: "2.4rem" }}>
        <Button label="닫기" onClick={() => setIsOpen(false)} />
        <span style={{ display: "inline-block", width: "1rem" }} />
        <Button label="다시 열기" onClick={() => setIsOpen(true)} />
      </div>

      <BottomSheetSort
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        options={options}
        selectedOptionId={selectedOption}
        onSelect={(id) => setSelectedOption(id)}
      />
    </>
  );
};

export const OpenByDefault: Story = {
  render: () => <OpenByDefaultStoryComponent />,
};
