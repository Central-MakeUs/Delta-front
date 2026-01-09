import type { ReactNode } from "react";
import clsx from "clsx";
import { bgColor } from "@/shared/styles/color.css";
import * as s from "./my-page-card.css";

type MyPageCardProps = {
  children: ReactNode;
  className?: string;
};

export const MyPageCard = ({ children, className }: MyPageCardProps) => {
  return (
    <section className={clsx(bgColor["grayscale-50"], s.card, className)}>
      {children}
    </section>
  );
};
