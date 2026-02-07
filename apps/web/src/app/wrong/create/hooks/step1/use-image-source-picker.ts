"use client";

import { useRef, type ChangeEvent, type RefObject } from "react";

export type ImagePickSource = "camera" | "album";

type Params = {
  disabled?: boolean;
  onSelect?: (file: File, source: ImagePickSource) => void;
};

const isImageFile = (file: File) => file.type.startsWith("image/");

const resetAndClick = (ref: RefObject<HTMLInputElement | null>) => {
  const el = ref.current;
  if (!el) return;

  el.value = "";
  el.click();
};

export const useImageSourcePicker = ({
  disabled = false,
  onSelect,
}: Params) => {
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const albumInputRef = useRef<HTMLInputElement | null>(null);

  const openCamera = () => {
    if (disabled) return;
    resetAndClick(cameraInputRef);
  };

  const openAlbum = () => {
    if (disabled) return;
    resetAndClick(albumInputRef);
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
