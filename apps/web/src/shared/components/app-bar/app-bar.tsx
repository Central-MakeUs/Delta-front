import clsx from "clsx";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import Icon from "@/shared/components/icon/icon";
import ProgressBar from "@/shared/components/progress-bar/progress-bar";

import * as s from "@/shared/components/app-bar/app-bar.css";
import {
  APP_BAR_DEFAULT_ARIA_LABEL,
  APP_BAR_SKIP_LABEL,
} from "@/shared/components/app-bar/constants/app-bar";

import type { AppBarProps } from "@/shared/components/app-bar/types/app-bar";
import HeaderShell from "@/shared/components/app-bar/components/header-shell";
import LeftGroup from "@/shared/components/app-bar/components/left-group";
import TextAction from "@/shared/components/app-bar/components/text-action";
import BackButton from "@/shared/components/app-bar/components/back-button";

const AppBar = (props: AppBarProps) => {
  const router = useRouter();
  const ariaLabel = props.ariaLabel ?? APP_BAR_DEFAULT_ARIA_LABEL;
  const surface = props.surface ?? "solid";
  const backFallback = () => router.back();
  const shellClassName = props.className;

  const renderShell = (
    variant: AppBarProps["variant"],
    children: ReactNode
  ) => {
    return (
      <HeaderShell
        variant={variant}
        surface={surface}
        ariaLabel={ariaLabel}
        className={shellClassName}
      >
        {children}
      </HeaderShell>
    );
  };

  switch (props.variant) {
    case "basic": {
      const onBack = props.onBack ?? backFallback;
      return renderShell(
        "basic",
        <LeftGroup title={props.title} onBack={onBack} />
      );
    }

    case "basicAction": {
      const onBack = props.onBack ?? backFallback;
      const actionAriaLabel = props.actionAriaLabel ?? props.actionLabel;

      return renderShell(
        "basicAction",
        <>
          <LeftGroup title={props.title} onBack={onBack} />
          <TextAction
            label={props.actionLabel}
            tone="action"
            onClick={props.onActionClick}
            ariaLabel={actionAriaLabel}
          />
        </>
      );
    }

    case "default": {
      return renderShell(
        "default",
        <>
          <button
            type="button"
            className={clsx(s.buttonReset, s.logo)}
            aria-label="홈"
            onClick={props.onLogoClick}
          >
            <Icon name="logo-default" width={6.8} />
          </button>

          <button
            type="button"
            className={s.rightIconButton}
            aria-label="내 정보"
            onClick={props.onUserClick}
          >
            <Icon name="user" size={2.4} className={s.icon} />
          </button>
        </>
      );
    }

    case "progress": {
      const onBack = props.onBack ?? backFallback;
      const skipLabel = props.skipLabel ?? APP_BAR_SKIP_LABEL;
      const showSkip = props.showSkip ?? true;

      return renderShell(
        "progress",
        <>
          <div className={s.leftSlot}>
            <BackButton onClick={onBack} />
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
              <TextAction
                label={skipLabel}
                tone="skip"
                onClick={props.onSkip}
                ariaLabel={skipLabel}
              />
            ) : null}
          </div>
        </>
      );
    }

    case "title": {
      return renderShell(
        "title",
        <span className={s.title}>{props.title}</span>
      );
    }
  }
};

export default AppBar;
