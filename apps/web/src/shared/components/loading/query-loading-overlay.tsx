"use client";

import { useEffect, useRef, useState } from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/shared/components/loading/loading";
import * as s from "@/shared/components/loading/loading.css";
import { COMPLETE_PROBLEM_DETAIL_MUTATION_KEY } from "@/shared/apis/problem-detail/hooks/use-complete-problem-detail-mutation";

const SHOW_DELAY_MS = 300;
const HIDE_DELAY_MS = 150;

const QueryLoadingOverlay = () => {
  const pathname = usePathname();
  const sp = useSearchParams();
  const step = sp.get("step");

  const ignore =
    pathname === "/wrong" ||
    (pathname === "/wrong/create" && (step === "2" || step === "3"));

  const fetchingCount = useIsFetching();

  const mutatingAll = useIsMutating();
  const mutatingIgnored = useIsMutating({
    mutationKey: COMPLETE_PROBLEM_DETAIL_MUTATION_KEY,
  });

  const mutatingCount = Math.max(0, mutatingAll - mutatingIgnored);
  const active = fetchingCount + mutatingCount > 0;

  const [open, setOpen] = useState(false);

  const openRef = useRef(open);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    if (showTimerRef.current) window.clearTimeout(showTimerRef.current);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);

    if (ignore) return;

    if (active) {
      if (openRef.current) return;
      showTimerRef.current = window.setTimeout(
        () => setOpen(true),
        SHOW_DELAY_MS
      );
      return;
    }

    if (!openRef.current) return;
    hideTimerRef.current = window.setTimeout(
      () => setOpen(false),
      HIDE_DELAY_MS
    );
  }, [active, ignore]);

  useEffect(() => {
    return () => {
      if (showTimerRef.current) window.clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  if (ignore || !open) return null;

  return <Loading className={s.all} unstyled showMessage={false} />;
};

export default QueryLoadingOverlay;
