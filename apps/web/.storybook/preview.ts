import type { Preview } from "@storybook/nextjs";
import React from "react";
import "../src/shared/styles/index.css";
import { lightTheme } from "../src/shared/styles/theme.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        "div",
        { className: lightTheme },
        React.createElement(Story)
      ),
  ],
};

export default preview;
