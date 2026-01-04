import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Delta Design System",
    brandUrl: "https://6958ed998a70eb8f766fada4-kqnrprizoy.chromatic.com/",
    brandImage: "/logo-title.svg",
    brandTarget: "_self",
  }),
});
