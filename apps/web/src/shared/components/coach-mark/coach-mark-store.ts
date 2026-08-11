"use client";

import { useSyncExternalStore } from "react";
import {
  COACH_MARK_SEQUENCE,
  COACH_MARK_STORAGE_KEY,
} from "@/shared/components/coach-mark/constants/coach-mark";
import type {
  CoachMarkState,
  CoachMarkStep,
} from "@/shared/components/coach-mark/types/coach-mark";

/**
 * 코치마크는 홈 → 문제 등록 플로우까지 여러 라우트에 걸쳐 이어지므로
 * 모듈 단위 스토어 + localStorage 로 진행 단계를 유지한다.
 */
const listeners = new Set<() => void>();

let state: CoachMarkState = null;
let isHydrated = false;

const isCoachMarkStep = (value: unknown): value is CoachMarkStep =>
  COACH_MARK_SEQUENCE.includes(value as CoachMarkStep);

const readStorage = (): CoachMarkState => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(COACH_MARK_STORAGE_KEY);
    return isCoachMarkStep(raw) ? raw : null;
  } catch {
    return null;
  }
};

const writeStorage = (next: CoachMarkState) => {
  if (typeof window === "undefined") return;

  try {
    if (next) {
      window.localStorage.setItem(COACH_MARK_STORAGE_KEY, next);
      return;
    }
    window.localStorage.removeItem(COACH_MARK_STORAGE_KEY);
  } catch {
    // storage 접근 불가 환경에서는 메모리 상태만 사용
  }
};

const emit = () => {
  listeners.forEach((listener) => listener());
};

const setState = (next: CoachMarkState) => {
  isHydrated = true;
  if (state === next) return;

  state = next;
  writeStorage(next);
  emit();
};

const getSnapshot = (): CoachMarkState => {
  if (!isHydrated) {
    state = readStorage();
    isHydrated = true;
  }
  return state;
};

const getServerSnapshot = (): CoachMarkState => null;

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  const handleStorage = (e: StorageEvent) => {
    if (e.key !== COACH_MARK_STORAGE_KEY) return;
    state = readStorage();
    emit();
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
};

/** 온보딩 완료 직후에만 호출한다. 첫 단계부터 코치마크를 시작한다. */
export const startCoachMark = () => {
  setState(COACH_MARK_SEQUENCE[0]);
};

/** 다음 단계로 이동. 마지막 단계였다면 코치마크를 종료한다. */
export const advanceCoachMark = () => {
  const current = getSnapshot();
  if (!current) return;

  const nextIndex = COACH_MARK_SEQUENCE.indexOf(current) + 1;
  setState(COACH_MARK_SEQUENCE[nextIndex] ?? null);
};

/** 코치마크를 즉시 종료한다. */
export const finishCoachMark = () => {
  setState(null);
};

export const useCoachMarkStep = (): CoachMarkState =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
