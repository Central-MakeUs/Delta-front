"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import * as s from "@/app/pro/pro.css";
import { PRO_FEATURES } from "@/app/pro/constants/pro-features";
import { ProHero } from "@/app/pro/components/pro-hero/pro-hero";
import { ProFeatureCard } from "@/app/pro/components/pro-feature-card/pro-feature-card";
import BottomCta from "@/app/pro/components/bottom-cta/bottom-cta";

const ProPage = () => {
  const router = useRouter();

  const onBack = useCallback(() => {
    router.back();
  }, [router]);

  const onPay = useCallback(() => {
    console.log("go pay");
  }, []);

  return (
    <div className={s.page}>
      <ProHero onBack={onBack} />

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

      <BottomCta label="결제하러가기" onClick={onPay} />
    </div>
  );
};

export default ProPage;
