"use client";

import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import Icon from "@/shared/components/icon/icon";
import ActionCard from "@/shared/components/action-card/action-card";
import * as modalStyles from "@/shared/components/modal/modal/modal.css";
import * as styles from "./profile-section.css";
import { Button } from "@/shared/components/button/button/button";
import { useImageSourcePicker } from "@/app/wrong/create/hooks/use-image-source-picker";
import Image from "next/image";

interface ProfileSectionProps {
  profileImage: File | null;
  onProfileImageChange: (file: File | null) => void;
}

const ProfileSection = ({
  profileImage,
  onProfileImageChange,
}: ProfileSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profileImageUrl = useMemo(() => {
    if (!profileImage) return null;
    return URL.createObjectURL(profileImage);
  }, [profileImage]);

  const {
    cameraInputRef,
    albumInputRef,
    openCamera,
    openAlbum,
    handleCameraChange,
    handleAlbumChange,
  } = useImageSourcePicker({
    onSelect: (file) => {
      onProfileImageChange(file);
      setIsModalOpen(false);
    },
  });

  useEffect(() => {
    return () => {
      if (profileImageUrl) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [profileImageUrl]);

  const handleCameraClick = () => {
    setIsModalOpen(true);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  return (
    <>
      <div className={styles.profileSection}>
        <div className={styles.profileImage}>
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt="프로필 사진"
              className={styles.profileImagePreview}
              width={92}
              height={92}
              unoptimized
            />
          ) : (
            <div className={styles.profileImagePlaceholder}>
              <Icon name="default-profile1" size={9.4} />
            </div>
          )}
          <button
            type="button"
            onClick={handleCameraClick}
            className={styles.cameraButton}
            aria-label="프로필 사진 변경"
          >
            <Icon name="camera" size={2} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <>
          <input
            className={styles.inputDisplay}
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleCameraChange}
          />

          <input
            className={styles.inputDisplay}
            ref={albumInputRef}
            type="file"
            accept="image/*"
            onChange={handleAlbumChange}
          />

          <div className={modalStyles.overlay} onClick={handleOverlayClick}>
            <div className={clsx(modalStyles.modal({ size: "md" }))}>
              <div className={styles.cardContainer}>
                <h2 className={modalStyles.title}>프로필 사진 선택</h2>
                <div className={styles.cardSection}>
                  <ActionCard
                    title="사진 촬영"
                    iconName="graphic-camera"
                    circleSizeRem={4.8}
                    iconSize={2.4}
                    size="36"
                    onClick={openCamera}
                  />
                  <ActionCard
                    title="앨범에서 선택"
                    iconName="graphic-gallery"
                    circleSizeRem={4.8}
                    iconSize={2.4}
                    size="36"
                    onClick={openAlbum}
                  />
                </div>
                <Button
                  fullWidth
                  onClick={handleClose}
                  tone="surface"
                  label="닫기"
                  size="48"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileSection;
