"use client";

import type { ComponentProps, ReactNode } from "react";
import clsx from "clsx";
import Icon from "@/shared/components/icon/icon";
import * as s from "./empty-state.css";

type IconProps = ComponentProps<typeof Icon>;
type IconName = IconProps["name"];

type EmptyStateProps = {
  iconName: IconName;
  iconSize?: number;
  label: string | ReactNode;
  className?: string;
  iconWrapperClassName?: string;
  labelClassName?: string;
  iconProps?: Omit<IconProps, "name" | "size">;
};

const EmptyState = ({
  iconName,
  iconSize = 5.6,
  label,
  className,
  iconWrapperClassName,
  labelClassName,
  iconProps,
}: EmptyStateProps) => {
  return (
    <div className={clsx(s.root, className)}>
      <div className={iconWrapperClassName}>
        <Icon name={iconName} size={iconSize} {...iconProps} />
      </div>

      <p className={clsx(s.text, labelClassName)}>{label}</p>
    </div>
  );
};

export default EmptyState;
