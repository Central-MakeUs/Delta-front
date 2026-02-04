"use client";

import { useState, useCallback } from "react";

export type LoginInfoFormData = {
  nickname: string;
  birthDate: string;
  profileImage: File | null;
};

const INITIAL_FORM_DATA: LoginInfoFormData = {
  nickname: "",
  birthDate: "",
  profileImage: null,
};

export const useLoginInfoForm = () => {
  const [formData, setFormData] = useState<LoginInfoFormData>(INITIAL_FORM_DATA);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isTermsSheetOpen, setIsTermsSheetOpen] = useState(false);

  const updateField = useCallback(<K extends keyof LoginInfoFormData>(
    field: K,
    value: LoginInfoFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const openTermsSheet = useCallback(() => setIsTermsSheetOpen(true), []);
  const closeTermsSheet = useCallback(() => setIsTermsSheetOpen(false), []);
  const agreeFromTermsSheet = useCallback(() => setIsAgreed(true), []);

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
