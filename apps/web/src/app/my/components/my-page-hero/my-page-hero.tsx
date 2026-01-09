"use client";

import clsx from "clsx";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import * as s from "./my-page-hero.css";
import HeroBackground from "../hero-background/hero-background";
import { ProfileAvatar } from "../profile-avatar/profile-avatar";

type MyPageHeroProps = {
  title: string;
  userName: string;
  profileImageUrl?: string | null;
  onBack: () => void;
};

export const MyPageHero = ({
  userName,
  profileImageUrl = null,
}: MyPageHeroProps) => {
  return (
    <header className={s.hero}>
      <HeroBackground />
      <div className={s.profileBlock}>
        <ProfileAvatar src={profileImageUrl} alt={`${userName} 프로필`} />
        <p className={clsx(typo.subtitle.semibold, color["grayscale-900"])}>
          {userName}
        </p>
      </div>
    </header>
  );
};
