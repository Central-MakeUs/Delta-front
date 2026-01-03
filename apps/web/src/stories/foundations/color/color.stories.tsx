import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
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

type Group = { id: string; title: string; tokens: readonly Key[] };

const GROUPS: readonly Group[] = [
  { id: "main", title: "Main Colors", tokens: MAIN_KEYS },
  { id: "grayscale", title: "Grayscale", tokens: GRAYSCALE_KEYS },
  { id: "success", title: "Success", tokens: SUCCESS_KEYS },
  { id: "warning", title: "Warning", tokens: WARNING_KEYS },
  { id: "error", title: "Error", tokens: ERROR_KEYS },
  { id: "etc", title: "Etc", tokens: ETC_KEYS },
] as const;

type TabId = "all" | (typeof GROUPS)[number]["id"];

function ColorBox({ token }: { token: Key }) {
  return (
    <div className={styles.box}>
      <div className={`${styles.swatch} ${bgColor[token]}`} />
      <span className={styles.tokenName}>{token}</span>
      <span className={`${styles.sampleText} ${color[token]}`}>test</span>
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

function ColorPage() {
  const [active, setActive] = useState<TabId>("main");

  const activeGroup = useMemo(() => {
    return GROUPS.find((g) => g.id === active) ?? GROUPS[0];
  }, [active]);

  return (
    <div className={`${lightTheme} ${styles.page}`}>
      <div className={styles.tabs} role="tablist" aria-label="Color categories">
        <button
          type="button"
          role="tab"
          aria-selected={active === "all"}
          className={`${styles.tab} ${active === "all" ? styles.tabActive : ""}`}
          onClick={() => setActive("all")}
        >
          All
        </button>

        {GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={active === g.id}
            className={`${styles.tab} ${active === g.id ? styles.tabActive : ""}`}
            onClick={() => setActive(g.id)}
          >
            {g.title}
          </button>
        ))}
      </div>

      {active === "all" ? (
        <>
          {GROUPS.map((g) => (
            <ColorGroup key={g.id} title={g.title} tokens={g.tokens} />
          ))}
        </>
      ) : (
        <ColorGroup title={activeGroup.title} tokens={activeGroup.tokens} />
      )}
    </div>
  );
}

export const Color: Story = {
  render: () => <ColorPage />,
};
