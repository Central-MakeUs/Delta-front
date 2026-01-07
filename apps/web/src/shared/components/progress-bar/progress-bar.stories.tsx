import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { useRef, useState } from "react";
import { lightTheme } from "@/shared/styles/theme.css";
import ProgressBar from "@/shared/components/progress-bar/progress-bar";
import * as testStyles from "@/shared/components/progress-bar/progress-bar.stories.css";

type PBProps = React.ComponentProps<typeof ProgressBar>;

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const resolveInitialStep = (props: PBProps) => {
  const total = props.total;

  const currentIndex =
    "currentIndex" in props && typeof props.currentIndex === "number"
      ? props.currentIndex
      : undefined;

  const currentStep =
    "currentStep" in props && typeof props.currentStep === "number"
      ? props.currentStep
      : undefined;

  if (typeof currentIndex === "number")
    return clamp(currentIndex + 1, 1, total);
  if (typeof currentStep === "number") return clamp(currentStep, 1, total);
  return 1;
};

const DisplayOnlyExample = (props: PBProps) => {
  return (
    <div className={lightTheme} style={{ padding: "2.0rem" }}>
      <ProgressBar {...props} />
    </div>
  );
};

type InteractiveClickExampleProps = {
  total: number;
  initialStep: number;
  ariaLabel?: string;
};

const InteractiveClickExample = ({
  total,
  initialStep,
  ariaLabel,
}: InteractiveClickExampleProps) => {
  const [step, setStep] = useState<number>(initialStep);

  return (
    <div
      className={lightTheme}
      style={{
        padding: "2.0rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.6rem",
      }}
    >
      <ProgressBar
        total={total}
        currentStep={step}
        ariaLabel={ariaLabel}
        onStepChange={(next) => setStep(next)}
      />
      <div>
        현재 단계: <b>{step}</b> / {total}
      </div>
    </div>
  );
};

const SLIDES = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"] as const;

const SliderLinkedExample = () => {
  const total = SLIDES.length;
  const [currentStep, setCurrentStep] = useState<number>(1);

  const viewportRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);

  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragWidth, setDragWidth] = useState(1);

  const currentIndex = clamp(currentStep - 1, 0, total - 1);

  const goToStep = (nextStep: number) =>
    setCurrentStep(clamp(nextStep, 1, total));
  const goNext = () => goToStep(currentStep + 1);
  const goPrev = () => goToStep(currentStep - 1);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const width = viewportRef.current?.getBoundingClientRect().width ?? 1;

    startXRef.current = e.clientX;
    setDragWidth(width);

    setIsDragging(true);
    setDragX(0);

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setDragX(e.clientX - startXRef.current);
  };

  const endDrag = () => {
    const threshold = dragWidth * 0.2;

    if (dragX <= -threshold) goNext();
    else if (dragX >= threshold) goPrev();

    setDragX(0);
    setIsDragging(false);
  };

  const dragPercent = isDragging ? (dragX / dragWidth) * 100 : 0;
  const translatePercent = currentIndex * 100 - dragPercent;

  return (
    <div className={lightTheme}>
      <div className={testStyles.page}>
        <ProgressBar
          total={total}
          currentStep={currentStep}
          onStepChange={goToStep}
        />

        <div
          ref={viewportRef}
          className={testStyles.viewport}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div
            className={clsx(
              testStyles.track,
              isDragging && testStyles.trackDragging
            )}
            style={{ transform: `translateX(-${translatePercent}%)` }}
          >
            {SLIDES.map((text) => (
              <div key={text} className={testStyles.slide}>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: "Shared/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "ProgressBar는 단계형 진행 상태를 표시하는 컴포넌트입니다.",
          "",
          "- 세그먼트 gap: 1.2rem",
          "- 공통: height 0.8rem, radius full",
          "- active: width 2.4rem + grayscale-800",
          "- inactive: width 0.8rem + grayscale-100",
          "",
          "`onStepChange`를 전달하면 세그먼트를 클릭하여 step을 변경할 수 있으며,",
          "슬라이더/캐러셀과 연동해 상위에서 `currentStep`를 관리하는 방식으로 사용합니다.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    total: { control: "number", description: "전체 단계 수" },
    currentStep: {
      control: "number",
      description: "현재 단계(1-based). currentIndex와 동시 사용 불가",
    },
    currentIndex: {
      control: "number",
      description: "현재 인덱스(0-based). currentStep과 동시 사용 불가",
    },
    onStepChange: { control: false, description: "세그먼트 클릭 시 step 변경" },
    ariaLabel: { control: "text", description: "aria-label" },
    className: { control: false },
  },
  args: {
    total: 4,
    currentStep: 2,
    ariaLabel: "progress",
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSlider: Story = {
  name: "With Slider (Click + Swipe)",
  render: () => <SliderLinkedExample />,
};

export const DisplayOnly: Story = {
  name: "Display Only",
  render: (args) => <DisplayOnlyExample {...(args as PBProps)} />,
};

export const InteractiveClick: Story = {
  name: "Interactive (Click segments)",
  render: (args) => (
    <InteractiveClickExample
      total={(args.total ?? 4) as number}
      initialStep={resolveInitialStep(args as PBProps)}
      ariaLabel={args.ariaLabel}
    />
  ),
};
