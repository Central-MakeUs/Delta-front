"use client";

import Image from "next/image";
import * as s from "./tutor-card.css";

const TutorCard = () => {
  return (
    <div className={s.root}>
      <div className={s.artwork}>
        <div className={s.galleryWrap}>
          <Image
            src="/pro/03-gallery.svg"
            alt=""
            fill
            priority
            sizes="(max-width: 430px) 77px, 77px"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className={s.pencilWrap}>
          <Image
            src="/pro/03-pencil.svg"
            alt=""
            fill
            priority
            sizes="(max-width: 430px) 82px, 82px"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
