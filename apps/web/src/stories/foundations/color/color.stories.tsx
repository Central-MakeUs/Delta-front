import type { Meta, StoryObj } from "@storybook/react";
import { lightTheme } from "@/shared/styles/theme.css";
import { bgColor, color } from "@/shared/styles/color.css";
import * as styles from "./color.stories.css";

const meta: Meta = {
  title: "Foundations/Color",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

type Key = keyof typeof bgColor;

const MAIN_KEYS = [
  "main-50",
  "main-100",
  "main-200",
  "main-300",
  "main-400",
  "main-500",
  "main-600",
  "main-700",
  "main-800",
  "main-900",
] as const satisfies readonly Key[];

const GRAYSCALE_KEYS = [
  "grayscale-0",
  "grayscale-50",
  "grayscale-100",
  "grayscale-200",
  "grayscale-300",
  "grayscale-400",
  "grayscale-500",
  "grayscale-600",
  "grayscale-700",
  "grayscale-800",
  "grayscale-900",
  "grayscale-1000",
] as const satisfies readonly Key[];

const SUCCESS_KEYS = [
  "success-100",
  "success-500",
  "success-700",
] as const satisfies readonly Key[];

const WARNING_KEYS = [
  "warning-100",
  "warning-500",
  "warning-600",
] as const satisfies readonly Key[];

const ERROR_KEYS = [
  "error-100",
  "error-500",
  "error-700",
] as const satisfies readonly Key[];
const ETC_KEYS = ["login-kakao"] as const satisfies readonly Key[];

function ColorBox({ token }: { token: Key }) {
  return (
    <div className={styles.box}>
      <div className={`${styles.swatch} ${bgColor[token]}`} />
      <span className={styles.tokenName}>{token}</span>
      <span className={`${styles.sampleText} ${color[token]}`}>
        Sample text
      </span>
    </div>
  );
}

function ColorGroup({
  title,
  tokens,
}: {
  title: string;
  tokens: readonly Key[];
}) {
  return (
    <section className={styles.group}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <div className={styles.grid}>
        {tokens.map((t) => (
          <ColorBox key={t} token={t} />
        ))}
      </div>
    </section>
  );
}

export const Color: Story = {
  render: () => (
    <div className={`${lightTheme} ${styles.page}`}>
      <ColorGroup title="Main Colors" tokens={MAIN_KEYS} />
      <ColorGroup title="Grayscale" tokens={GRAYSCALE_KEYS} />
      <ColorGroup title="Success" tokens={SUCCESS_KEYS} />
      <ColorGroup title="Warning" tokens={WARNING_KEYS} />
      <ColorGroup title="Error" tokens={ERROR_KEYS} />
      <ColorGroup title="Etc" tokens={ETC_KEYS} />
    </div>
  ),
};
