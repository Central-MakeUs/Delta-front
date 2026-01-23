import { unitOrderIndex } from "@/app/graph/constants/sort";
import type { GraphSortId } from "@/app/graph/constants/sort";
import type { BarRow } from "@/shared/components/bar-graph/bar-graph-horizontal/bar-graph-horizontal";

type Row = { value: number };

export type GraphListItem = {
  id: string;
  label: string;
  rows: readonly [BarRow, ...BarRow[]];
  __order: number;
};

const totalOf = (rows: readonly Row[]) =>
  rows.reduce((acc, cur) => acc + cur.value, 0);

const orderOfUnit = (label: string) => unitOrderIndex.get(label) ?? 9999;

export const sortGraphList = (params: {
  list: readonly GraphListItem[];
  sortId: GraphSortId;
}) => {
  const { list, sortId } = params;
  const copied = [...list];

  if (sortId === "most-wrong") {
    copied.sort((a, b) => totalOf(b.rows) - totalOf(a.rows));
    return copied;
  }

  if (sortId === "least-wrong") {
    copied.sort((a, b) => totalOf(a.rows) - totalOf(b.rows));
    return copied;
  }

  copied.sort((a, b) => {
    const da = orderOfUnit(a.label);
    const db = orderOfUnit(b.label);
    if (da !== db) return da - db;
    return a.__order - b.__order;
  });

  return copied;
};
