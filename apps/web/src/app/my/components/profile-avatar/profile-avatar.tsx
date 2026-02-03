import Image from "next/image";
import { useState } from "react";
import Icon from "@/shared/components/icon/icon";
import * as s from "@/app/my/components/profile-avatar/profile-avatar.css";

type ProfileAvatarProps = {
  src?: string | null;
  alt: string;
};

const ProfileAvatar = ({ src, alt }: ProfileAvatarProps) => {
  const imageSrc =
    typeof src === "string" && src.trim().length > 0 ? src.trim() : null;

  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const showImage =
    imageSrc !== null && loadedSrc === imageSrc && failedSrc !== imageSrc;

  return (
    <div className={s.avatar}>
      {imageSrc ? (
        <Image
          key={imageSrc}
          className={showImage ? s.image : s.imageHidden}
          src={imageSrc}
          alt={alt}
          width={92}
          height={92}
          sizes="92px"
          onLoadingComplete={() => setLoadedSrc(imageSrc)}
          onError={() => setFailedSrc(imageSrc)}
        />
      ) : null}

      {!showImage ? (
        <div className={s.fallback} aria-label={alt}>
          <Icon name="default-profile" size={9.2} />
        </div>
      ) : null}
    </div>
  );
};

export default ProfileAvatar;
