"use client";

import { useRef } from "react";
import ActionCard from "@/shared/components/action-card/action-card";
import * as s from "@/app/wrong/create/create.css";

type ImagePickSource = "camera" | "album";

type Step1Props = {
  onNext: () => void;
  onSelectImage?: (file: File, source: ImagePickSource) => void;
  disabled?: boolean;
};

const Step1 = ({ onNext, onSelectImage, disabled = false }: Step1Props) => {
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const albumInputRef = useRef<HTMLInputElement | null>(null);

  const openCameraFallback = () => {
    const el = cameraInputRef.current;
    if (!el) return;
    el.value = "";
    el.click();
  };

  const openCamera = async () => {
    if (disabled) return;

    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      openCameraFallback();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });

      stream.getTracks().forEach((t) => t.stop());
      openCameraFallback();
    } catch {
      openCameraFallback();
    }
  };

  const openAlbum = () => {
    if (disabled) return;
    const el = albumInputRef.current;
    if (!el) return;
    el.value = "";
    el.click();
  };

  const handlePick =
    (source: ImagePickSource) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        e.target.value = "";
        return;
      }

      onSelectImage?.(file, source);
      onNext();
      e.target.value = "";
    };

  return (
    <div className={s.cardSection}>
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handlePick("camera")}
        style={{ display: "none" }}
        disabled={disabled}
      />

      <input
        ref={albumInputRef}
        type="file"
        accept="image/*"
        onChange={handlePick("album")}
        style={{ display: "none" }}
        disabled={disabled}
      />

      <ActionCard
        title="사진 촬영"
        iconName="graphic-camera"
        onClick={openCamera}
      />
      <ActionCard
        title="앨범에서 선택"
        iconName="graphic-gallery"
        onClick={openAlbum}
      />
    </div>
  );
};

export default Step1;
