import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NumberChoice } from "@/shared/components/number-choice/number-choice";

const meta = {
  title: "Shared/NumberChoice",
  component: NumberChoice,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
객관식 정답 선택 UI 컴포넌트입니다.

- 내부적으로 \`NumberButton\`을 조합해 1..N 버튼을 렌더합니다.
- \`count\`로 보기 개수(기본 5)를 제어합니다.
- 선택 값은 상위에서 \`value\` / \`onValueChange\`로 제어합니다(Controlled).
- 레이아웃은 \`w-full + space-between\`으로 버튼들을 컨테이너 너비에 맞춰 배치합니다.

### 사용 예시

\`\`\`tsx
import { useState } from "react";
import { lightTheme } from "@/shared/styles/theme.css";
import { NumberChoice } from "@/shared/components/number-choice/number-choice";

const Example = () => {
  const [answer, setAnswer] = useState<number | null>(null);
  return (
    <div className={lightTheme} style={{ padding: "0 1.7rem" }}>
      <NumberChoice value={answer} onValueChange={setAnswer} />
    </div>
  );
};

export default Example;

\`\`\`
        `.trim(),
      },
    },
  },

  args: {
    value: 1,
    onValueChange: () => {},
  },

  argTypes: {
    count: {
      description: "보기 개수 (기본 5)",
      control: { type: "number", min: 0, max: 10, step: 1 },
      table: { type: { summary: "number" }, defaultValue: { summary: "5" } },
    },
    value: {
      description: "선택된 번호 (없으면 null)",
      control: false,
      table: { type: { summary: "number | null" } },
    },
    onValueChange: {
      description: "선택 값 변경 콜백",
      action: "valueChanged",
      table: { type: { summary: "(next: number) => void" } },
    },
    disabled: {
      description: "전체 비활성화",
      control: { type: "boolean" },
    },
    className: {
      description: "외부에서 확장할 className",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof NumberChoice>;

export default meta;

type Story = StoryObj<typeof meta>;

const ControlledTemplate = ({
  initial,
  ...args
}: React.ComponentProps<typeof NumberChoice> & { initial?: number | null }) => {
  const [value, setValue] = useState<number | null>(initial ?? args.value);

  return (
    <div style={{ width: 400 }}>
      <NumberChoice
        {...args}
        value={value}
        onValueChange={(next) => {
          setValue(next);
          args.onValueChange?.(next);
        }}
      />
    </div>
  );
};

export const Controlled: Story = {
  name: "Controlled",
  args: {
    count: 5,
    disabled: false,
  },
  render: (args) => <ControlledTemplate {...args} initial={1} />,
};

export const Count4: Story = {
  name: "Count = 4",
  args: {
    count: 4,
    disabled: false,
  },
  render: (args) => <ControlledTemplate {...args} initial={2} />,
};
