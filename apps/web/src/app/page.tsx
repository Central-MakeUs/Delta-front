"use client";

import { useState } from "react";
import { Toggle } from "@/shared/components/toggle/toggle";

type ToggleValue = "objective" | "subjective";

const OPTIONS = [
  { value: "objective", label: "객관식" },
  { value: "subjective", label: "주관식" },
] as const;

export const Home = () => {
  const [type, setType] = useState<ToggleValue>("objective");

  return (
    <Toggle<ToggleValue>
      value={type}
      onValueChange={setType}
      options={OPTIONS}
    />
  );
};

export default Home;
