type NavigateDetail = {
  to: string;
  replace?: boolean;
};

const NAVIGATE_EVENT = "app:navigate";

export const emitNavigate = (detail: NavigateDetail) => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<NavigateDetail>(NAVIGATE_EVENT, { detail })
  );
};

export const onNavigate = (handler: (detail: NavigateDetail) => void) => {
  const listener = (e: Event) => {
    handler((e as CustomEvent<NavigateDetail>).detail);
  };

  window.addEventListener(NAVIGATE_EVENT, listener);
  return () => window.removeEventListener(NAVIGATE_EVENT, listener);
};
