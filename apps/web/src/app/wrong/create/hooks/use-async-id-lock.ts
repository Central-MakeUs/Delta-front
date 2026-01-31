"use client";

import { useCallback, useState } from "react";

type Return = {
  lockedId: string | null;
  run: (id: string, task: () => Promise<void>) => Promise<void>;
};

export const useAsyncIdLock = (): Return => {
  const [lockedId, setLockedId] = useState<string | null>(null);

  const run = useCallback(
    async (id: string, task: () => Promise<void>) => {
      if (lockedId) return;

      setLockedId(id);
      try {
        await task();
      } finally {
        setLockedId(null);
      }
    },
    [lockedId]
  );

  return { lockedId, run };
};
