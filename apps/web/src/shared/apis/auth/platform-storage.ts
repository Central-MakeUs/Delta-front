import { ROUTES } from "@/shared/constants/routes";

const PLATFORM_KEY = "delta:platform";

type Platform = "ios" | "android";

export const platformStorage = {
  save: (platform: string) => {
    if (platform === "ios" || platform === "android") {
      localStorage.setItem(PLATFORM_KEY, platform);
    }
  },

  get: (): Platform | null => {
    if (typeof window === "undefined") return null;
    const value = localStorage.getItem(PLATFORM_KEY);
    if (value === "ios" || value === "android") return value;
    return null;
  },

  getLoginRoute: (): string => {
    const platform = platformStorage.get();
    if (platform === "ios") return ROUTES.AUTH.LOGIN_IOS;
    if (platform === "android") return ROUTES.AUTH.LOGIN_ANDROID;
    return ROUTES.AUTH.LOGIN;
  },
};
