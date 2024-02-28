import { test } from "../../playwright-axe";
import { createScreenshotsForAllStates } from "../../utils/playwright";
import OnyxLink from "./OnyxLink.vue";

const STATES = {
  state: ["default"],
  focusState: ["", "hover", "focus-visible"],
} as const;

test(
  "State screenshot testing",
  createScreenshotsForAllStates(STATES, "link", async ({ focusState }, mount, page) => {
    const component = await mount(
      <OnyxLink href="#" style="font-family: var(--onyx-font-family);">
        Click me
      </OnyxLink>,
    );

    if (focusState === "focus-visible") await page.keyboard.press("Tab");
    if (focusState === "hover") await component.hover();
    return component;
  }),
);
