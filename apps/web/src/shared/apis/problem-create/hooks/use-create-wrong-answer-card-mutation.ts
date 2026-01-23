import { useMutation } from "@tanstack/react-query";
import { createWrongAnswerCard } from "@/shared/apis/problem-create/problem-create-api";
import type { ProblemCreateRequest } from "@/shared/apis/problem-create/problem-create-types";

export const useCreateWrongAnswerCardMutation = () => {
  return useMutation({
    mutationFn: (body: ProblemCreateRequest) => createWrongAnswerCard(body),
  });
};
