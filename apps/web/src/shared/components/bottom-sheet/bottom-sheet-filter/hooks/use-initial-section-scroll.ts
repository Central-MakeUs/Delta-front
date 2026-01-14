"use client";

import { useCallback, useRef, useState } from "react";
import type { BottomSheetFilterInitialSection } from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";

export const useInitialSectionScroll = () => {
  const contentFrameRef = useRef<HTMLDivElement | null>(null);
  const chapterAnchorRef = useRef<HTMLDivElement | null>(null);
  const typeAnchorRef = useRef<HTMLDivElement | null>(null);

  const [bottomSpacerHeightRem, setBottomSpacerHeightRem] = useState(0);

  const computeScrollTopToAnchor = useCallback(
    (section: BottomSheetFilterInitialSection) => {
      const scroller = contentFrameRef.current;
      if (!scroller) return 0;

      const anchor =
        section === "type" ? typeAnchorRef.current : chapterAnchorRef.current;
      if (!anchor) return 0;

      const scrollerRect = scroller.getBoundingClientRect();
      const anchorRect = anchor.getBoundingClientRect();

      const rawTop = scroller.scrollTop + (anchorRect.top - scrollerRect.top);
      const maxTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight);

      return Math.min(Math.max(0, rawTop), maxTop);
    },
    []
  );

  const syncSpacerForSection = useCallback(
    (section: BottomSheetFilterInitialSection) => {
      const scroller = contentFrameRef.current;
      const typeBlock = typeAnchorRef.current;

      if (!scroller || !typeBlock) {
        setBottomSpacerHeightRem(0);
        return;
      }

      if (section !== "type") {
        setBottomSpacerHeightRem(0);
        return;
      }

      const viewportHeightPx = scroller.clientHeight;
      const typeBlockHeightPx = typeBlock.getBoundingClientRect().height;

      const needPx = Math.max(0, viewportHeightPx - typeBlockHeightPx);
      setBottomSpacerHeightRem(needPx / 10);
    },
    []
  );

  const scrollToInitialSection = useCallback(
    (section: BottomSheetFilterInitialSection) => {
      const scroller = contentFrameRef.current;
      if (!scroller) return;

      const top = computeScrollTopToAnchor(section);
      scroller.scrollTo({ top, behavior: "auto" });
    },
    [computeScrollTopToAnchor]
  );

  return {
    contentFrameRef,
    chapterAnchorRef,
    typeAnchorRef,
    bottomSpacerHeightRem,
    syncSpacerForSection,
    scrollToInitialSection,
  };
};
