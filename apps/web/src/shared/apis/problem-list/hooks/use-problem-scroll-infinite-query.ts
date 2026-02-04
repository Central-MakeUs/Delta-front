import { useInfiniteQuery } from "@tanstack/react-query";
import { problemScrollQueryKeys } from "@/shared/apis/problem-list/problem-scroll-query-keys";
import { getProblemScroll } from "@/shared/apis/problem-list/problem-scroll-api";
import type {
  GetProblemScrollParams,
  GetProblemScrollResponse,
  ProblemScrollNextCursor,
} from "@/shared/apis/problem-list/problem-scroll-types";

const DEFAULT_SIZE = 20;

type BaseParams = Omit<GetProblemScrollParams, "lastId" | "lastCreatedAt">;

export const useProblemScrollInfiniteQuery = (args: {
  params?: BaseParams;
  enabled?: boolean;
}) => {
  const baseParams: BaseParams = {
    size: DEFAULT_SIZE,
    includePreviewUrl: true,
    ...args.params,
  };

  const size = baseParams.size ?? DEFAULT_SIZE;

  return useInfiniteQuery({
    queryKey: problemScrollQueryKeys.infinite(baseParams),
    enabled: args.enabled ?? true,
    initialPageParam: undefined as ProblemScrollNextCursor | undefined,
    getNextPageParam: (
      lastPage: GetProblemScrollResponse
    ): ProblemScrollNextCursor | undefined => {
      if (lastPage.hasNext && lastPage.nextCursor) return lastPage.nextCursor;
      // API에서 nextCursor를 안 보내도, 한 페이지가 꽉 찼으면 마지막 항목으로 커서 보강
      if (lastPage.content.length >= size) {
        const last = lastPage.content[lastPage.content.length - 1];
        if (last)
          return {
            lastId: last.problemId,
            lastCreatedAt: last.createdAt,
          };
      }
      return undefined;
    },
    queryFn: ({ pageParam }) =>
      getProblemScroll({
        ...baseParams,
        ...(pageParam && {
          lastId: pageParam.lastId,
          lastCreatedAt: pageParam.lastCreatedAt,
        }),
      }),
  });
};
