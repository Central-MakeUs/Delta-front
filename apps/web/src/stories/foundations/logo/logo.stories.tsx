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
        <p className={styles.title}>LogoSymbol</p>
        <img className={styles.image} src="/logo.svg" alt="Delta logo symbol" />
      </div>
    </div>
  ),
};
