"use client";

import { useCallback } from "react";
import ActionCard from "@/shared/components/action-card/action-card";
import {
  useImageSourcePicker,
  type ImagePickSource,
} from "@/app/wrong/create/hooks/step1/use-image-source-picker";
import * as s from "@/app/wrong/create/create.css";
import { useCreateProblemScanMutation } from "@/shared/apis/problem-scan/hooks/use-create-problem-scan-mutation";
import type { ProblemScanCreateResponse } from "@/shared/apis/problem-scan/problem-scan-types";
import { validateImageFile } from "@/app/wrong/create/utils/image-file-guard";
import { useMinLoading } from "@/app/wrong/create/utils/use-min-loading";
import { toastError } from "@/shared/components/toast/toast";

const MIN_UPLOAD_LOADING_MS = 1000;

type Step1Props = {
  onNext: (res: ProblemScanCreateResponse) => void;
  onSelectImage?: (file: File, source: ImagePickSource) => void;
  disabled?: boolean;
};

const Step1 = ({ onNext, onSelectImage, disabled = false }: Step1Props) => {
  const createScanMutation = useCreateProblemScanMutation();
  const minLoading = useMinLoading(MIN_UPLOAD_LOADING_MS);

  const isUploading = createScanMutation.isPending || minLoading.isHolding;
  const isBusy = disabled || isUploading;

  const handlePicked = useCallback(
    (file: File, source: ImagePickSource) => {
      if (isBusy) return;

      const error = validateImageFile(file);
      if (error) {
        window.alert(error);
        return;
      }

      minLoading.start();

      createScanMutation.mutate(
        { file },
        {
          onSuccess: (res) => {
            minLoading.end(() => {
              onSelectImage?.(file, source);
              onNext(res);
            });
          },
          onError: () => {
            minLoading.cancel();
            toastError(
              "문제 스캔 업로드에 실패했어요. 다시 시도해 주세요.",
              6.5
            );
          },
        }
      );
    },
    [createScanMutation, isBusy, minLoading, onNext, onSelectImage]
  );

  const {
    cameraInputRef,
    albumInputRef,
    openCamera,
    openAlbum,
    handleCameraChange,
    handleAlbumChange,
  } = useImageSourcePicker({
    disabled: isBusy,
    onSelect: handlePicked,
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
        disabled={isBusy}
      />

      <input
        className={s.inputDisplay}
        ref={albumInputRef}
        type="file"
        accept="image/*"
        onChange={handleAlbumChange}
        disabled={isBusy}
      />

      <ActionCard
        title="사진 촬영"
        iconName="graphic-camera"
        onClick={openCamera}
        disabled={isBusy}
      />
      <ActionCard
        title="앨범에서 선택"
        iconName="graphic-gallery"
        onClick={openAlbum}
        disabled={isBusy}
      />
    </div>
  );
};

export default Step1;
