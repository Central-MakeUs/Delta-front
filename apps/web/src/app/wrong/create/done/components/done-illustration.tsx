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
      <div className={s.imageWrap} aria-hidden>
        <Image
          className={s.image}
          style={{ width: "100%", height: "auto" }}
          src="/wrong-create-done.svg"
          alt=""
          width={476}
          height={560}
          priority
          sizes="37rem"
        />
      </div>
    </div>
  );
};

export default DoneIllustration;
