import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { lightTheme } from "@/shared/styles/theme.css";
import { Button } from "@/shared/components/button/button/button";
import BottomSheetSort from "./bottom-sheet-sort";

const meta: Meta<typeof BottomSheetSort> = {
  title: "Shared/BottomSheet/BottomSheetSort",
  component: BottomSheetSort,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "정렬 옵션을 선택할 수 있는 BottomSheet 컴포넌트입니다.",
          "화면 하단에서 올라오는 모달 형태의 컴포넌트입니다.",
          "`options` 배열을 통해 정렬 옵션을 전달하고, `selectedOptionId`로 선택된 옵션을 표시합니다.",
          "ESC 키 또는 오버레이 클릭으로 닫을 수 있습니다.",
          "Vanilla Extract를 사용하여 스타일링되었습니다.",
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
type Story = StoryObj<typeof BottomSheetSort>;

/** 기본 정렬 바텀 시트 */
export const Default: Story = {
  render: () => {
    const DefaultComponent = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [selectedOption, setSelectedOption] = useState("recent");

      const options = [
        { id: "recent", label: "최근 등록순" },
        { id: "oldest", label: "오래된 순" },
        { id: "name", label: "이름순" },
        { id: "popular", label: "인기순" },
        { id: "rating", label: "평점순" },
      ];

      return (
        <>
          <div style={{ padding: "2.4rem" }}>
            <Button
              label="정렬 바텀 시트 열기"
              onClick={() => setIsOpen(true)}
            />
            <p style={{ marginTop: "1rem" }}>
              현재 선택: {options.find((o) => o.id === selectedOption)?.label}
            </p>
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
    return <DefaultComponent />;
  },
};

/** 선택된 옵션이 없는 경우 */
export const NoSelection: Story = {
  render: () => {
    const NoSelectionComponent = () => {
      const [isOpen, setIsOpen] = useState(false);

      const options = [
        { id: "recent", label: "최근 등록순" },
        { id: "oldest", label: "오래된 순" },
        { id: "name", label: "이름순" },
        { id: "popular", label: "인기순" },
        { id: "rating", label: "평점순" },
      ];

      return (
        <>
          <div style={{ padding: "2.4rem" }}>
            <Button
              label="정렬 바텀 시트 열기"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <BottomSheetSort
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            options={options}
          />
        </>
      );
    };
    return <NoSelectionComponent />;
  },
};

