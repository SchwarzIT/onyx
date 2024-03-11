import { test } from "../../playwright-axe";
import { createScreenshotsForAllStates, mockPlaywrightIcon } from "../../utils/playwright";
import OnyxIconButton from "./OnyxIconButton.vue";

const STATES = {
  state: ["default", "disabled", "loading"],
  variation: ["primary", "secondary", "danger"],
  focusState: ["none", "hover", "focus-visible", "active"],
} as const;

test(
  "State screenshot testing",
  createScreenshotsForAllStates(
    STATES,
    "icon-button",
    async ({ variation, state, focusState }, mount, page) => {
      const component = await mount(
        <OnyxIconButton
          label="label"
          loading={state === "loading"}
          variation={variation}
          disabled={state === "disabled"}
          icon={mockPlaywrightIcon}
        />,
      );

      const button = component.getByRole("button");
      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await button.hover();
      if (focusState === "active") await page.mouse.down();
      return component;
    },
  ),
);
