import clsx from "clsx";
import Image from "next/image";
import { bgColor } from "@/shared/styles/color.css";
import Icon from "@/shared/components/icon/icon";
import * as s from "./done-illustration.css";

type DoneIllustrationProps = {
  className?: string;
};

export const DoneIllustration = ({ className }: DoneIllustrationProps) => {
  return (
    <div className={clsx(s.frame, bgColor["grayscale-50"], className)}>
      <div className={s.iconWrap}>
        <Icon name="01" width={7.2} height={5.8} />
        <div className={s.checkBadge}>
          <Icon name="wrong-check" size={4} />
        </div>
      </div>

      <div className={s.imageWrap} aria-hidden>
        <Image
          className={s.image}
          style={{ width: "100%", height: "auto" }}
          src="/wrong-create-done.svg"
          alt=""
          width={350}
          height={350}
          priority
          sizes="35rem"
        />
      </div>
    </div>
  );
};

export default DoneIllustration;
