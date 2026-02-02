"use client";

import * as s from "@/app/pro/components/bottom-cta/bottom-cta.css";
import { Button } from "@/shared/components/button/button/button";

type Props = {
  label: string;
  onClick: () => void;
};

const BottomCta = ({ label, onClick }: Props) => {
  return (
    <div className={s.wrap}>
      <Button fullWidth tone="complete" label={label} onClick={onClick} />
    </div>
  );
};

export default BottomCta;
