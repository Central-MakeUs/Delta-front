import { useCallback, useRef, useState } from "react";

export const useMinLoading = (minMs: number) => {
  const [isHolding, setIsHolding] = useState(false);
  const startedAtRef = useRef<number | null>(null);

  const start = useCallback(() => {
    startedAtRef.current = Date.now();
    setIsHolding(true);
  }, []);

  const end = useCallback(
    (done: () => void) => {
      const startedAt = startedAtRef.current ?? Date.now();
      const elapsed = Date.now() - startedAt;
      const remain = Math.max(minMs - elapsed, 0);

      window.setTimeout(() => {
        setIsHolding(false);
        done();
      }, remain);
    },
    [minMs]
  );

  const cancel = useCallback(() => {
    setIsHolding(false);
    startedAtRef.current = null;
  }, []);

  return { isHolding, start, end, cancel };
};
