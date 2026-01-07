import clsx from "clsx";
import { useRouter } from "next/navigation";
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

export const AppBar = (props: AppBarProps) => {
  const router = useRouter();

  const ariaLabel = props.ariaLabel ?? APP_BAR_DEFAULT_ARIA_LABEL;
  const surface = props.surface ?? "solid";
  const backFallback = () => router.back();

  switch (props.variant) {
    case "basic": {
      const onBack = props.onBack ?? backFallback;

      return (
        <HeaderShell
          variant="basic"
          surface={surface}
          ariaLabel={ariaLabel}
          className={props.className}
        >
          <LeftGroup title={props.title} onBack={onBack} />
        </HeaderShell>
      );
    }

    case "basicAction": {
      const onBack = props.onBack ?? backFallback;
      const actionAriaLabel = props.actionAriaLabel ?? props.actionLabel;

      return (
        <HeaderShell
          variant="basicAction"
          surface={surface}
          ariaLabel={ariaLabel}
          className={props.className}
        >
          <LeftGroup title={props.title} onBack={onBack} />
          <TextAction
            label={props.actionLabel}
            tone="action"
            onClick={props.onActionClick}
            ariaLabel={actionAriaLabel}
          />
        </HeaderShell>
      );
    }

    case "default": {
      return (
        <HeaderShell
          variant="default"
          surface={surface}
          ariaLabel={ariaLabel}
          className={props.className}
        >
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
        </HeaderShell>
      );
    }

    case "progress": {
      const onBack = props.onBack ?? backFallback;
      const skipLabel = props.skipLabel ?? APP_BAR_SKIP_LABEL;
      const showSkip = props.showSkip ?? true;

      return (
        <HeaderShell
          variant="progress"
          surface={surface}
          ariaLabel={ariaLabel}
          className={props.className}
        >
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
        </HeaderShell>
      );
    }

    case "title": {
      return (
        <HeaderShell
          variant="title"
          surface={surface}
          ariaLabel={ariaLabel}
          className={props.className}
        >
          <span className={s.title}>{props.title}</span>
        </HeaderShell>
      );
    }
  }
};

export default AppBar;
