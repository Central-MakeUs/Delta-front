import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { lightTheme } from "@/shared/styles/theme.css";
import { Button } from "@/shared/components/button/button/button";
import BottomSheetFilter from "./bottom-sheet-filter";

const meta: Meta<typeof BottomSheetFilter> = {
  title: "Shared/BottomSheet/BottomSheetFilter",
  component: BottomSheetFilter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "필터 옵션을 선택할 수 있는 BottomSheet 컴포넌트입니다.",
          "화면 하단에서 올라오는 모달 형태의 컴포넌트입니다.",
          "단원별, 유형별 필터와 드롭다운 섹션을 지원합니다.",
          "초기화 및 적용 버튼을 통해 필터를 관리할 수 있습니다.",
          "ESC 키 또는 오버레이 클릭으로 닫을 수 있습니다.",
          "Vanilla Extract를 사용하여 스타일링되었습니다.",
          "",
          "### Props",
          "- `isOpen: boolean` (필수)",
          "- `onClose: () => void` (필수)",
          "- `chapterFilters: FilterOption[]` (필수) - 단원별 필터 옵션",
          "- `typeFilters: FilterOption[]` (필수) - 유형별 필터 옵션",
          "- `dropdownSection?: DropdownSection` - 드롭다운 섹션",
          "- `selectedChapterIds?: string[]` - 선택된 단원 ID 배열",
          "- `selectedTypeIds?: string[]` - 선택된 유형 ID 배열",
          "- `selectedDropdownIds?: string[]` - 선택된 드롭다운 ID 배열",
          "- `onReset?: () => void` - 초기화 버튼 클릭 시 호출",
          "- `onApply?: (filters) => void` - 적용 버튼 클릭 시 호출",
        ].join("\n"),
      },
    },
  },
  args: {
    isOpen: true,
    chapterFilters: [
      { id: "1", label: "1단원" },
      { id: "2", label: "2단원" },
      { id: "3", label: "3단원" },
      { id: "4", label: "4단원" },
      { id: "5", label: "5단원" },
      { id: "6", label: "6단원" },
      { id: "7", label: "7단원" },
    ],
    typeFilters: [
      { id: "type1", label: "유형1" },
      { id: "type2", label: "유형2" },
      { id: "type3", label: "유형3" },
      { id: "type4", label: "유형4" },
      { id: "type5", label: "유형5" },
      { id: "type6", label: "유형6" },
    ],
    selectedChapterIds: ["1"],
  },
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "closed" },
    onReset: { action: "reset" },
    onApply: { action: "applied" },
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
type Story = StoryObj<typeof BottomSheetFilter>;

/** 기본 필터 바텀 시트 */
export const Default: Story = {
  render: () => {
    const DefaultComponent = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
      const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
      const [selectedDropdown, setSelectedDropdown] = useState<string[]>([]);

      const chapterFilters = [
        { id: "1", label: "1단원" },
        { id: "2", label: "2단원" },
        { id: "3", label: "3단원" },
        { id: "4", label: "4단원" },
        { id: "5", label: "5단원" },
        { id: "6", label: "6단원" },
        { id: "7", label: "7단원" },
      ];

      const typeFilters = [
        { id: "type1", label: "유형1" },
        { id: "type2", label: "유형2" },
        { id: "type3", label: "유형3" },
        { id: "type4", label: "유형4" },
        { id: "type5", label: "유형5" },
        { id: "type6", label: "유형6" },
      ];

      const dropdownSection = {
        id: "math1",
        title: "공통수학1",
        options: [
          { id: "poly1", label: "다항식" },
          { id: "eq1", label: "방정식과 부등식" },
          { id: "poly2", label: "다항식" },
        ],
        defaultOpen: true,
      };

      return (
        <>
          <div style={{ padding: "2.4rem" }}>
            <Button
              label="필터 바텀 시트 열기"
              onClick={() => setIsOpen(true)}
            />
            <div style={{ marginTop: "1rem" }}>
              <p>선택된 단원: {selectedChapters.join(", ")}</p>
              <p>선택된 유형: {selectedTypes.join(", ") || "없음"}</p>
              <p>선택된 드롭다운: {selectedDropdown.join(", ") || "없음"}</p>
            </div>
          </div>
          <BottomSheetFilter
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            chapterFilters={chapterFilters}
            typeFilters={typeFilters}
            dropdownSection={dropdownSection}
            selectedChapterIds={selectedChapters}
            selectedTypeIds={selectedTypes}
            selectedDropdownIds={selectedDropdown}
            onReset={() => {
              setSelectedChapters([]);
              setSelectedTypes([]);
              setSelectedDropdown([]);
            }}
            onApply={(filters) => {
              setSelectedChapters(filters.chapters);
              setSelectedTypes(filters.types);
              setSelectedDropdown(filters.dropdown);
            }}
          />
        </>
      );
    };
    return <DefaultComponent />;
  },
};

/** 드롭다운 없는 필터 */
export const WithoutDropdown: Story = {
  render: () => {
    const WithoutDropdownComponent = () => {
      const [isOpen, setIsOpen] = useState(false);

      const chapterFilters = [
        { id: "1", label: "1단원" },
        { id: "2", label: "2단원" },
        { id: "3", label: "3단원" },
      ];

      const typeFilters = [
        { id: "type1", label: "유형1" },
        { id: "type2", label: "유형2" },
        { id: "type3", label: "유형3" },
      ];

      return (
        <>
          <div style={{ padding: "2.4rem" }}>
            <Button
              label="필터 바텀 시트 열기 (드롭다운 없음)"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <BottomSheetFilter
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            chapterFilters={chapterFilters}
            typeFilters={typeFilters}
          />
        </>
      );
    };
    return <WithoutDropdownComponent />;
  },
};

