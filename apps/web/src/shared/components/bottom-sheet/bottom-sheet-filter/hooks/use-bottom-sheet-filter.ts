import { useEffect, useRef, useState } from "react";
import type { BottomSheetFilterProps } from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";

const ANIMATION_DURATION = 300;

export const useBottomSheetFilter = ({
  isOpen,
  onClose,
  selectedChapterIds = [],
  selectedTypeIds = [],
  selectedDropdownIds = {},
  dropdownSection,
}: Pick<
  BottomSheetFilterProps,
  | "isOpen"
  | "onClose"
  | "selectedChapterIds"
  | "selectedTypeIds"
  | "selectedDropdownIds"
  | "dropdownSection"
>) => {
  const [isClosing, setIsClosing] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const [localChapterIds, setLocalChapterIds] = useState(selectedChapterIds);
  const [localTypeIds, setLocalTypeIds] = useState(selectedTypeIds);
  const [localDropdownIds, setLocalDropdownIds] =
    useState<Record<string, string[]>>(selectedDropdownIds);

  const prevIsOpenRef = useRef(isOpen);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shouldRender = isOpen || isClosing;

  useEffect(() => {
    const prevIsOpen = prevIsOpenRef.current;

    if (isOpen !== prevIsOpen) {
      if (isOpen && !prevIsOpen) {
        requestAnimationFrame(() => {
          setLocalChapterIds(selectedChapterIds);
          setLocalTypeIds(selectedTypeIds);
          setLocalDropdownIds(selectedDropdownIds);
          setOpenDropdowns({});
        });
      }
      prevIsOpenRef.current = isOpen;

      if (isOpen) {
        setIsClosing((prev) => {
          if (prev) {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }
          return false;
        });
      } else {
        setIsClosing((prev) => (prev ? prev : true));
      }
    }
  }, [
    isOpen,
    selectedChapterIds,
    selectedTypeIds,
    selectedDropdownIds,
    dropdownSection?.defaultOpen,
  ]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    if (isClosing) {
      timeoutRef.current = setTimeout(() => {
        setIsClosing(false);
        document.body.style.overflow = "unset";
      }, ANIMATION_DURATION);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isClosing]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isClosing) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isClosing, onClose]);

  const handleClose = () => {
    if (isClosing) return;
    onClose();
  };

  const handleChapterToggle = (id: string) => {
    setLocalChapterIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleTypeToggle = (id: string) => {
    setLocalTypeIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDropdownToggle = (chapterId: string, optionId: string) => {
    setLocalDropdownIds((prev) => {
      const chapterIds = prev[chapterId] || [];
      const newChapterIds = chapterIds.includes(optionId)
        ? chapterIds.filter((i) => i !== optionId)
        : [...chapterIds, optionId];
      return {
        ...prev,
        [chapterId]: newChapterIds,
      };
    });
  };

  const handleDropdownOpenToggle = (chapterId: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  return {
    shouldRender,
    isClosing,
    openDropdowns,
    localChapterIds,
    localTypeIds,
    localDropdownIds,
    handleClose,
    handleChapterToggle,
    handleTypeToggle,
    handleDropdownToggle,
    handleDropdownOpenToggle,
    setLocalChapterIds,
    setLocalTypeIds,
    setLocalDropdownIds,
  };
};
