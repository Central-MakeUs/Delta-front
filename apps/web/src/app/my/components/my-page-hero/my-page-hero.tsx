"use client";

import clsx from "clsx";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import * as s from "@/app/my/components/my-page-hero/my-page-hero.css";
import HeroBackground from "@/app/my/components/hero-background/hero-background";
import ProfileAvatar from "@/app/my/components/profile-avatar/profile-avatar";
import Icon from "@/shared/components/icon/icon";

type MyPageHeroProps = {
  userName: string;
  profileImageUrl?: string | null;
};

const MyPageHero = ({ userName, profileImageUrl = null }: MyPageHeroProps) => {
  const router = useRouter();

  const goEditProfile = useCallback(() => {
    router.push(ROUTES.MY.EDIT);
  }, [router]);

  return (
    <header className={s.hero}>
      <HeroBackground />
      <div className={s.profileBlock}>
        <ProfileAvatar src={profileImageUrl} alt={`${userName} 프로필`} />
        <div className={s.nameRow}>
          <p className={clsx(typo.subtitle.semibold, color["grayscale-900"])}>
            {userName}
          </p>
          <button
            type="button"
            className={s.editButton}
            aria-label="프로필 수정"
            onClick={goEditProfile}
          >
            <Icon name="wrong-edit" color="grayscale-500" size={1.6} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default MyPageHero;
