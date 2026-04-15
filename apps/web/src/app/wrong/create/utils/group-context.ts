"use client";

export type WrongCreateGroupItem = {
  scanId: number;
  finalUnitId: string;
  finalTypeIds: string[];
  answerFormat: "CHOICE" | "TEXT" | "NUMBER" | "EXPRESSION";
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
    return JSON.parse(raw) as WrongCreateGroupContext;
  } catch {
    return null;
  }
};
