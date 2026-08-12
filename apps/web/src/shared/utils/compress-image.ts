const MAX_DIMENSION = 2048;
const COMPRESS_QUALITY = 0.8;
const SKIP_BELOW_BYTES = 300 * 1024;

type CompressImageOptions = {
  maxDimension?: number;
  quality?: number;
  skipBelowBytes?: number;
  mimeType?: "image/webp" | "image/jpeg";
};

const canvasToBlob = (
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
) =>
  new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });

const replaceExt = (name: string, ext: string) => {
  const base = name.replace(/\.[^.]+$/, "");
  return `${base}.${ext}`;
};

export const compressImageFile = async (
  file: File,
  options: CompressImageOptions = {}
): Promise<File> => {
  const {
    maxDimension = MAX_DIMENSION,
    quality = COMPRESS_QUALITY,
    skipBelowBytes = SKIP_BELOW_BYTES,
    mimeType = "image/webp",
  } = options;

  if (file.size <= skipBelowBytes) return file;

  try {
    const bitmap = await createImageBitmap(file, {
      imageOrientation: "from-image",
    });

    const scale = Math.min(
      1,
      maxDimension / Math.max(bitmap.width, bitmap.height)
    );
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob =
      (await canvasToBlob(canvas, mimeType, quality)) ??
      (await canvasToBlob(canvas, "image/jpeg", quality));

    if (!blob || blob.size >= file.size) return file;

    const ext = blob.type === "image/webp" ? "webp" : "jpg";
    return new File([blob], replaceExt(file.name, ext), { type: blob.type });
  } catch {
    return file;
  }
};

export const compressImageFiles = (
  files: File[],
  options?: CompressImageOptions
) => Promise.all(files.map((file) => compressImageFile(file, options)));
