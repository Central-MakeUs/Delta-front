"use client";

import { InlineMath } from "react-katex";

interface MathTextProps {
  text?: string | null;
  className?: string;
}

const MathText = ({ text, className }: MathTextProps) => {
  const safeText = typeof text === "string" ? text : "";
  if (!safeText) return null;

  const normalized = safeText.replace(/\\n/g, "\n").replace(/<br\s*\/?>/gi, "\n");
  const lines = normalized.split("\n");

  return (
    <p className={className}>
      {lines.map((line, lineIdx) => {
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

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
            <InlineMath
              key={`math-${lineIdx}-${match.index}`}
              math={match[1]}
            />
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
