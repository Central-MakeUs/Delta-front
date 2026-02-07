"use client";

import { useCallback, useState } from "react";

export type LoginInfoFormData = {
  nickname: string;
  birthDate: string;
  profileImage: File | null;
};

type UseLoginInfoFormParams = {
  initialNickname?: string;
};

export const useLoginInfoForm = ({
  initialNickname,
}: UseLoginInfoFormParams = {}) => {
  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [isNicknameTouched, setIsNicknameTouched] = useState(false);

  const [isAgreed, setIsAgreed] = useState(false);
  const [isTermsSheetOpen, setIsTermsSheetOpen] = useState(false);

  const effectiveNickname = isNicknameTouched
    ? nickname
    : nickname.trim()
      ? nickname
      : (initialNickname ?? "").trim();

  const formData: LoginInfoFormData = {
    nickname: effectiveNickname,
    birthDate,
    profileImage,
  };

  const updateField = useCallback(
    <K extends keyof LoginInfoFormData>(
      key: K,
      value: LoginInfoFormData[K]
    ) => {
      if (key === "nickname") {
        if (!isNicknameTouched) setIsNicknameTouched(true);
        setNickname(value as string);
        return;
      }
      if (key === "birthDate") setBirthDate(value as string);
      else setProfileImage(value as File | null);
    },
    [isNicknameTouched]
  );

  const openTermsSheet = useCallback(() => setIsTermsSheetOpen(true), []);
  const closeTermsSheet = useCallback(() => setIsTermsSheetOpen(false), []);
  const agreeFromTermsSheet = useCallback(() => {
    setIsAgreed(true);
    setIsTermsSheetOpen(false);
  }, []);

  return {
    formData,
    isAgreed,
    isTermsSheetOpen,
    updateField,
    setIsAgreed,
    openTermsSheet,
    closeTermsSheet,
    agreeFromTermsSheet,
  };
};
