import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { lightTheme } from "@/shared/styles/theme.css";
import { Button } from "@/shared/components/button/button/button";
import BottomSheetFilter from "@/shared/components/bottom-sheet/bottom-sheet-filter/bottom-sheet-filter";
import type { BottomSheetFilterInitialSection } from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";

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
          background: "transparent",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const CHAPTER_FILTERS = [
  { id: "1", label: "1단원" },
  { id: "2", label: "2단원" },
  { id: "3", label: "3단원" },
  { id: "4", label: "4단원" },
  { id: "5", label: "5단원" },
  { id: "6", label: "6단원" },
  { id: "7", label: "7단원" },
];

const TYPE_FILTERS = [
  { id: "type1", label: "유형1" },
  { id: "type2", label: "유형2" },
  { id: "type3", label: "유형3" },
  { id: "type4", label: "유형4" },
  { id: "type5", label: "유형5" },
  { id: "type6", label: "유형6" },
];

const meta: Meta<typeof BottomSheetFilter> = {
  title: "Shared/BottomSheet/BottomSheetFilter",
  component: BottomSheetFilter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "필터 옵션을 선택할 수 있는 BottomSheet 컴포넌트입니다.",
          "화면 하단에서 올라오는 모달 형태의 컴포넌트입니다.",
          "단원별, 유형별 필터와 '단원 하위 옵션 섹션(토글 아님)'을 지원합니다.",
          "",
          "### 하위 옵션 섹션 동작",
          "- `dropdownSection.id`에 해당하는 단원 칩이 선택되면, 하위 체크박스 섹션이 **항상 펼쳐진 상태로 표시**됩니다.",
          "",
          "### Props",
          "- `selectedDropdownIds?: Record<string, string[]>` - 단원별 하위 옵션 선택값",
          "- `initialSection?: 'chapter' | 'type'` - 바텀시트 열릴 때 최상단에 위치할 섹션",
        ].join("\n"),
      },
    },
  },
  decorators: [
    (Story) => (
      <Stage>
        <Story />
      </Stage>
    ),
  ],
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "closed" },
    onReset: { action: "reset" },
    onApply: { action: "applied" },
    initialSection: {
      control: { type: "inline-radio" },
      options: ["chapter", "type"] satisfies BottomSheetFilterInitialSection[],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheetFilter>;

const DefaultStoryComponent = () => {
  const dropdownSection = {
    id: "1",
    options: [
      { id: "poly1", label: "다항식" },
      { id: "eq1", label: "방정식과 부등식" },
      { id: "func1", label: "함수" },
    ],
  };

  const [isOpen, setIsOpen] = useState(false);
  const [initialSection, setInitialSection] =
    useState<BottomSheetFilterInitialSection>("chapter");
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDropdown, setSelectedDropdown] = useState<
    Record<string, string[]>
  >({});

  return (
    <>
      <div style={{ padding: "2.4rem", display: "flex", gap: "1rem" }}>
        <Button
          label="단원별로 열기"
          onClick={() => {
            if (isOpen) return;
            setInitialSection("chapter");
            setIsOpen(true);
          }}
        />
        <Button
          label="유형별로 열기"
          onClick={() => {
            if (isOpen) return;
            setInitialSection("type");
            setIsOpen(true);
          }}
        />
      </div>

      <div style={{ padding: "0 2.4rem 2.4rem", lineHeight: 1.6 }}>
        <p>선택된 단원: {selectedChapters.join(", ") || "없음"}</p>
        <p>선택된 유형: {selectedTypes.join(", ") || "없음"}</p>
        <p>
          선택된 하위 옵션:{" "}
          {Object.entries(selectedDropdown)
            .map(([chapter, options]) => `${chapter}: ${options.join(", ")}`)
            .join(" | ") || "없음"}
        </p>
      </div>

      <BottomSheetFilter
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        chapterFilters={CHAPTER_FILTERS}
        typeFilters={TYPE_FILTERS}
        dropdownSection={dropdownSection}
        selectedChapterIds={selectedChapters}
        selectedTypeIds={selectedTypes}
        selectedDropdownIds={selectedDropdown}
        initialSection={initialSection}
        onReset={() => {
          setSelectedChapters([]);
          setSelectedTypes([]);
          setSelectedDropdown({});
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

export const Default: Story = {
  render: () => <DefaultStoryComponent />,
};

const OpenByDefaultStoryComponent = () => {
  const dropdownSection = {
    id: "1",
    options: [
      { id: "poly1", label: "다항식" },
      { id: "eq1", label: "방정식과 부등식" },
    ],
  };

  const [isOpen, setIsOpen] = useState(true);
  const [initialSection, setInitialSection] =
    useState<BottomSheetFilterInitialSection>("type");

  return (
    <>
      <div style={{ padding: "2.4rem", display: "flex", gap: "1rem" }}>
        <Button
          label="단원별로 다시 열기"
          onClick={() => {
            if (isOpen) return;
            setInitialSection("chapter");
            setIsOpen(true);
          }}
        />
        <Button
          label="유형별로 다시 열기"
          onClick={() => {
            if (isOpen) return;
            setInitialSection("type");
            setIsOpen(true);
          }}
        />
      </div>

      <BottomSheetFilter
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        chapterFilters={[
          { id: "1", label: "1단원" },
          { id: "2", label: "2단원" },
          { id: "3", label: "3단원" },
          { id: "4", label: "4단원" },
        ]}
        typeFilters={[
          { id: "type1", label: "유형1" },
          { id: "type2", label: "유형2" },
          { id: "type3", label: "유형3" },
        ]}
        dropdownSection={dropdownSection}
        selectedChapterIds={["1"]}
        selectedTypeIds={["type1"]}
        selectedDropdownIds={{ "1": ["poly1"] }}
        initialSection={initialSection}
      />
    </>
  );
};

export const OpenByDefault: Story = {
  render: () => <OpenByDefaultStoryComponent />,
};
