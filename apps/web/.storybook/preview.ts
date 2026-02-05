import type { Preview } from "@storybook/nextjs";
import React, { useEffect } from "react";
import "../src/shared/styles/index.css";
import { lightTheme } from "../src/shared/styles/theme.css";
import { SPRITE } from "../src/shared/constants/sprite";

const SpriteOnce = () => {
  useEffect(() => {
    const id = "__sb_svg_sprite__";
    if (document.getElementById(id)) return;

    const container = document.createElement("div");
    container.id = id;
    container.setAttribute("aria-hidden", "true");
    container.style.position = "absolute";
    container.style.width = "0";
    container.style.height = "0";
    container.style.overflow = "hidden";
    container.innerHTML = SPRITE;

    document.body.prepend(container);
  }, []);

  return null;
};

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
        React.Fragment,
        null,
        React.createElement(SpriteOnce),
        React.createElement(
          "div",
          { className: lightTheme },
          React.createElement(Story)
        )
      ),
  ],
};

export default preview;
