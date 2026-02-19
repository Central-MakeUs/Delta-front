"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import Icon from "@/shared/components/icon/icon";
import ProgressBar from "@/shared/components/progress-bar/progress-bar";
import LineTabBar from "@/shared/components/tab-bar/line-tab-bar/line-tab-bar";
import * as s from "@/shared/components/app-bar/app-bar.css";
import { APP_BAR_DEFAULT_ARIA_LABEL } from "@/shared/components/app-bar/constants/app-bar";
import type { AppBarProps } from "@/shared/components/app-bar/types/app-bar";
import HeaderShell from "@/shared/components/app-bar/components/header-shell";
import LeftGroup from "@/shared/components/app-bar/components/left-group";
import BackButton from "@/shared/components/app-bar/components/back-button";
import ActionMenuModal from "@/shared/components/modal/action-menu-modal/action-menu-modal";

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

      const actionAriaLabel =
        props.actionAriaLabel ?? props.actionLabel ?? "메뉴";

      const hasAction = !!props.onActionClick;

      return renderShell(
        "basicAction",
        <>
          <LeftGroup title={props.title} onBack={onBack} />

          {hasAction && (
            <button
              type="button"
              className={clsx(
                props.actionIcon ? s.actionIconButton : s.actionButton
              )}
              aria-label={actionAriaLabel}
              onClick={props.onActionClick}
            >
              {props.actionIcon ? (
                <Icon
                  name={props.actionIcon}
                  size={props.actionIconSize ?? 2.4}
                  className={s.icon}
                />
              ) : (
                props.actionLabel
              )}
            </button>
          )}

          {props.actionMenu && (
            <ActionMenuModal
              isOpen={props.actionMenu.isOpen}
              title={props.actionMenu.title}
              items={props.actionMenu.items}
              onClose={props.actionMenu.onClose}
            />
          )}
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

          <div className={s.rightButtonGroup}>
            {/*
            <button
              type="button"
              className={s.premiumButton}
              aria-label="프리미엄"
              onClick={props.onProClick}
            >
              <Icon
                name="crown"
                size={1.6}
                className={s.premiumIcon}
                fill="currentColor"
              />
              <p className={s.premiumButtonText}>PRO</p>
            </button>
            */}
            <button
              type="button"
              className={s.rightIconButton}
              aria-label="내 정보"
              onClick={props.onUserClick}
            >
              <Icon name="user" size={2.4} className={s.icon} />
            </button>
          </div>
        </>
      );
    }

    case "progress": {
      const onBack = props.onBack ?? backFallback;

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

          <div className={s.rightSlot}></div>
        </>
      );
    }

    case "title": {
      return renderShell(
        "title",
        <span className={s.title}>{props.title}</span>
      );
    }

    case "graphTabs": {
      return renderShell(
        "graphTabs",
        <div className={s.stickyTop}>
          <LineTabBar
            items={props.tabs}
            value={props.value}
            onValueChange={props.onValueChange}
            ariaLabel={props.tabsAriaLabel ?? "학습 탭"}
          />
        </div>
      );
    }
  }
};

export default AppBar;
