import type { ComponentPropsWithoutRef } from "react";
import Icon from "@/shared/components/icon/icon";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import * as s from "@/app/wrong/create/components/ai-solution-field/ai-solution-field.css";

type Props = {
  title?: string;
  description?: string;
} & ComponentPropsWithoutRef<"section">;

export const AiSolutionField = ({
  title = "세모 AI와 함께 문제를 풀어요",
  description = "문제를 풀 때 AI 풀이로 함께 문제를 풀거나 풀이를 직접 입력하면서 공부해요.",
  className,
  ...rest
}: Props) => {
  const rootClassName = [s.root, className].filter(Boolean).join(" ");

  return (
    <section className={rootClassName} {...rest}>
      <div className={s.top}>
        <Icon name="ai-pencil" size={2.4} />
        <p className={[typo.body2.semibold, color["main-500"]].join(" ")}>
          {title}
        </p>
      </div>

      <p
        className={[
          typo.body3.regular,
          color["grayscale-900"],
          s.description,
        ].join(" ")}
      >
        {description}
      </p>
    </section>
  );
};
