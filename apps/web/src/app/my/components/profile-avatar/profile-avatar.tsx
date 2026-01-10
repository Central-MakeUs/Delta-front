import Image from "next/image";
import Icon from "@/shared/components/icon/icon";
import * as s from "@/app/my/components/profile-avatar/profile-avatar.css";

type ProfileAvatarProps = {
  src?: string | null;
  alt: string;
};

const ProfileAvatar = ({ src, alt }: ProfileAvatarProps) => {
  const hasImage = typeof src === "string" && src.length > 0;

  return (
    <div className={s.avatar}>
      {hasImage ? (
        <Image
          className={s.image}
          src={src}
          alt={alt}
          width={92}
          height={92}
          sizes="92px"
        />
      ) : (
        <div className={s.fallback} aria-label={alt}>
          <Icon name="default-profile" size={9.2} />
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
