import { ROUTES } from "@/shared/constants/routes";

const PLATFORM_KEY = "delta:platform";

type Platform = "ios" | "android";

const devWarn = (message: string, e?: unknown) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(message, e);
  }
};

const safeLocalGet = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    devWarn("[platformStorage] localStorage.getItem failed", e);
    return null;
  }
};

const safeLocalSet = (key: string, value: string): boolean => {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (e) {
    devWarn("[platformStorage] localStorage.setItem failed", e);
    return false;
  }
};

export const platformStorage = {
  save: (platform: string) => {
    if (platform !== "ios" && platform !== "android") return;
    safeLocalSet(PLATFORM_KEY, platform);
  },

  get: (): Platform | null => {
    const value = safeLocalGet(PLATFORM_KEY);
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
