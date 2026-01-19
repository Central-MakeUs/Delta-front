"use client";

import { useRouter, usePathname } from "next/navigation";
import BottomNavItem from "@/shared/components/bottom-nav/bottom-nav-item";
import { useBottomNav } from "@/shared/components/bottom-nav/hooks/use-bottom-nav";
import { ROUTES } from "@/shared/constants/routes";
import * as s from "@/shared/components/bottom-nav/bottom-nav.css";

export const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { isHidden, activeKey, items } = useBottomNav();

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  if (isHidden) return null;

  const isAllowedActiveRoute =
    pathname === ROUTES.HOME ||
    pathname === ROUTES.WRONG.ROOT ||
    pathname === ROUTES.GRAPH.ROOT;

  const safeActiveKey = isAllowedActiveRoute ? activeKey : undefined;

  return (
    <>
      <div className={s.spacer} aria-hidden />
      <nav className={s.root} aria-label="하단 내비게이션">
        <div className={s.container}>
          <div className={s.list}>
            {items.map((item) => {
              const isActive = safeActiveKey === item.key;
              return (
                <BottomNavItem
                  key={item.key}
                  isActive={isActive}
                  label={item.label}
                  iconName={item.iconName(isActive)}
                  onClick={() => handleNavigate(item.href)}
                />
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
