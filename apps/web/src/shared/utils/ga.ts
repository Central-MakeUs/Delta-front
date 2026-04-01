type Platform = "ios" | "android" | "web";

export const getPlatform = (): Platform => {
  if (typeof window === "undefined") return "web";
  if (!window.ReactNativeWebView) return "web";

  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "web";
};

type GaEventParams = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
};

export const sendGaEvent = ({ action, category, label, value, ...rest }: GaEventParams) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    platform: getPlatform(),
    ...rest,
  });
};
