import { useMutation, useQueryClient } from "@tanstack/react-query";
import { problemDetailApi } from "@/shared/apis/problem-detail/problem-detail-api";
import { problemDetailQueryKeys } from "@/shared/apis/problem-detail/problem-detail-query-keys";
import { SolutionQueryData } from "@/shared/apis/problem-detail/problem-detail-types";

export const AI_SOLUTION_MUTATION_KEY = ["problem-detail", "solution"] as const;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const extractPlainText = (solution: unknown | null) => {
  if (!solution) return "";
  if (typeof solution === "string") return solution;

  if (typeof solution === "object" && solution !== null) {
    const v = solution as Record<string, unknown>;
    if (typeof v.plainText === "string") return v.plainText;
    if (typeof v.text === "string") return v.text;
  }

  return "";
};

const POLL_INTERVAL_MS = 5000;
const MAX_ATTEMPTS = 60;

export const useAiSolutionRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AI_SOLUTION_MUTATION_KEY,
    mutationFn: async ({ problemId }: { problemId: number | string }) => {
      const queryKey = problemDetailQueryKeys.solution(problemId);

      const fetchTask = async () => problemDetailApi.solution({ problemId });

      let attempt = 0;

      let task = await fetchTask();

      queryClient.setQueryData<SolutionQueryData>(queryKey, (prev) => ({
        ...(prev ?? {}),
        aiSolutionTask: task,
      }));

      while (task.status === "PENDING" || task.status === "RUNNING") {
        attempt += 1;

        if (attempt >= MAX_ATTEMPTS) {
          throw new Error(
            "AI 풀이 생성이 지연되고 있어요. 잠시 후 다시 시도해주세요."
          );
        }

        await sleep(POLL_INTERVAL_MS);

        task = await fetchTask();

        queryClient.setQueryData<SolutionQueryData>(queryKey, (prev) => ({
          ...(prev ?? {}),
          aiSolutionTask: task,
        }));
      }

      if (task.status === "FAILED") {
        throw new Error(task.failureReason ?? "AI 풀이 생성에 실패했어요.");
      }

      const plainText = extractPlainText(task.solution);

      queryClient.setQueryData<SolutionQueryData>(queryKey, (prev) => ({
        ...(prev ?? {}),
        aiSolutionTask: task,
        solution: { plainText },
      }));

      return { task, plainText };
    },
    onSuccess: (_, { problemId }) => {
      queryClient.invalidateQueries({
        queryKey: problemDetailQueryKeys.solution(problemId),
      });
    },
  });
};
