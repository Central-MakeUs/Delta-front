import type { Meta, StoryObj } from "@storybook/react";
import { lightTheme } from "@/shared/styles/theme.css";
import {
  TYPOGRAPHY_CLASS_MAP,
  TYPOGRAPHY_KEYS,
} from "@/stories/foundations/tokens/typography";

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

export const Typography: Story = {
  render: () => (
    <div className={`${lightTheme} space-y-6 bg-white p-12`}>
      {TYPOGRAPHY_KEYS.map((key) => (
        <div key={key} className="space-y-2">
          <p className="cap_14_m" style={{ color: "rgba(0,0,0,0.5)" }}>
            {key}
          </p>
          <p className={TYPOGRAPHY_CLASS_MAP[key]}>
            세모 sample text using the <b>{key}</b> style.
          </p>
        </div>
      ))}
    </div>
  ),
};
