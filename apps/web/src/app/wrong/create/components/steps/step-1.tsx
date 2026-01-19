"use client";

import ActionCard from "@/shared/components/action-card/action-card";
import {
  useImageSourcePicker,
  type ImagePickSource,
} from "@/app/wrong/create/hooks/use-image-source-picker";
import * as s from "@/app/wrong/create/create.css";

type Step1Props = {
  onNext: () => void;
  onSelectImage?: (file: File, source: ImagePickSource) => void;
  disabled?: boolean;
};

const Step1 = ({ onNext, onSelectImage, disabled = false }: Step1Props) => {
  const {
    cameraInputRef,
    albumInputRef,
    openCamera,
    openAlbum,
    handleCameraChange,
    handleAlbumChange,
  } = useImageSourcePicker({
    disabled,
    onSelect: (file, source) => {
      onSelectImage?.(file, source);
      onNext();
    },
  });

  return (
    <div className={s.cardSection}>
      <input
        className={s.inputDisplay}
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraChange}
        disabled={disabled}
      />

      <input
        className={s.inputDisplay}
        ref={albumInputRef}
        type="file"
        accept="image/*"
        onChange={handleAlbumChange}
        disabled={disabled}
      />

      <ActionCard
        title="사진 촬영"
        iconName="graphic-camera"
        onClick={openCamera}
        disabled={disabled}
      />
      <ActionCard
        title="앨범에서 선택"
        iconName="graphic-gallery"
        onClick={openAlbum}
        disabled={disabled}
      />
    </div>
  );
};

export default Step1;
