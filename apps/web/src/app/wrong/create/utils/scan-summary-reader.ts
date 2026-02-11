const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

export type ClassificationState = {
  needsReview: boolean;
  hasSubject: boolean;
  hasUnit: boolean;
  hasTypes: boolean;
};

export const defer = (fn: () => void) => {
  Promise.resolve().then(fn);
};

export const unwrapDataLayers = (raw: unknown, maxDepth = 6) => {
  let cur: unknown = raw;

  for (let i = 0; i < maxDepth; i += 1) {
    if (!isObject(cur)) break;
    if (!("data" in cur)) break;
    cur = cur.data;
  }

  return cur;
};

const readStringField = (raw: unknown, key: string) => {
  const unwrapped = unwrapDataLayers(raw);
  if (!isObject(unwrapped)) return null;

  const v = unwrapped[key];
  if (typeof v !== "string") return null;

  const t = v.trim();
  return t.length > 0 ? t : null;
};

export const readStatus = (raw: unknown) => readStringField(raw, "status");
export const readFailReason = (raw: unknown) =>
  readStringField(raw, "failReason");

export const readClassification = (
  raw: unknown
): ClassificationState | null => {
  const unwrapped = unwrapDataLayers(raw);
  if (!isObject(unwrapped)) return null;

  const cls = unwrapped.classification;
  if (!isObject(cls)) return null;

  const needsReview =
    typeof cls.needsReview === "boolean" ? cls.needsReview : false;

  const subject =
    isObject(cls.subject) && typeof cls.subject.id === "string"
      ? { id: cls.subject.id }
      : null;

  const unit =
    isObject(cls.unit) && typeof cls.unit.id === "string"
      ? { id: cls.unit.id }
      : null;

  const types = Array.isArray(cls.types) ? cls.types : [];

  return {
    needsReview,
    hasSubject: !!subject?.id,
    hasUnit: !!unit?.id,
    hasTypes: types.length > 0,
  };
};
