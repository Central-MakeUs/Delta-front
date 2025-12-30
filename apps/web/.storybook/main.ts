import type { StorybookConfig } from '@storybook/nextjs';
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: [
    "../public"
  ],
  webpackFinal: async (config) => {
    // Vanilla Extract 플러그인 추가
    if (config.plugins) {
      config.plugins.push(new VanillaExtractPlugin());
    } else {
      config.plugins = [new VanillaExtractPlugin()];
    }

    return config;
  },
};

export default config;