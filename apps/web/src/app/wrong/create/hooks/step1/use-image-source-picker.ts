"use client";

import { useRef, type ChangeEvent, type RefObject } from "react";

export type ImagePickSource = "camera" | "album";

type Params = {
  disabled?: boolean;
  onSelect?: (files: File[], source: ImagePickSource) => void;
};

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
      const files = Array.from(e.target.files ?? []);
      if (files.length === 0) return;

      onSelect?.(files, source);
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
