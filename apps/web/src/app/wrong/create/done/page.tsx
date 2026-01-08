"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import Icon from "@/shared/components/icon/icon";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import DoneIllustration from "@/app/wrong/create/done/components/done-illustration";
import * as s from "./done.css";
import { Button } from "@/shared/components/button/button/button";

const WrongCreateDonePage = () => {
  const router = useRouter();

  return (
    <div className={s.page}>
      <div className={s.hero}>
        <Icon name="01" width={7.2} height={5.8} />
        <div className={s.checkBadge}>
          <Icon name="wrong-check" size={4} />
        </div>
      </div>

      <DoneIllustration />

      <div className={s.textBlock}>
        <h2 className={clsx(typo.h2, color["grayscale-900"])}>
          문제가 등록됐어요.
        </h2>
        <p className={clsx(typo.body1.medium, color["grayscale-600"])}>
          이제 천천히 오답을 정리해볼까요?
        </p>
      </div>

      <div className={s.actions}>
        <Button tone="dark" label="문제 계속 등록하기" />
        <Button tone="default" label="홈으로" />
      </div>
    </div>
  );
};

export default WrongCreateDonePage;
