"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/shared/apis/api";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import { setProblemTypeActive } from "@/shared/apis/problem-type/problem-type-api";
import { problemTypeQueryKeys } from "@/shared/apis/problem-type/problem-type-query-keys";
import type {
  ProblemTypeCreateRequest,
  ProblemTypeItem,
} from "@/shared/apis/problem-type/problem-type-types";

type Options = {
  onSuccess?: () => void;
};

type Create409BodyShape = {
  status?: unknown;
  code?: unknown;
  data?: {
    existingTypeId?: unknown;
  };
  message?: unknown;
};

type Ctx = {
  prev: ProblemTypeItem[];
  tempId: string;
  optimisticSortOrder: number;
  optimisticName: string;
};

const isProblemTypeItem = (v: unknown): v is ProblemTypeItem => {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.name === "string" &&
    typeof o.custom === "boolean" &&
    typeof o.active === "boolean" &&
    typeof o.sortOrder === "number"
  );
};

const sanitizeList = (v: unknown): ProblemTypeItem[] => {
  if (!Array.isArray(v)) return [];
  return v.filter(isProblemTypeItem);
};

const readExistingTypeIdFrom409Body = (v: unknown) => {
  if (!v || typeof v !== "object") return null;
  const o = v as Create409BodyShape;

  if (o.code !== "REQ_002") return null;

  const id = o.data?.existingTypeId;
  return typeof id === "string" ? id : null;
};

const makeTempId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `temp-${crypto.randomUUID()}`;
  }
  return `temp-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getNextSortOrder = (list: ProblemTypeItem[]) => {
  const max = list.reduce((acc, cur) => Math.max(acc, cur.sortOrder), 0);
  return max + 1;
};

const upsertById = (list: ProblemTypeItem[], item: ProblemTypeItem) => {
  const idx = list.findIndex((t) => t.id === item.id);
  if (idx === -1) return [...list, item];

  const next = list.slice();
  next[idx] = { ...next[idx], ...item };
  return next;
};

export const useCreateCustomTypeMutation = (options?: Options) => {
  const qc = useQueryClient();

  return useMutation<ProblemTypeItem, unknown, ProblemTypeCreateRequest, Ctx>({
    mutationFn: async (body) => {
      const res = await instance.post<
        ApiResponse<ProblemTypeItem> | Create409BodyShape
      >(API_PATHS.PROBLEM_TYPES.ROOT, body, {
        validateStatus: (status) =>
          (status >= 200 && status < 300) || status === 409,
      });

      if (res.status === 409) {
        const existingTypeId = readExistingTypeIdFrom409Body(res.data);
        if (!existingTypeId) {
          throw new Error("409 but existingTypeId missing");
        }

        await setProblemTypeActive(existingTypeId, { active: true });

        return {
          id: existingTypeId,
          name: body.name,
          custom: true,
          active: true,
          sortOrder: 0,
        };
      }

      const created = unwrapApiResponse(
        res.data as ApiResponse<ProblemTypeItem>
      );
      if (!isProblemTypeItem(created)) {
        throw new Error("createCustomType returned invalid payload");
      }
      return created;
    },

    onMutate: async (body) => {
      await qc.cancelQueries({ queryKey: problemTypeQueryKeys.all });

      const prevRaw = qc.getQueryData(problemTypeQueryKeys.list());
      const prev = sanitizeList(prevRaw);

      const tempId = makeTempId();
      const optimisticSortOrder = getNextSortOrder(prev);

      const optimisticItem: ProblemTypeItem = {
        id: tempId,
        name: body.name,
        custom: true,
        active: true,
        sortOrder: optimisticSortOrder,
      };

      qc.setQueryData(
        problemTypeQueryKeys.list(),
        upsertById(prev, optimisticItem)
      );

      return {
        prev,
        tempId,
        optimisticSortOrder,
        optimisticName: body.name,
      };
    },

    onSuccess: async (item, _vars, ctx) => {
      const currentRaw = qc.getQueryData(problemTypeQueryKeys.list());
      const current = sanitizeList(currentRaw);

      const withoutTemp = ctx
        ? current.filter((t) => t.id !== ctx.tempId)
        : current;

      const fixed =
        item.sortOrder === 0 && ctx
          ? {
              ...item,
              name: item.name || ctx.optimisticName,
              sortOrder: ctx.optimisticSortOrder,
            }
          : item;

      qc.setQueryData(
        problemTypeQueryKeys.list(),
        upsertById(withoutTemp, fixed)
      );

      await qc.invalidateQueries({ queryKey: problemTypeQueryKeys.all });
      options?.onSuccess?.();
    },

    onError: (_err, _vars, ctx) => {
      if (!ctx) return;
      qc.setQueryData(problemTypeQueryKeys.list(), ctx.prev);
    },

    retry: false,
  });
};
