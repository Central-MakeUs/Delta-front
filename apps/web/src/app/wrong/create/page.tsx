"use client";

import ActionCard from "@/shared/components/action-card/action-card";
import * as s from "./create.css";

const WrongCreatePage = () => {
  return (
    <div className={s.page}>
      <div className={s.titleSection}>
        <h1 className={s.title}>오답 등록</h1>
        <span className={s.subTtitle}>
          사진 촬영 또는 갤러리에서 문제를 선택해주세요.
        </span>
      </div>
      <div className={s.cardSection}>
        <ActionCard
          title="사진 촬영"
          iconName="graphic-camera"
          onClick={() => {
            // 카메라 플로우로 이동
          }}
        />

        <ActionCard
          title="앨범에서 선택"
          iconName="graphic-gallery"
          onClick={() => {
            // 앨범 선택 모달로 이동
          }}
        />
      </div>
    </div>
  );
};

export default WrongCreatePage;
