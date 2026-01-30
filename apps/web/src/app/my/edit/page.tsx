"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import * as s from "./edit.css";
import { ROUTES } from "@/shared/constants/routes";
import MyProfileSection from "@/app/my/edit/components/my-profile-section";
import TextField from "@/shared/components/text-field/text-field";
import { Button } from "@/shared/components/button/button/button";
import { useMyProfileQuery } from "@/shared/apis/user/hooks/use-my-profile-query";
import { useMyProfileImageQuery } from "@/shared/apis/profile-image/hooks/use-my-profile-image-query";
import { useUploadMyProfileImageMutation } from "@/shared/apis/profile-image/hooks/use-upload-my-profile-image-mutation";
import { useUpdateMyProfileMutation } from "@/shared/apis/user/hooks/use-update-my-name-mutation";

export type LoginInfoFormData = {
  name: string;
  profileImage: File | null;
};

type ProfileImageShape = {
  viewUrl?: unknown;
  imageUrl?: unknown;
  url?: unknown;
};

const readImageUrl = (v: unknown): string | null => {
  if (!v || typeof v !== "object") return null;
  const o = v as ProfileImageShape;
  const candidate = o.viewUrl ?? o.imageUrl ?? o.url;
  return typeof candidate === "string" ? candidate : null;
};

const MyEdit = () => {
  const router = useRouter();

  const { data: profile, isLoading: isProfileLoading } = useMyProfileQuery();
  const { data: profileImage } = useMyProfileImageQuery();

  const uploadProfileImage = useUploadMyProfileImageMutation();
  const updateMyProfile = useUpdateMyProfileMutation();

  const [formData, setFormData] = useState<LoginInfoFormData>({
    name: "",
    profileImage: null,
  });

  const name = formData.name;

  const profileImageUrl = useMemo(
    () => readImageUrl(profileImage),
    [profileImage]
  );

  const hydratedName = useMemo(() => {
    if (!profile) return false;
    return name.trim().length > 0;
  }, [profile, name]);

  const resolvedName = useMemo(() => {
    if (!profile) return name;
    if (hydratedName) return name;
    return profile.nickname ?? "";
  }, [profile, hydratedName, name]);

  const onNameChange = useCallback((v: string) => {
    setFormData((prev) => ({ ...prev, name: v }));
  }, []);

  const onProfileImageChange = useCallback((file: File | null) => {
    setFormData((prev) => ({ ...prev, profileImage: file }));
  }, []);

  const handleComplete = useCallback(async () => {
    if (!profile) return;

    const nextName = resolvedName.trim();
    const nameChanged = (profile.nickname ?? "") !== nextName;
    const imageChanged = !!formData.profileImage;

    if (!nameChanged && !imageChanged) {
      router.push(ROUTES.MY.ROOT);
      return;
    }

    if (nameChanged) {
      await updateMyProfile.mutateAsync({ nickname: nextName });
    }

    if (imageChanged && formData.profileImage) {
      await uploadProfileImage.mutateAsync(formData.profileImage);
    }

    router.push(ROUTES.MY.ROOT);
  }, [
    profile,
    resolvedName,
    formData.profileImage,
    updateMyProfile,
    uploadProfileImage,
    router,
  ]);

  if (isProfileLoading) return null;
  if (!profile) return null;

  return (
    <main className={s.page}>
      <div className={s.contentWrapper}>
        <MyProfileSection
          profileImage={formData.profileImage}
          profileImageUrl={profileImageUrl}
          onProfileImageChange={onProfileImageChange}
        />

        <div className={s.fieldGroup}>
          <label className={s.fieldLabel}>이름</label>
          <TextField
            variant="plain"
            placeholder="이름을 입력해주세요"
            value={resolvedName}
            onChange={(e) => onNameChange(e.target.value)}
            fullWidth
            size="body2"
            rows={1}
          />
        </div>
      </div>

      <div className={s.buttonWrapper}>
        <Button
          label="수정 완료"
          fullWidth
          tone="dark"
          onClick={handleComplete}
        />
      </div>
    </main>
  );
};

export default MyEdit;
