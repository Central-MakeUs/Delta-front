import type { Meta, StoryObj } from "@storybook/react";
import { lightTheme } from "@/shared/styles/theme.css";
import * as styles from "./logo.stories.css";

const meta: Meta = {
  title: "Foundations/Logo",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

export const Logo: Story = {
  render: () => (
    <div className={`${lightTheme} ${styles.page}`}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.title}>Logo</p>
          <p className={styles.subtitle}>Delta Design System</p>
        </div>

        <div className={styles.preview}>
          <img
            className={styles.image}
            src="/logo.svg"
            alt="Delta logo symbol"
            loading="lazy"
          />
        </div>

        <div className={styles.meta}>
          <span className={styles.badge}>Symbol</span>
          <span className={styles.hint}>SVG</span>
        </div>
      </div>
    </div>
  ),
};
