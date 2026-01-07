"use client";

import { useRouter } from "next/navigation";
import BottomNavItem from "@/shared/components/bottom-nav/bottom-nav-item";
import { useBottomNav } from "@/shared/components/bottom-nav/hooks/use-bottom-nav";
import * as s from "@/shared/components/bottom-nav/bottom-nav.css";

export const BottomNav = () => {
  const router = useRouter();
  const { isHidden, activeKey, items } = useBottomNav();
  const handleNavigate = (href: string) => {
    router.push(href);
  };
  if (isHidden) return null;

  return (
    <>
      <div className={s.spacer} aria-hidden />
      <nav className={s.root} aria-label="하단 내비게이션">
        <div className={s.container}>
          <div className={s.list}>
            {items.map((item) => {
              const isActive = activeKey === item.key;
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
