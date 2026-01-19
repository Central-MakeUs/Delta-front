"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/shared/components/button/button/button";
import DirectAddButton from "@/app/wrong/create/components/direct-add-button/direct-add-button";
import * as s from "@/app/wrong/create/components/steps/step.css";
import type { StepProps } from "@/app/wrong/create/page";
import { useProblemScanSummaryQuery } from "@/shared/apis/problem-scan/hooks/use-problem-scan-summary-query";

import { TYPE_FILTERS } from "@/app/wrong/(list)/constants/wrong-filters";

type Step3Props = StepProps & {
  scanId?: number | string | null;
};

type TypeItem = { id: string; label: string };

const normalize = (v?: string | null) => (v ?? "").trim();
const normalizeLabel = (v?: string | null) => normalize(v).replace(/\s+/g, "");

const toKebab = (input: string) =>
  normalize(input)
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const matchTypeByLabel = (items: readonly TypeItem[], name?: string | null) => {
  const n = normalizeLabel(name);
  if (!n) return null;

  return (
    items.find((v) => normalizeLabel(v.label) === n) ??
    items.find(
      (v) =>
        n.includes(normalizeLabel(v.label)) ||
        normalizeLabel(v.label).includes(n)
    ) ??
    null
  );
};

const Step3 = ({ onNextEnabledChange, scanId = null }: Step3Props) => {
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
    const n = normalize(aiTypeName);
    if (!n) return null as null | { selectedId: string; extraItem?: TypeItem };

    const hit = matchTypeByLabel(items, n);
    if (hit) return { selectedId: hit.id };

    const extraItem: TypeItem = { id: toKebab(n), label: n };
    return { selectedId: extraItem.id, extraItem };
  }, [summary, items]);

  const viewItems = useMemo(() => {
    if (hasUserTouched) return items;
    const extra = recommended?.extraItem;
    if (!extra) return items;

    const exists = items.some(
      (v) => normalizeLabel(v.label) === normalizeLabel(extra.label)
    );
    return exists ? items : [...items, extra];
  }, [hasUserTouched, items, recommended]);

  const viewSelectedTypeId = hasUserTouched
    ? selectedTypeId
    : (recommended?.selectedId ?? selectedTypeId);

  useEffect(() => {
    onNextEnabledChange?.(Boolean(viewSelectedTypeId));
  }, [onNextEnabledChange, viewSelectedTypeId]);

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
          normalizeLabel(v.label) === normalizeLabel(item.label)
      );
      return exists ? prev : [...prev, item];
    });
  };

  const selectType = (item: TypeItem) => {
    setHasUserTouched(true);
    ensureItemInState(item);
    setSelectedTypeId(item.id);
    onNextEnabledChange?.(true);
  };

  const commitAdd = () => {
    const nextLabel = normalize(draft);
    if (!nextLabel) {
      closeAdd();
      return;
    }

    setHasUserTouched(true);

    const existing = items.find(
      (v) => normalizeLabel(v.label) === normalizeLabel(nextLabel)
    );
    const nextItem: TypeItem = existing ?? {
      id: toKebab(nextLabel),
      label: nextLabel,
    };

    ensureItemInState(nextItem);
    setSelectedTypeId(nextItem.id);
    onNextEnabledChange?.(true);

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
