"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import DoneIllustration from "@/app/wrong/create/done/components/done-illustration";
import * as s from "./done.css";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/shared/components/button/button/button";

const WrongCreateDonePage = () => {
  const router = useRouter();

  const handleGoCreate = () => {
    router.push(ROUTES.WRONG.CREATE);
  };

  const handleGoHome = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <div className={s.page}>
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
        <Button
          tone="dark"
          label="문제 계속 등록하기"
          onClick={handleGoCreate}
        />
        <Button tone="default" label="홈으로" onClick={handleGoHome} />
      </div>
    </div>
  );
};

export default WrongCreateDonePage;
