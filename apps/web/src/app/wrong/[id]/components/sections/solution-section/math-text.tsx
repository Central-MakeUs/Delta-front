"use client";

import { InlineMath } from "react-katex";
import * as styles from "./solution-section.css";

interface MathTextProps {
  text: string;
}

const MathText = ({ text }: MathTextProps) => {
  // 리터럴 \n 및 <br> 태그를 실제 개행으로 변환
  const normalized = text
    .replace(/\\n/g, "\n")
    .replace(/<br\s*\/?>/gi, "\n");
  const lines = normalized.split("\n");

  return (
    <p className={styles.solutionPlainText}>
      {lines.map((line, lineIdx) => {
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        // /g 플래그 regex는 매 줄마다 새로 생성해 lastIndex 공유 문제 방지
        const inlineMathRegex = /\$([^$]+)\$/g;
        while ((match = inlineMathRegex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            parts.push(
              <span key={`text-${lineIdx}-${lastIndex}`}>
                {line.slice(lastIndex, match.index)}
              </span>
            );
          }
          parts.push(
            <InlineMath key={`math-${lineIdx}-${match.index}`} math={match[1]} />
          );
          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < line.length) {
          parts.push(
            <span key={`text-${lineIdx}-${lastIndex}-end`}>
              {line.slice(lastIndex)}
            </span>
          );
        }

        return (
          <span key={`line-${lineIdx}`}>
            {parts}
            {lineIdx < lines.length - 1 && <br />}
          </span>
        );
      })}
    </p>
  );
};

export default MathText;
