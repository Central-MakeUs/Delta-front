import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import Icon from "@/shared/components/icon/icon";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import * as s from "@/app/wrong/create/components/ai-solution-text/ai-solution-text.css";

type AiSolutionTextProps = {
  title?: string;
  description?: string;
} & ComponentPropsWithoutRef<"section">;

const AiSolutionText = ({
  title = "세모 AI와 함께 문제를 풀어요",
  description = "문제를 풀 때 AI 풀이로 함께 문제를 풀거나 풀이를 직접 입력하면서 공부해요.",
  className,
  ...rest
}: AiSolutionTextProps) => {
  return (
    <section className={clsx(s.root, className)} {...rest}>
      <div className={s.top}>
        <Icon name="ai-pencil" size={2.4} />
        <p className={clsx(typo.body2.semibold, color["main-500"])}>{title}</p>
      </div>

      <p className={clsx(typo.body3.regular, color["grayscale-900"])}>
        {description}
      </p>
    </section>
  );
};

export default AiSolutionText;
