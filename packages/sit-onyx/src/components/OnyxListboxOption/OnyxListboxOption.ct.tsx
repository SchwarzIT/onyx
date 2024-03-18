import { executeScreenshotsForAllStates } from "@/utils/playwright";
import { test } from "../../playwright-axe";
import OnyxListboxOption from "./OnyxListboxOption.vue";

const STATES = {
  state: ["default", "selected"],
  writeMode: ["enabled", "disabled"],
  focusState: ["", "hover", "focus-visible"],
} as const;

test.describe("state screenshot tests", () => {
  executeScreenshotsForAllStates(
    STATES,
    "listbox-option",
    async ({ state, writeMode, focusState }, mount, page) => {
      const component = await mount(
        <OnyxListboxOption
          label="Label"
          modelValue={state === "selected"}
          disabled={writeMode === "disabled"}
        />,
      );

      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await component.hover();
      return component;
    },
  );
});
