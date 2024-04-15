import { executeScreenshotsForAllStates } from "../../../utils/playwright";
import { test } from "../../../playwright-axe";
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
    async ({ state, writeMode, focusState }, mount) => {
      const component = await mount(
        <OnyxListboxOption
          aria-label="Label"
          aria-selected={state === "selected"}
          aria-disabled={writeMode === "disabled"}
          active={focusState === "focus-visible"}
        >
          Label
        </OnyxListboxOption>,
      );

      if (focusState === "hover") await component.hover();
      return component;
    },
  );
});
