import type { BottomSheetFilterProps } from "@/shared/components/bottom-sheet/bottom-sheet-filter/types";

export const normalizeDropdownIds = (
  input: BottomSheetFilterProps["selectedDropdownIds"]
) => {
  const out: Record<string, string[]> = {};
  if (!input) return out;

  Object.entries(input).forEach(([k, v]) => {
    if (Array.isArray(v)) out[k] = [...v];
    else if (typeof v === "string") out[k] = [v];
  });

  return out;
};
