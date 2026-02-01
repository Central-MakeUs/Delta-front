"use client";

import { useCallback, useRef, useState } from "react";

type Return = {
  lockedId: string | null;
  run: (id: string, task: () => Promise<void>) => Promise<void>;
};

export const useAsyncIdLock = (): Return => {
  const [lockedId, setLockedId] = useState<string | null>(null);
  const lockedIdRef = useRef<string | null>(null);

  const run = useCallback(async (id: string, task: () => Promise<void>) => {
    if (lockedIdRef.current) return;

    lockedIdRef.current = id;
    setLockedId(id);

    try {
      await task();
    } finally {
      lockedIdRef.current = null;
      setLockedId(null);
    }
  }, []);

  return { lockedId, run };
};
