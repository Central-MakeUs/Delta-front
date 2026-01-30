"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios, { type AxiosError } from "axios";
import MyPageView from "@/app/my/components/my-page-view/my-page-view";
import { useMyProfileQuery } from "@/shared/apis/user/hooks/use-my-profile-query";
import { useMyProfileImageQuery } from "@/shared/apis/profile-image/hooks/use-my-profile-image-query";
import { ROUTES } from "@/shared/constants/routes";

type ErrorResponseShape = {
  status?: number;
  code?: string;
  message?: string;
  data?: unknown;
};

const getHttpStatus = (err: unknown): number | undefined => {
  if (!axios.isAxiosError(err)) return undefined;
  const axErr = err as AxiosError<ErrorResponseShape>;
  return axErr.response?.status;
};

type ProfileImageShape = {
  viewUrl?: unknown;
  imageUrl?: unknown;
  url?: unknown;
};

const readProfileImageUrl = (v: unknown): string | null => {
  if (!v || typeof v !== "object") return null;
  const o = v as ProfileImageShape;

  const candidate = o.viewUrl ?? o.imageUrl ?? o.url;
  return typeof candidate === "string" ? candidate : null;
};

const MyPage = () => {
  const router = useRouter();

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useMyProfileQuery();

  const {
    data: profileImage,
    isError: isProfileImageError,
    error: profileImageError,
  } = useMyProfileImageQuery();

  useEffect(() => {
    if (!isProfileError && !isProfileImageError) return;

    const status =
      getHttpStatus(profileError) ?? getHttpStatus(profileImageError);

    if (status === 401) router.replace(ROUTES.AUTH.LOGIN);
  }, [
    isProfileError,
    isProfileImageError,
    profileError,
    profileImageError,
    router,
  ]);

  const profileImageUrl = useMemo(
    () => readProfileImageUrl(profileImage),
    [profileImage]
  );

  if (isProfileLoading) return null;
  if (!profile) return null;

  return (
    <MyPageView
      userName={profile.nickname ?? ""}
      linkedEmail={profile.email ?? ""}
      profileImageUrl={profileImageUrl}
      onLogout={() => router.replace(ROUTES.AUTH.LOGIN)}
      onWithdraw={() => router.replace(ROUTES.AUTH.LOGIN)}
    />
  );
};

export default MyPage;
