import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { vars } from "@/shared/styles/theme.css";

const space = vars.space;

const flex = defineProperties({
  properties: {
    display: ["none", "block", "inline-block", "flex"],
    flexDirection: ["row", "column"],
    justifyContent: ["flex-start", "center", "flex-end", "space-between"],
    alignItems: ["flex-start", "center", "flex-end", "stretch"],
    flexWrap: ["nowrap", "wrap"],
    gap: space,
  },
});

const layout = defineProperties({
  properties: {
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,

    width: ["auto", "100%"],
    height: ["auto", "100%"],
  },
  shorthands: {
    p: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    pt: ["paddingTop"],
    pb: ["paddingBottom"],
    pl: ["paddingLeft"],
    pr: ["paddingRight"],

    m: ["marginTop", "marginRight", "marginBottom", "marginLeft"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    mt: ["marginTop"],
    mb: ["marginBottom"],
    ml: ["marginLeft"],
    mr: ["marginRight"],
  },
});

export const sprinkles = createSprinkles(flex, layout);
export type Sprinkles = Parameters<typeof sprinkles>[0];
