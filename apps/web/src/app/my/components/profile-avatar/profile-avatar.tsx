import Image from "next/image";
import { useState } from "react";
import Icon from "@/shared/components/icon/icon";
import * as s from "@/app/my/components/profile-avatar/profile-avatar.css";

const isPresignedUrl = (v: string) =>
  v.includes("X-Amz-Algorithm=") || v.includes("X-Amz-Signature=");

const ProfileAvatar = ({ src, alt }: { src?: string | null; alt: string }) => {
  const imageSrc =
    typeof src === "string" && src.trim().length > 0 ? src.trim() : null;

  const [state, setState] = useState({
    src: null as string | null,
    loaded: false,
    failed: false,
  });

  const current =
    state.src === imageSrc
      ? state
      : { src: imageSrc, loaded: false, failed: false };

  const showImage = imageSrc !== null && current.loaded && !current.failed;

  return (
    <div className={s.avatar}>
      {imageSrc ? (
        <Image
          key={imageSrc}
          className={showImage ? s.image : s.imageHidden}
          src={imageSrc}
          alt={showImage ? alt : ""}
          aria-hidden={!showImage}
          width={92}
          height={92}
          sizes="92px"
          unoptimized={isPresignedUrl(imageSrc)}
          onLoadingComplete={() =>
            setState({ src: imageSrc, loaded: true, failed: false })
          }
          onError={() =>
            setState({ src: imageSrc, loaded: false, failed: true })
          }
        />
      ) : null}

      {!showImage ? (
        <div className={s.fallback} role="img" aria-label={alt}>
          <Icon name="default-profile" size={9.2} />
        </div>
      ) : null}
    </div>
  );
};

export default ProfileAvatar;
