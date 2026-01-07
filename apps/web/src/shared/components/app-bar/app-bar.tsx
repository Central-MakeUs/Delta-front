"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";

import Icon from "@/shared/components/icon/icon";
import ProgressBar from "@/shared/components/progress-bar/progress-bar";

import * as s from "./app-bar.css";
import {
  APP_BAR_DEFAULT_ARIA_LABEL,
  APP_BAR_SKIP_LABEL,
} from "./utils/app-bar-config";

type CommonProps = {
  className?: string;
  ariaLabel?: string;
  surface?: "solid" | "transparent";
};

type BasicProps = CommonProps & {
  variant: "basic";
  title: string;
  onBack?: () => void;
};

type BasicActionProps = CommonProps & {
  variant: "basicAction";
  title: string;
  actionLabel: string; // "수정하기"
  onBack?: () => void;
  onActionClick?: () => void;
  actionAriaLabel?: string;
};

type DefaultProps = CommonProps & {
  variant: "default";
  onLogoClick?: () => void;
  onUserClick?: () => void;
};

type ProgressProps = CommonProps & {
  variant: "progress";
  total: number;
  currentStep: number; // 1-base
  onBack?: () => void;
  /** step=1에서는 false로 내려서 "건너뛰기" 자체를 숨김 */
  showSkip?: boolean;
  onSkip?: () => void;
  skipLabel?: string;

  onStepChange?: (nextStep: number) => void;
};

type TitleOnlyProps = CommonProps & {
  variant: "title";
  title: string;
};

export type AppBarProps =
  | BasicProps
  | BasicActionProps
  | DefaultProps
  | ProgressProps
  | TitleOnlyProps;

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      className={s.buttonReset}
      aria-label="뒤로가기"
      onClick={onClick}
    >
      <Icon name="chevron" rotate={180} size={2.4} className={s.icon} />
    </button>
  );
};

export const AppBar = (props: AppBarProps) => {
  const router = useRouter();
  const ariaLabel = props.ariaLabel ?? APP_BAR_DEFAULT_ARIA_LABEL;
  const surface = props.surface ?? "solid";

  const handleBack = () => {
    if (
      props.variant === "basic" ||
      props.variant === "basicAction" ||
      props.variant === "progress"
    ) {
      props.onBack?.();
      if (!props.onBack) router.back();
    }
  };

  if (props.variant === "basic") {
    return (
      <header
        className={clsx(s.root({ variant: "basic", surface }), props.className)}
        aria-label={ariaLabel}
      >
        <BackButton onClick={handleBack} />
        <span className={s.title}>{props.title}</span>
      </header>
    );
  }

  if (props.variant === "basicAction") {
    const actionAriaLabel = props.actionAriaLabel ?? props.actionLabel;

    return (
      <header
        className={clsx(
          s.root({ variant: "basicAction", surface }),
          props.className
        )}
        aria-label={ariaLabel}
      >
        <div className={s.leftGroup}>
          <BackButton onClick={handleBack} />
          <span className={s.title}>{props.title}</span>
        </div>

        {typeof props.onActionClick === "function" ? (
          <button
            type="button"
            className={s.buttonReset}
            aria-label={actionAriaLabel}
            onClick={props.onActionClick}
          >
            <span className={s.actionText}>{props.actionLabel}</span>
          </button>
        ) : (
          <span className={s.actionText}>{props.actionLabel}</span>
        )}
      </header>
    );
  }

  if (props.variant === "default") {
    return (
      <header
        className={clsx(
          s.root({ variant: "default", surface }),
          props.className
        )}
        aria-label={ariaLabel}
      >
        <button
          type="button"
          className={clsx(s.buttonReset, s.logo)}
          aria-label="홈"
          onClick={props.onLogoClick}
        >
          <Icon name="logo-default" width={6.8} className={s.icon} />
        </button>

        <button
          type="button"
          className={clsx(s.rightIconButton, s.icon)}
          aria-label="내 정보"
          onClick={props.onUserClick}
        >
          <Icon name="user" size={2.4} className={s.icon} />
        </button>
      </header>
    );
  }

  if (props.variant === "progress") {
    const skipLabel = props.skipLabel ?? APP_BAR_SKIP_LABEL;
    const showSkip = props.showSkip ?? true;

    return (
      <header
        className={clsx(
          s.root({ variant: "progress", surface }),
          props.className
        )}
        aria-label={ariaLabel}
      >
        <div className={s.leftSlot}>
          <BackButton onClick={handleBack} />
        </div>

        <div className={s.centerSlot}>
          <ProgressBar
            total={props.total}
            currentStep={props.currentStep}
            onStepChange={props.onStepChange}
            ariaLabel="진행도"
          />
        </div>

        <div className={s.rightSlot}>
          {showSkip && typeof props.onSkip === "function" ? (
            <button
              type="button"
              className={s.buttonReset}
              aria-label={skipLabel}
              onClick={props.onSkip}
            >
              <span className={s.skipText}>{skipLabel}</span>
            </button>
          ) : null}
        </div>
      </header>
    );
  }

  return (
    <header
      className={clsx(s.root({ variant: "title", surface }), props.className)}
      aria-label={ariaLabel}
    >
      <span className={s.title}>{props.title}</span>
    </header>
  );
};

export default AppBar;
