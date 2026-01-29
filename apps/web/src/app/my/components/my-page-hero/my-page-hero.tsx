import clsx from "clsx";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import * as s from "@/app/my/components/my-page-hero/my-page-hero.css";
import HeroBackground from "@/app/my/components/hero-background/hero-background";
import ProfileAvatar from "@/app/my/components/profile-avatar/profile-avatar";
import Icon from "@/shared/components/icon/icon";

type MyPageHeroProps = {
  userName: string;
  profileImageUrl?: string | null;
  onEditProfile?: () => void;
};

const MyPageHero = ({
  userName,
  profileImageUrl = null,
  onEditProfile,
}: MyPageHeroProps) => {
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
            onClick={onEditProfile}
          >
            <Icon name="wrong-edit" size={1.6} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default MyPageHero;
