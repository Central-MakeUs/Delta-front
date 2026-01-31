export const problemTypeQueryKeys = {
  all: ["problem-types"] as const,
  list: () => [...problemTypeQueryKeys.all, "list"] as const,
};
