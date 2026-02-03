"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/shared/components/loading/loading";

const AppLoading = () => {
  const pathname = usePathname();
  const sp = useSearchParams();
  const step = sp.get("step");

  const isWrongPage = pathname === "/wrong";
  const isWrongCreateStep2or3 =
    pathname === "/wrong/create" &&
    (step === "1" || step === "2" || step === "3");

  if (isWrongPage || isWrongCreateStep2or3) return null;

  return <Loading variant="overlay" showMessage={false} />;
};

export default AppLoading;
