"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/components/button/button/button";
import DirectAddButton from "@/app/wrong/create/components/direct-add-button/direct-add-button";
import * as s from "@/app/wrong/create/components/steps/step.css";
import type { StepProps } from "@/app/wrong/create/page";
import { useProblemScanSummaryQuery } from "@/shared/apis/problem-scan/hooks/use-problem-scan-summary-query";
import { TYPE_FILTERS } from "@/app/wrong/(list)/constants/wrong-filters";
import { normalize } from "@/app/wrong/create/utils/label-match";
import {
  type TypeItem,
  computeTypeRecommendation,
  mergeExtraItem,
  normalizeTypeLabel,
  toKebabId,
} from "@/app/wrong/create/utils/type-recommend";

type Step3Props = StepProps & {
  scanId?: number | string | null;
};

const readTypeId = (sp: URLSearchParams) => sp.get("typeId") ?? null;

const setParams = (
  base: URLSearchParams,
  patch: Record<string, string | null>
) => {
  const next = new URLSearchParams(base.toString());
  Object.entries(patch).forEach(([k, v]) => {
    if (v === null) next.delete(k);
    else next.set(k, v);
  });
  return next;
};

const Step3 = ({ onNextEnabledChange, scanId = null }: Step3Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const spString = sp.toString();
  const params = useMemo(() => new URLSearchParams(spString), [spString]);

  const urlTypeId = useMemo(() => readTypeId(params), [params]);

  const [items, setItems] = useState<TypeItem[]>(() =>
    TYPE_FILTERS.map((v) => ({ id: v.id, label: v.label }))
  );
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [hasUserTouched, setHasUserTouched] = useState(false);

  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const { data: summary } = useProblemScanSummaryQuery(scanId);

  const recommended = useMemo(() => {
    const aiTypeName = summary?.classification.type?.name ?? null;
    return computeTypeRecommendation(items, aiTypeName);
  }, [summary, items]);

  const viewItems = useMemo(() => {
    if (hasUserTouched) return items;
    return mergeExtraItem(items, recommended?.extraItem);
  }, [hasUserTouched, items, recommended]);

  const viewSelectedTypeId = urlTypeId
    ? urlTypeId
    : hasUserTouched
      ? selectedTypeId
      : (recommended?.selectedId ?? selectedTypeId);

  useEffect(() => {
    onNextEnabledChange?.(Boolean(viewSelectedTypeId));
  }, [onNextEnabledChange, viewSelectedTypeId]);

  const didHydrateRef = useRef(false);

  useEffect(() => {
    if (didHydrateRef.current) return;

    if (urlTypeId) {
      didHydrateRef.current = true;
      return;
    }

    if (hasUserTouched) {
      didHydrateRef.current = true;
      return;
    }

    const nextId = recommended?.selectedId ?? null;
    if (!nextId) return;

    const next = setParams(params, { typeId: nextId });
    const nextQuery = next.toString();
    if (nextQuery !== spString) {
      router.replace(`${pathname}?${nextQuery}`, { scroll: false });
    }

    didHydrateRef.current = true;
  }, [
    hasUserTouched,
    urlTypeId,
    recommended?.selectedId,
    params,
    spString,
    pathname,
    router,
  ]);

  const pushTypeId = (nextTypeId: string | null) => {
    const next = setParams(params, { typeId: nextTypeId });
    const nextQuery = next.toString();
    if (nextQuery === spString) return;
    router.replace(`${pathname}?${nextQuery}`, { scroll: false });
  };

  const openAdd = () => {
    setIsAdding(true);
    setDraft("");
  };

  const closeAdd = () => {
    setIsAdding(false);
    setDraft("");
  };

  const ensureItemInState = (item: TypeItem) => {
    setItems((prev) => {
      const exists = prev.some(
        (v) =>
          v.id === item.id ||
          normalizeTypeLabel(v.label) === normalizeTypeLabel(item.label)
      );
      return exists ? prev : [...prev, item];
    });
  };

  const selectType = (item: TypeItem) => {
    setHasUserTouched(true);
    ensureItemInState(item);
    setSelectedTypeId(item.id);
    onNextEnabledChange?.(true);
    pushTypeId(item.id);
  };

  const commitAdd = () => {
    const nextLabel = normalize(draft);
    if (!nextLabel) {
      closeAdd();
      return;
    }

    setHasUserTouched(true);

    const existing = items.find(
      (v) => normalizeTypeLabel(v.label) === normalizeTypeLabel(nextLabel)
    );

    const nextItem: TypeItem =
      existing ?? ({ id: toKebabId(nextLabel), label: nextLabel } as const);

    ensureItemInState(nextItem);
    setSelectedTypeId(nextItem.id);
    onNextEnabledChange?.(true);
    pushTypeId(nextItem.id);

    closeAdd();
  };

  return (
    <div className={s.container}>
      <div className={s.buttonGrid}>
        {viewItems.map((item) => (
          <Button
            key={item.id}
            size="56"
            label={item.label}
            tone={viewSelectedTypeId === item.id ? "dark" : "surface"}
            aria-pressed={viewSelectedTypeId === item.id}
            onClick={() => selectType(item)}
          />
        ))}

        <DirectAddButton
          mode={isAdding ? "input" : "button"}
          value={draft}
          onValueChange={setDraft}
          onSubmit={commitAdd}
          onCancel={closeAdd}
          onClick={openAdd}
        />
      </div>
    </div>
  );
};

export default Step3;
