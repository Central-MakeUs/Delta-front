"use client";

import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { bgColor } from "@/shared/styles/color.css";
import * as s from "@/app/my/components/my-page-view/my-page-view.css";
import MyPageHero from "@/app/my/components/my-page-hero/my-page-hero";
import MyPageCard from "@/app/my/components/my-page-card/my-page-card";
import MenuItem from "@/app/my/components/menu-item/menu-item";
import Modal from "@/shared/components/modal/modal/modal";
import Icon from "@/shared/components/icon/icon";

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

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const openWithdrawModal = () => setIsWithdrawModalOpen(true);
  const closeWithdrawModal = () => setIsWithdrawModalOpen(false);

  const handleBack = () => {
    if (onBack) return onBack();
    router.back();
  };

  const handleLogoutClick = () => {
    openLogoutModal();
  };

  const handleLogoutConfirm = () => {
    if (onLogout) onLogout();
    closeLogoutModal();
  };

  const handleWithdrawClick = () => {
    openWithdrawModal();
  };

  const handleWithdrawConfirm = () => {
    if (onWithdraw) onWithdraw();
    closeWithdrawModal();
  };

  return (
    <>
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
                  <Icon name="kakao" size={2} />
                  <span className={s.emailText}>{linkedEmail}</span>
                </div>
              </div>
            </MyPageCard>

            <MyPageCard>
              <div className={s.menuList}>
                <MenuItem
                  iconName="log-out"
                  label="로그아웃"
                  onClick={handleLogoutClick}
                />

                <MenuItem
                  iconName="multiple"
                  label="회원 탈퇴"
                  onClick={handleWithdrawClick}
                />
              </div>
            </MyPageCard>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        title="로그아웃"
        description="정말 로그아웃할까요?"
        cancelLabel="취소"
        confirmLabel="로그아웃"
        onCancel={closeLogoutModal}
        onConfirm={handleLogoutConfirm}
      />

      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={closeWithdrawModal}
        title="회원 탈퇴"
        description="정말 회원 탈퇴를 할까요?"
        cancelLabel="취소"
        confirmLabel="회원 탈퇴"
        onCancel={closeWithdrawModal}
        onConfirm={handleWithdrawConfirm}
      />
    </>
  );
};

export default MyPageView;
