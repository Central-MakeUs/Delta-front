export type AppBarSurface = "solid" | "transparent";
export type AppBarVariant =
  | "basic"
  | "basicAction"
  | "default"
  | "progress"
  | "title";

export type CommonProps = {
  className?: string;
  ariaLabel?: string;
  surface?: AppBarSurface;
};

export type BasicProps = CommonProps & {
  variant: "basic";
  title: string;
  onBack?: () => void;
};

export type BasicActionProps = CommonProps & {
  variant: "basicAction";
  title: string;
  actionLabel: string; // "수정하기"
  onBack?: () => void;
  onActionClick?: () => void;
  actionAriaLabel?: string;
};

export type DefaultProps = CommonProps & {
  variant: "default";
  onLogoClick?: () => void;
  onUserClick?: () => void;
};

export type ProgressProps = CommonProps & {
  variant: "progress";
  total: number;
  currentStep: number; // 1-base
  onBack?: () => void;
  /** step=1에서는 false로 내려서 "건너뛰기" 숨김 */
  showSkip?: boolean;
  onSkip?: () => void;
  skipLabel?: string;

  onStepChange?: (nextStep: number) => void;
};

export type TitleOnlyProps = CommonProps & {
  variant: "title";
  title: string;
};

export type AppBarProps =
  | BasicProps
  | BasicActionProps
  | DefaultProps
  | ProgressProps
  | TitleOnlyProps;
