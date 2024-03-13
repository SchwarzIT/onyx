import { expect, test } from "../../playwright-axe";
import { createScreenshotsForAllStates, mockPlaywrightIcon } from "../../utils/playwright";
import OnyxIconButton from "./OnyxIconButton.vue";
import type { OnyxIconButtonProps } from "./types";

test("should behave correctly", async ({ mount }) => {
  let clicks = 0;
  const setup = {
    props: {
      label: "trigger something",
      icon: mockPlaywrightIcon,
    } satisfies OnyxIconButtonProps,
    on: {
      click: () => clicks++,
    },
  };

  // ARRANGE
  const component = await mount(OnyxIconButton, setup);

  await test.step("clickable by default", async () => {
    // ACT
    await component.click();
    // ASSERT
    expect(clicks).toBe(1);
  });

  await test.step("not interactive when disabled ", async () => {
    // ARRANGE
    await component.update({ ...setup, props: { disabled: true } });
    // ASSERT
    await expect(component).toBeDisabled();
  });

  await test.step("not interactive when loading ", async () => {
    // ARRANGE
    await component.update({ ...setup, props: { disabled: false, loading: true } });
    // ASSERT
    await expect(component).toBeDisabled();
  });

  await test.step("clickable again ", async () => {
    // ARRANGE
    await component.update({ ...setup, props: { disabled: false, loading: false } });
    // ACT
    await component.click();
    // ASSERT
    expect(clicks).toBe(2);
  });
});

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
