"use client";

import { useCallback, useRef, useState } from "react";
import ActionCard from "@/shared/components/action-card/action-card";
import {
  useImageSourcePicker,
  type ImagePickSource,
} from "@/app/wrong/create/hooks/use-image-source-picker";
import * as s from "@/app/wrong/create/create.css";
import { useCreateProblemScanMutation } from "@/shared/apis/problem-scan/hooks/use-create-problem-scan-mutation";
import type { ProblemScanCreateResponse } from "@/shared/apis/problem-scan/problem-scan-types";

const MIN_UPLOAD_LOADING_MS = 3000;

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);
const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp", "heic", "heif"]);

type Step1Props = {
  onNext: (res: ProblemScanCreateResponse) => void;
  onSelectImage?: (file: File, source: ImagePickSource) => void;
  disabled?: boolean;
};

const formatBytes = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(mb >= 10 ? 0 : 1)}MB`;
};

const validateImageFile = (file: File) => {
  if (file.size <= 0) {
    return "파일을 읽을 수 없어요. 다른 이미지를 선택해 주세요.";
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return `이미지 용량이 너무 커요. ${formatBytes(
      MAX_IMAGE_BYTES
    )} 이하로 올려 주세요.`;
  }

  const mime = (file.type ?? "").toLowerCase();
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

  const mimeOk = mime ? ALLOWED_MIME_TYPES.has(mime) : true; // 일부 환경 fallback
  const extOk = ALLOWED_EXT.has(ext);

  if ((mime && !mimeOk) || (!mime && !extOk)) {
    return "지원하지 않는 이미지 형식이에요. JPG/PNG/WebP/HEIC만 업로드할 수 있어요.";
  }

  return null;
};

const Step1 = ({ onNext, onSelectImage, disabled = false }: Step1Props) => {
  const createScanMutation = useCreateProblemScanMutation();

  const [holdLoading, setHoldLoading] = useState(false);
  const startedAtRef = useRef<number | null>(null);

  const isUploading = createScanMutation.isPending || holdLoading || disabled;
  const isBusy = disabled || createScanMutation.isPending || holdLoading;

  const handlePicked = useCallback(
    (file: File, source: ImagePickSource) => {
      if (isBusy) return;

      const error = validateImageFile(file);
      if (error) {
        window.alert(error);
        return;
      }

      startedAtRef.current = Date.now();
      setHoldLoading(true);

      createScanMutation.mutate(
        { file },
        {
          onSuccess: (res) => {
            const startedAt = startedAtRef.current ?? Date.now();
            const elapsed = Date.now() - startedAt;
            const remain = Math.max(MIN_UPLOAD_LOADING_MS - elapsed, 0);

            window.setTimeout(() => {
              setHoldLoading(false);
              onSelectImage?.(file, source);
              onNext(res);
            }, remain);
          },
          onError: () => {
            setHoldLoading(false);
            window.alert("문제 스캔 업로드에 실패했어요. 다시 시도해 주세요.");
          },
        }
      );
    },
    [createScanMutation, isBusy, onNext, onSelectImage]
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
        title={isUploading ? "업로드 중..." : "사진 촬영"}
        iconName="graphic-camera"
        onClick={openCamera}
        disabled={isBusy}
      />
      <ActionCard
        title={isUploading ? "업로드 중..." : "앨범에서 선택"}
        iconName="graphic-gallery"
        onClick={openAlbum}
        disabled={isBusy}
      />
    </div>
  );
};

export default Step1;
