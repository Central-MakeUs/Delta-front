import type { Meta, StoryObj } from "@storybook/react";
import { lightTheme } from "@/shared/styles/theme.css";
import {
  TYPOGRAPHY_CLASS_MAP,
  TYPOGRAPHY_KEYS,
} from "@/stories/foundations/tokens/typography";
import * as styles from "./typography.stories.css";

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

export const Typography: Story = {
  render: () => (
    <div className={`${lightTheme} ${styles.page}`}>
      <header className={styles.header}>
        <h2 className={styles.title}>Typography</h2>
        <p className={styles.desc}>타이포 토큰을 실제 렌더링으로 확인합니다.</p>
      </header>

      <div className={styles.list}>
        {TYPOGRAPHY_KEYS.map((key) => (
          <div key={key} className={styles.row}>
            <div className={styles.key}>{key}</div>
            <div className={styles.sample}>
              <p className={TYPOGRAPHY_CLASS_MAP[key]}>
                세모 sample text using the <b>{key}</b> style.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
