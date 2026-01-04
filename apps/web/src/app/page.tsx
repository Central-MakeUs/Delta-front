"use client";

import { useState } from "react";
import { Toggle } from "@/shared/components/toggle/toggle";

type QuestionType = "objective" | "subjective";

export const Home = () => {
  const [type, setType] = useState<QuestionType>("objective");

  return (
    <Toggle<QuestionType>
      value={type}
      onValueChange={setType}
      options={[
        { value: "objective", label: "객관식" },
        { value: "subjective", label: "주관식" },
      ]}
    />
  );
};

export default Home;
