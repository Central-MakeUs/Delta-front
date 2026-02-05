"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { bgColor } from "@/shared/styles/color.css";
import * as s from "@/app/my/components/my-page-view/my-page-view.css";
import MyPageHero from "@/app/my/components/my-page-hero/my-page-hero";
import MyPageCard from "@/app/my/components/my-page-card/my-page-card";
import MenuItem from "@/app/my/components/menu-item/menu-item";
import Modal from "@/shared/components/modal/modal/modal";
import Icon from "@/shared/components/icon/icon";
import { useLogoutMutation } from "@/shared/apis/auth/hooks/use-logout-mutation";
import { useWithdrawalMutation } from "@/shared/apis/user/hooks/use-withdrawal-mutation";
import { ROUTES } from "@/shared/constants/routes";
import BottomSheetWithdraw from "@/shared/components/bottom-sheet/bottom-sheet-withdraw/bottom-sheet-withdraw";
import { toastError, toastSuccess } from "@/shared/components/toast/toast";

type MyPageViewProps = {
  userName: string;
  linkedEmail: string;
  profileImageUrl?: string | null;
  provider: string;
  onBack?: () => void;
  onLogout?: () => void;
  onWithdraw?: () => void;
};

const MyPageView = ({
  userName,
  linkedEmail,
  profileImageUrl = null,
  provider,
  onLogout,
  onWithdraw,
}: MyPageViewProps) => {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();
  const withdrawalMutation = useWithdrawalMutation();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isWithdrawSheetOpen, setIsWithdrawSheetOpen] = useState(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  const openWithdrawModal = () => setIsWithdrawModalOpen(true);
  const closeWithdrawModal = () => setIsWithdrawModalOpen(false);
  const openWithdrawSheet = () => setIsWithdrawSheetOpen(true);
  const closeWithdrawSheet = () => setIsWithdrawSheetOpen(false);

  const handleLogoutClick = () => {
    openLogoutModal();
  };

  const handleLogoutConfirm = () => {
    if (logoutMutation.isPending) return;

    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toastSuccess("로그아웃되었습니다.");
        router.replace(ROUTES.AUTH.LOGIN);
      },
      onSettled: () => {
        closeLogoutModal();
        onLogout?.();
      },
    });
  };

  const handleWithdrawClick = () => {
    openWithdrawModal();
  };

  const handleWithdrawModalConfirm = () => {
    closeWithdrawModal();
    openWithdrawSheet();
  };

  const handleWithdrawSheetConfirm = () => {
    if (withdrawalMutation.isPending) return;

    withdrawalMutation.mutate(undefined, {
      onSuccess: () => {
        toastSuccess("회원 탈퇴가 완료되었어요.");
        if (onWithdraw) onWithdraw();
        else router.replace(ROUTES.AUTH.LOGIN);
      },
      onError: () => {
        toastError("회원 탈퇴에 실패했어요. 잠시 후 다시 시도해 주세요.");
      },
    });
  };

  return (
    <>
      <div className={clsx(bgColor["grayscale-0"], s.page)}>
        <MyPageHero userName={userName} profileImageUrl={profileImageUrl} />

        <main className={clsx(bgColor["grayscale-0"], s.content)}>
          <div className={s.stack}>
            <MyPageCard>
              <div className={s.linkedAccountRow}>
                <div className={s.linkedAccountLabel}>연동된 계정</div>

                <div className={s.linkedAccountValue}>
                  {provider === "KAKAO" && <Icon name="kakao" size={2} />}
                  {provider === "APPLE" && <Icon name="apple" size={2} />}
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
        onConfirm={handleWithdrawModalConfirm}
      />

      <BottomSheetWithdraw
        isOpen={isWithdrawSheetOpen}
        onClose={closeWithdrawSheet}
        title="정말 세모를 탈퇴하실건가요?"
        description="탈퇴 시 계정 및 이용 기록은 모두 삭제되며, 삭제된 데이터는 복구가 불가능해요.<br/>또한 탈퇴 후 동일 계정의 재가입 시 제한을 받을 수 있어요.<br/><br/>탈퇴를 진행할까요?"
        confirmLabel="네, 탈퇴할래요"
        cancelLabel="더 써볼래요"
        onConfirm={handleWithdrawSheetConfirm}
        disabled={withdrawalMutation.isPending}
      />
    </>
  );
};

export default MyPageView;
