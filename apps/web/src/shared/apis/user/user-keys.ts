export const userKeys = {
  all: ["user"] as const,
  me: () => [...userKeys.all, "me"] as const,
  updateMyName: () => [...userKeys.all, "update-my-name"] as const,
};
