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
    ...rest,
  });
};
