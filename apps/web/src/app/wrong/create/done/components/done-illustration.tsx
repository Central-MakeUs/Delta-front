"use client";

import clsx from "clsx";
import Image from "next/image";
import { bgColor } from "@/shared/styles/color.css";
import * as s from "./done-illustration.css";

type DoneIllustrationProps = {
  className?: string;
};

export const DoneIllustration = ({ className }: DoneIllustrationProps) => {
  return (
    <div className={clsx(s.frame, bgColor["grayscale-50"], className)}>
      <Image
        className={s.image}
        src="/wrong-create-done.svg"
        alt=""
        aria-hidden
        fill
        priority
      />
    </div>
  );
};

export default DoneIllustration;
