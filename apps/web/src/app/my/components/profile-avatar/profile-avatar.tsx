import Icon from "@/shared/components/icon/icon";
import * as s from "./profile-avatar.css";

type ProfileAvatarProps = {
  src?: string | null;
  alt: string;
};

export const ProfileAvatar = ({ src, alt }: ProfileAvatarProps) => {
  const hasImage = typeof src === "string" && src.length > 0;

  return (
    <div className={s.avatar}>
      {hasImage ? (
        <img className={s.image} src={src} alt={alt} />
      ) : (
        <div className={s.fallback} aria-label={alt}>
          <Icon name="default-profile" size={9.2} />
        </div>
      )}
    </div>
  );
};
