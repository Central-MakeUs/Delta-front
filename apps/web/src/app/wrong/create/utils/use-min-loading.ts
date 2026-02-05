import { useCallback, useEffect, useRef, useState } from "react";

export const useMinLoading = (minMs: number) => {
  const [isHolding, setIsHolding] = useState(false);

  const startedAtRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (!timeoutRef.current) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const start = useCallback(() => {
    clearTimer();
    startedAtRef.current = Date.now();
    setIsHolding(true);
  }, [clearTimer]);

  const end = useCallback(
    (done: () => void) => {
      const startedAt = startedAtRef.current ?? Date.now();
      const elapsed = Date.now() - startedAt;
      const remain = Math.max(minMs - elapsed, 0);

      clearTimer();

      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        setIsHolding(false);
        done();
      }, remain);
    },
    [minMs, clearTimer]
  );

  const cancel = useCallback(() => {
    clearTimer();
    setIsHolding(false);
    startedAtRef.current = null;
  }, [clearTimer]);

  return { isHolding, start, end, cancel };
};
