"use client";

import Image from "next/image";
import { useState } from "react";
import Icon from "@/shared/components/icon/icon";
import * as s from "@/app/my/components/profile-avatar/profile-avatar.css";

type ProfileAvatarProps = {
  src?: string | null;
  alt: string;
};

type LoadState = {
  src: string | null;
  loaded: boolean;
  failed: boolean;
};

const isPresignedUrl = (v: string) => v.includes("X-Amz-");

const normalizeSrc = (src?: string | null) => {
  const v = typeof src === "string" ? src.trim() : "";
  return v.length > 0 ? v : null;
};

const ProfileAvatar = ({ src, alt }: ProfileAvatarProps) => {
  const imageSrc = normalizeSrc(src);

  const [state, setState] = useState<LoadState>({
    src: null,
    loaded: false,
    failed: false,
  });

  const current: LoadState =
    state.src === imageSrc
      ? state
      : { src: imageSrc, loaded: false, failed: false };

  const showImage = imageSrc !== null && current.loaded && !current.failed;

  const mark = (loaded: boolean) => {
    if (!imageSrc) return;
    setState({ src: imageSrc, loaded, failed: !loaded });
  };

  return (
    <div className={s.avatar}>
      {imageSrc ? (
        <div className={showImage ? s.imageWrap : s.imageWrapHidden}>
          <Image
            key={imageSrc}
            className={s.image}
            src={imageSrc}
            alt={showImage ? alt : ""}
            aria-hidden={!showImage}
            width={92}
            height={92}
            sizes="92px"
            unoptimized={isPresignedUrl(imageSrc)}
            onLoad={() => mark(true)}
            onError={() => mark(false)}
          />
        </div>
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
