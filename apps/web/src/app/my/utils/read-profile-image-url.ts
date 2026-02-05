export type ProfileImageShape = {
  viewUrl?: unknown;
  imageUrl?: unknown;
  url?: unknown;
};

export const readProfileImageUrl = (v: unknown): string | null => {
  if (!v || typeof v !== "object") return null;
  const o = v as ProfileImageShape;

  const candidate = o.viewUrl ?? o.imageUrl ?? o.url;
  return typeof candidate === "string" ? candidate : null;
};
