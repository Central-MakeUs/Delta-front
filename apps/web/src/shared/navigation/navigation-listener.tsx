"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onNavigate } from "@/shared/navigation/navigation-events";

const NavigationListener = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const lastToRef = useRef<string | null>(null);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    lastToRef.current = null;

    return onNavigate(({ to, replace }) => {
      const currentPathname = pathnameRef.current;

      if (currentPathname === to) return;
      if (lastToRef.current === to) return;

      lastToRef.current = to;

      if (replace) router.replace(to);
      else router.push(to);
    });
  }, [router]);

  return null;
};

export default NavigationListener;
