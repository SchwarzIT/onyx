import { createScreenshotsForAllStates } from "@/utils/playwright";
import { test } from "../../playwright-axe";
import OnyxFlyoutOption from "./OnyxFlyoutOption.vue";

const STATES = {
  state: ["default", "selected"],
  writeMode: ["enabled", "disabled"],
  focusState: ["", "hover", "focus-visible"],
} as const;

test(
  "State screenshot testing",
  createScreenshotsForAllStates(
    STATES,
    "flyout-option",
    async ({ state, writeMode, focusState }, mount, page) => {
      const component = await mount(
        <OnyxFlyoutOption
          label="Label"
          modelValue={state === "selected"}
          disabled={writeMode === "disabled"}
        />,
      );

      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await component.hover();
      return component;
    },
  ),
);
