import "@/shared/styles/index.css";
import "@/shared/styles/global.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { SPRITE } from "@/shared/constants/sprite";
import { lightTheme } from "@/shared/styles/theme.css";
import { rootStyle } from "@/shared/styles/global.css";
import ClientShell from "@/app/client-shell";
import { ToastProvider } from "@/shared/components/toast/toast-provider/toast-provider";
import NavigationListener from "@/shared/navigation/navigation-listener";

export const metadata: Metadata = {
  title: "세모",
  description: "나만의 수학 오답노트",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

const SvgSpriteInjector = () => {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
      }}
      dangerouslySetInnerHTML={{ __html: SPRITE }}
    />
  );
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ko" className={lightTheme}>
      <body>
        <NavigationListener />
        <SvgSpriteInjector />
        <ToastProvider />
        <div className={rootStyle}>
          <Suspense fallback={null}>
            <ClientShell>{children}</ClientShell>
          </Suspense>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
