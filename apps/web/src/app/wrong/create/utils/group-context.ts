"use client";

export type WrongCreateGroupItem = {
  scanId: number;
  finalUnitId: string;
  finalTypeIds: string[];
  answerFormat: "CHOICE" | "TEXT" | "NUMBER" | "EXPRESSION";
  answerChoiceNo?: number | null;
  answerValue?: string | null;
  title: string;
  imageUrl: string;
  subjectName: string;
  unitName: string;
  typeNames: string[];
  needsReview: boolean;
};

export type WrongCreateGroupContext = {
  id: string;
  createdAt: number;
  items: WrongCreateGroupItem[];
};

const STORAGE_PREFIX = "wrong-create-group:";

const buildStorageKey = (groupId: string) => `${STORAGE_PREFIX}${groupId}`;

const isWrongCreateGroupContext = (
  value: unknown
): value is WrongCreateGroupContext => {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Partial<WrongCreateGroupContext>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.createdAt === "number" &&
    Array.isArray(candidate.items)
  );
};

export const createWrongCreateGroupId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export const saveWrongCreateGroupContext = (
  context: WrongCreateGroupContext
) => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      buildStorageKey(context.id),
      JSON.stringify(context)
    );
  } catch (error) {
    console.error("[wrong-create-group] Failed to save session storage", error);
  }
};

export const readWrongCreateGroupContext = (
  groupId: string | null | undefined
): WrongCreateGroupContext | null => {
  if (!groupId || typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem(buildStorageKey(groupId));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return isWrongCreateGroupContext(parsed) ? parsed : null;
  } catch {
    return null;
  }
};
