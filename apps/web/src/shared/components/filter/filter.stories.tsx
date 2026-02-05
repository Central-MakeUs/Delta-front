import type { Meta, StoryObj } from "@storybook/react";
import Filter from "@/shared/components/filter/filter";

const meta = {
  title: "Shared/Filter",
  component: Filter,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Filter는 텍스트 + 아이콘으로 구성된 필터/드롭다운 버튼 컴포넌트입니다.",
          "",
          "- icon이 `filter`면 아이콘이 좌측, `chevron`이면 우측에 배치됩니다(CSS row-reverse).",
          "- background는 `filled(grayscale-50)` 또는 `transparent`를 지원합니다.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    label: { control: "text", description: "버튼 라벨" },
    background: {
      control: "radio",
      options: ["filled", "transparent"],
      description: "배경 스타일",
    },
    icon: {
      control: "radio",
      options: ["filter", "chevron", undefined],
      description: "표시할 아이콘",
    },
    disabled: { control: "boolean", description: "비활성화 여부" },
    onClick: { action: "click" },
    className: { control: false },
    ariaLabel: {
      control: "text",
      description: "aria-label(미지정 시 label 사용)",
    },
  },
  args: {
    label: "기본순",
    background: "filled",
    icon: "chevron",
    disabled: false,
  },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilledChevron: Story = {
  name: "Filled + Chevron",
  args: {
    label: "기본순",
    background: "filled",
    icon: "chevron",
  },
};

export const FilledFilter: Story = {
  name: "Filled + Filter",
  args: {
    label: "필터",
    background: "filled",
    icon: "filter",
  },
};

export const TransparentChevron: Story = {
  name: "Transparent + Chevron",
  args: {
    label: "기본순",
    background: "transparent",
    icon: "chevron",
  },
};

export const RowExample: Story = {
  name: "Row Example",
  render: (args) => (
    <div style={{ display: "flex", gap: "1.2rem", padding: "2rem" }}>
      <Filter {...args} label="필터" icon="filter" background="filled" />
      <Filter
        {...args}
        label="기본순"
        icon="chevron"
        background="transparent"
      />
      <Filter {...args} label="단원별" icon="chevron" background="filled" />
    </div>
  ),
  args: {
    disabled: false,
  },
};
