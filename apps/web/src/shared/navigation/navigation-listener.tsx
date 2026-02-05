"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onNavigate } from "@/shared/navigation/navigation-events";

const NavigationListener = () => {
  const router = useRouter();
  const pathname = usePathname();
  const lastToRef = useRef<string | null>(null);

  useEffect(() => {
    return onNavigate(({ to, replace }) => {
      if (pathname === to) return;
      if (lastToRef.current === to) return;

      lastToRef.current = to;
      if (replace) router.replace(to);
      else router.push(to);
    });
  }, [router, pathname]);

  return null;
};

export default NavigationListener;
