import { test } from "../../playwright-axe";
import { executeScreenshotsForAllStates } from "../../utils/playwright";
import OnyxListboxOption from "./OnyxListboxOption.vue";

const SINGLE_STATES = {
  state: ["default", "selected"],
  writeMode: ["enabled", "disabled"],
  focusState: ["", "hover", "focus-visible"],
} as const;

test.describe("state screenshot tests single select", () => {
  executeScreenshotsForAllStates(
    SINGLE_STATES,
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

const MULTIPLE_STATES = {
  state: ["default", "selected"],
} as const;

test.describe("state screenshot tests multiselect", () => {
  executeScreenshotsForAllStates(MULTIPLE_STATES, "listbox-multiple", async ({ state }, mount) => {
    const component = await mount(
      <OnyxListboxOption
        aria-label="Label"
        aria-selected={state === "selected"}
        multiple
        selected={state === "selected"}
      >
        Label
      </OnyxListboxOption>,
    );

    return component;
  });
});
