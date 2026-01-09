"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { bgColor } from "@/shared/styles/color.css";
import * as s from "./my-page-view.css";
import { MyPageHero } from "../my-page-hero/my-page-hero";
import { MyPageCard } from "../my-page-card/my-page-card";
import MenuItem from "../menu-item/menu-item";

type MyPageViewProps = {
  userName: string;
  linkedEmail: string;
  profileImageUrl?: string | null;

  onBack?: () => void;
  onLogout?: () => void;
  onWithdraw?: () => void;
};

const MyPageView = ({
  userName,
  linkedEmail,
  profileImageUrl = null,
  onBack,
  onLogout,
  onWithdraw,
}: MyPageViewProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) return onBack();
    router.back();
  };

  const handleLogout = () => {
    if (onLogout) return onLogout();
    // TODO: 실제 로그아웃 로직 연결
    console.log("logout");
  };

  const handleWithdraw = () => {
    if (onWithdraw) return onWithdraw();
    // TODO: 실제 탈퇴 로직 연결
    console.log("withdraw");
  };

  return (
    <div className={clsx(bgColor["grayscale-0"], s.page)}>
      <MyPageHero
        title="내 정보"
        userName={userName}
        profileImageUrl={profileImageUrl}
        onBack={handleBack}
      />

      <main className={clsx(bgColor["grayscale-0"], s.content)}>
        <div className={s.stack}>
          <MyPageCard>
            <div className={s.linkedAccountRow}>
              <div className={s.linkedAccountLabel}>연동된 계정</div>

              <div className={s.linkedAccountValue}>
                <div className={s.kakaoIcon} aria-hidden />
                <span className={s.emailText}>{linkedEmail}</span>
              </div>
            </div>
          </MyPageCard>

          <MyPageCard>
            <div className={s.menuList}>
              <MenuItem
                iconName="log-out"
                label="로그아웃"
                onClick={handleLogout}
              />
              <div className={s.divider} />
              <MenuItem
                iconName="multiple"
                label="회원 탈퇴"
                onClick={handleWithdraw}
              />
            </div>
          </MyPageCard>
        </div>
      </main>
    </div>
  );
};

export default MyPageView;
