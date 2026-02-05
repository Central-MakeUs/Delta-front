import type { BarRow } from "@/shared/components/bar-graph/bar-graph-horizontal/bar-graph-horizontal";
import type { GraphGroup } from "@/shared/apis/graph/graph-types";
import { toNonEmptyTuple } from "@/app/graph/utils/to-non-empty-tuple";

const isSolvedRow = (row: { id: string; label: string }) => {
  const id = row.id.toLowerCase();
  if (id.includes("unsolved") || id.includes("incomplete")) return false;
  if (id.includes("solved") || id.includes("complete")) return true;

  const label = row.label.replace(/\s/g, "");
  if (label.includes("미완료")) return false;
  if (label.includes("완료")) return true;

  return false;
};

export const toBarRowsTuple = (
  rows: GraphGroup["rows"]
): readonly [BarRow, ...BarRow[]] | null => {
  const barRows = rows.map<BarRow>((r) => {
    const solved = isSolvedRow({ id: r.id, label: r.label });

    return {
      id: r.id,
      value: r.value,
      valueLabel: `${r.value}개`,
      tone: solved ? "active" : "inactive",
    };
  });

  return toNonEmptyTuple(barRows);
};
