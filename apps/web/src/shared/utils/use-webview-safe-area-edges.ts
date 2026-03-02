"use client";

import { useEffect } from "react";

export type SafeEdge = "top" | "bottom" | "left" | "right";

type Options = {
  enabled?: boolean;
  restoreEdges?: SafeEdge[];
};

const getBridge = () => {
  if (typeof window === "undefined") return null;
  return (
    (
      window as unknown as {
        ReactNativeWebView?: { postMessage: (v: string) => void };
      }
    ).ReactNativeWebView ?? null
  );
};

export const postSafeAreaEdges = (edges: SafeEdge[]) => {
  getBridge()?.postMessage(JSON.stringify({ type: "SAFE_AREA_EDGES", edges }));
};

export const useWebViewSafeAreaEdges = (
  edges: SafeEdge[],
  options?: Options
) => {
  const enabled = options?.enabled ?? true;
  const restoreEdges = options?.restoreEdges ?? ["top", "bottom"];

  useEffect(() => {
    const bridge = getBridge();
    if (!bridge) return;
    if (!enabled) return;

    postSafeAreaEdges(edges);
    return () => {
      postSafeAreaEdges(restoreEdges);
    };
  }, [enabled, restoreEdges.join(","), edges.join(",")]);
};
