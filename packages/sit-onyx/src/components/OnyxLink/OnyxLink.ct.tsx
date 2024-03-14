import { test } from "../../playwright-axe";
import { createMatrixScreenshotTest } from "../../utils/playwright";
import OnyxLink from "./OnyxLink.vue";

const STATES = {
  state: ["default", "external"],
  focusState: ["", "hover", "focus-visible"],
} as const;

test(
  "state screenshot testing",
  createMatrixScreenshotTest({
    states: STATES,
    component: OnyxLink,
    baseName: "link",
    props: ({ state }) => ({
      href: state === "external" ? "https://onyx.schwarz" : "#",
      style: "font-family: var(--onyx-font-family);",
    }),
    slots: () => ({
      default: "Click me",
    }),
    onAfterUpdate: async ({ focusState }, { component, page }) => {
      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await component.hover();
    },
  }),
);
