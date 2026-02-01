"use client";

import * as s from "@/app/pro/components/fixed-bottom-cta/fixed-bottom-cta.css";
import { Button } from "@/shared/components/button/button/button";

type Props = {
  label: string;
  onClick: () => void;
};

export const FixedBottomCta = ({ label, onClick }: Props) => {
  return (
    <div className={s.wrap}>
      <Button fullWidth tone="complete" label={label} onClick={onClick} />
    </div>
  );
};
