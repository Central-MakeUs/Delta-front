import clsx from "clsx";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import * as s from "@/app/my/components/my-page-hero/my-page-hero.css";
import HeroBackground from "@/app/my/components/hero-background/hero-background";
import ProfileAvatar from "@/app/my/components/profile-avatar/profile-avatar";

type MyPageHeroProps = {
  userName: string;
  profileImageUrl?: string | null;
};

const MyPageHero = ({ userName, profileImageUrl = null }: MyPageHeroProps) => {
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

export default MyPageHero;
