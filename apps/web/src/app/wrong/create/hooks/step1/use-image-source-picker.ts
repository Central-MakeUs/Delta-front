"use client";

import { useRef } from "react";
import type { ChangeEvent } from "react";

export type ImagePickSource = "camera" | "album";

type Params = {
  disabled?: boolean;
  onSelect?: (file: File, source: ImagePickSource) => void;
};

const isImageFile = (file: File) => file.type.startsWith("image/");

export const useImageSourcePicker = ({
  disabled = false,
  onSelect,
}: Params) => {
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const albumInputRef = useRef<HTMLInputElement | null>(null);

  const openInput = (ref: React.RefObject<HTMLInputElement | null>) => {
    const el = ref.current;
    if (!el) return;
    el.value = "";
    el.click();
  };

  const openCameraFallback = () => {
    openInput(cameraInputRef);
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
    openInput(albumInputRef);
  };

  const handlePick =
    (source: ImagePickSource) => (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!isImageFile(file)) {
        e.target.value = "";
        return;
      }

      onSelect?.(file, source);
      e.target.value = "";
    };

  return {
    cameraInputRef,
    albumInputRef,
    openCamera,
    openAlbum,
    handleCameraChange: handlePick("camera"),
    handleAlbumChange: handlePick("album"),
  };
};
