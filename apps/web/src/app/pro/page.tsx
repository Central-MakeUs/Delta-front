"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as s from "@/app/pro/pro.css";
import { PRO_FEATURES } from "@/app/pro/constants/pro-features";
import { ProHero } from "@/app/pro/components/pro-hero/pro-hero";
import { ProFeatureCard } from "@/app/pro/components/pro-feature-card/pro-feature-card";
import BottomCta from "@/app/pro/components/bottom-cta/bottom-cta";
import CompleteModal from "@/shared/components/modal/complete-modal/complete-modal";

const ProPage = () => {
  const router = useRouter();

  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsCompleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCompleteModalOpen(false);
  };

  return (
    <div className={s.page}>
      <ProHero onBack={() => router.back()} />

      <main className={s.main}>
        <h2 className={s.title}>
          세모로 공부하면,
          <br />
          성적이 달라지는 이유
        </h2>

        <section className={s.list}>
          {PRO_FEATURES.map((item, idx) => (
            <ProFeatureCard key={item.code} item={item} index={idx} />
          ))}
        </section>
      </main>

      <BottomCta label="결제하러 가기" onClick={handleConfirm} />

      <CompleteModal
        isOpen={isCompleteModalOpen}
        onClose={handleCloseModal}
        title="아직 준비 중인 기능이에요."
        description="더 나은 플랜을 준비 중이에요. 잠시만 기다려주세요."
        cancelLabel="확인"
        actions="cancelOnly"
        iconName="pro-modal"
        descriptionClassName={s.proModalDescription}
      />
    </div>
  );
};

export default ProPage;
