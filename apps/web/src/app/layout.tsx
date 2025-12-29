import "@/shared/styles/index.css.ts";
import { rootStyle } from "@/shared/styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className={rootStyle}>{children}</div>
      </body>
    </html>
  );
}
