const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp", "heic", "heif"]);

const formatBytes = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(mb >= 10 ? 0 : 1)}MB`;
};

export const validateImageFile = (file: File) => {
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

  const mimeOk = mime ? ALLOWED_MIME_TYPES.has(mime) : true;
  const extOk = ALLOWED_EXT.has(ext);

  if ((mime && !mimeOk) || (!mime && !extOk)) {
    return "지원하지 않는 이미지 형식이에요. JPG/PNG/WebP/HEIC만 업로드할 수 있어요.";
  }

  return null;
};
