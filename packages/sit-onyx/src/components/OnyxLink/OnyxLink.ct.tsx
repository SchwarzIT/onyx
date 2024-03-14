import { executeScreenshotsForAllStates } from "../../utils/playwright";
import OnyxLink from "./OnyxLink.vue";

const STATES = {
  state: ["default", "external"],
  focusState: ["", "hover", "focus-visible"],
} as const;

executeScreenshotsForAllStates(STATES, "link", async ({ state, focusState }, mount, page) => {
  const component = await mount(
    <OnyxLink
      href={state === "external" ? "https://onyx.schwarz" : "#"}
      style="font-family: var(--onyx-font-family);"
    >
      Click me
    </OnyxLink>,
  );

  if (focusState === "focus-visible") await page.keyboard.press("Tab");
  if (focusState === "hover") await component.hover();
  return component;
});
