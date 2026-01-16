"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { type AxiosError } from "axios";
import MyPageView from "@/app/my/components/my-page-view/my-page-view";
import { useMyProfileQuery } from "@/shared/apis/user/hooks/use-my-profile-query";
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

const MyPage = () => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useMyProfileQuery();

  useEffect(() => {
    if (!isError) return;

    const status = getHttpStatus(error);
    if (status === 401) router.replace(ROUTES.AUTH.LOGIN);
  }, [isError, error, router]);

  if (isLoading) return null;
  if (!data) return null;

  return (
    <MyPageView
      userName={data.nickname ?? ""}
      linkedEmail={data.email ?? ""}
      profileImageUrl={null}
      onLogout={() => router.replace(ROUTES.AUTH.LOGIN)}
      onWithdraw={() => router.replace(ROUTES.AUTH.LOGIN)}
    />
  );
};

export default MyPage;
