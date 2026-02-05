"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const arrayMove = <T>(arr: readonly T[], from: number, to: number) => {
  const next = arr.slice();
  const [picked] = next.splice(from, 1);
  next.splice(to, 0, picked);
  return next;
};

const isSameIds = (a: readonly string[], b: readonly string[]) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

type UsePointerSortIdsArgs = {
  ids: readonly string[];
  onChange: (nextIds: string[]) => void;
  onEnd?: (nextIds: string[]) => void | Promise<void>;
  activationDistance?: number;
  pressDelayMs?: number;
  cancelDistance?: number;
};

type UsePointerSortIdsReturn = {
  draggingId: string | null;
  getItemProps: (id: string) => { "data-sort-id": string };
  getPressProps: (id: string) => {
    onPointerDownCapture: React.PointerEventHandler<HTMLElement>;
    onClickCapture: React.MouseEventHandler<HTMLElement>;
  };
};

export const usePointerSortIds = ({
  ids,
  onChange,
  onEnd,
  activationDistance = 6,
  pressDelayMs = 260,
  cancelDistance = 12,
}: UsePointerSortIdsArgs): UsePointerSortIdsReturn => {
  const idsRef = useRef(ids);
  const latestIdsRef = useRef(ids);
  const onChangeRef = useRef(onChange);
  const onEndRef = useRef(onEnd);

  useEffect(() => {
    idsRef.current = ids;
    latestIdsRef.current = ids;
  }, [ids]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [tracking, setTracking] = useState(false);

  const suppressClickRef = useRef(false);
  const prevBodyTouchActionRef = useRef<string>("");

  const dragRef = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    activated: boolean;
    activeId: string | null;
    targetEl: HTMLElement | null;
    timerId: number | null;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    activated: false,
    activeId: null,
    targetEl: null,
    timerId: null,
  });

  const clearTimer = useCallback(() => {
    const t = dragRef.current.timerId;
    if (t == null) return;
    window.clearTimeout(t);
    dragRef.current.timerId = null;
  }, []);

  const restoreBodyTouchAction = useCallback(() => {
    document.body.style.touchAction = prevBodyTouchActionRef.current;
  }, []);

  const lockBodyTouchAction = useCallback(() => {
    prevBodyTouchActionRef.current = document.body.style.touchAction;
    document.body.style.touchAction = "none";
  }, []);

  const cleanup = useCallback(() => {
    clearTimer();
    dragRef.current.pointerId = null;
    dragRef.current.activated = false;
    dragRef.current.activeId = null;
    dragRef.current.targetEl = null;
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
    restoreBodyTouchAction();
  }, [clearTimer, restoreBodyTouchAction]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  useEffect(() => {
    if (!tracking) return;

    const onMove = (e: PointerEvent) => {
      if (dragRef.current.pointerId !== e.pointerId) return;

      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      if (!dragRef.current.activated) {
        const dist = Math.hypot(dx, dy);
        if (dist >= cancelDistance) {
          cleanup();
          setTracking(false);
        }
        return;
      }

      const dist = Math.hypot(dx, dy);
      if (dist < activationDistance) return;

      e.preventDefault();

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const over = el?.closest?.("[data-sort-id]") as HTMLElement | null;
      const overId = over?.dataset.sortId ?? null;

      const activeId = dragRef.current.activeId;
      if (!activeId || !overId) return;

      const current = latestIdsRef.current;
      const from = current.indexOf(activeId);
      const to = current.indexOf(overId);
      if (from < 0 || to < 0 || from === to) return;

      const next = arrayMove(current, from, to);
      if (isSameIds(current, next)) return;

      latestIdsRef.current = next;
      onChangeRef.current(next);
    };

    const finish = async (e: PointerEvent) => {
      if (dragRef.current.pointerId !== e.pointerId) return;

      const activated = dragRef.current.activated;

      cleanup();
      setTracking(false);

      if (!activated) return;

      suppressClickRef.current = true;
      setDraggingId(null);

      try {
        await onEndRef.current?.(latestIdsRef.current.slice());
      } catch (err) {
        console.error(err);
      }
    };

    const onUp = (e: PointerEvent) => {
      void finish(e);
    };

    const onCancel = (e: PointerEvent) => {
      void finish(e);
    };

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onCancel, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
    };
  }, [activationDistance, cancelDistance, cleanup, tracking]);

  const getItemProps = useCallback((id: string) => {
    return { "data-sort-id": id };
  }, []);

  const getPressProps = useCallback(
    (id: string) => {
      const onPointerDownCapture: React.PointerEventHandler<HTMLElement> = (
        e
      ) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;

        latestIdsRef.current = idsRef.current;

        dragRef.current.pointerId = e.pointerId;
        dragRef.current.startX = e.clientX;
        dragRef.current.startY = e.clientY;
        dragRef.current.activated = false;
        dragRef.current.activeId = id;
        dragRef.current.targetEl = e.currentTarget as HTMLElement;

        clearTimer();

        dragRef.current.timerId = window.setTimeout(() => {
          const pointerId = dragRef.current.pointerId;
          const targetEl = dragRef.current.targetEl;
          const activeId = dragRef.current.activeId;

          if (pointerId == null || !targetEl || !activeId) return;

          dragRef.current.activated = true;
          setDraggingId(activeId);

          document.body.style.userSelect = "none";
          document.body.style.cursor = "grabbing";
          lockBodyTouchAction();

          try {
            targetEl.setPointerCapture(pointerId);
          } catch {}
        }, pressDelayMs);

        setTracking(true);
      };

      const onClickCapture: React.MouseEventHandler<HTMLElement> = (e) => {
        if (!suppressClickRef.current) return;
        suppressClickRef.current = false;
        e.preventDefault();
        e.stopPropagation();
      };

      return { onPointerDownCapture, onClickCapture };
    },
    [clearTimer, lockBodyTouchAction, pressDelayMs]
  );

  return { draggingId, getItemProps, getPressProps };
};
