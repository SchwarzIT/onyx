import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright-axe";
import {
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
  type MatrixScreenshotTestOptions,
} from "../../playwright/screenshots";
import { BUTTON_VARIATIONS } from "../OnyxButton/types";
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

test.describe("Screenshot tests", () => {
  const beforeScreenshot: MatrixScreenshotTestOptions["beforeScreenshot"] = async (
    component,
    page,
    column,
    row,
  ) => {
    if (row === "hover") await component.hover();
    if (row === "focus-visible") await page.keyboard.press("Tab");
    if (row === "active") await page.mouse.down();
  };

  for (const state of ["default", "disabled"] as const) {
    executeMatrixScreenshotTest({
      name: `Icon button (${state})`,
      columns: BUTTON_VARIATIONS,
      rows: ["default", "hover", "active", "focus-visible"],
      beforeScreenshot,
      component: (column) => (
        <OnyxIconButton
          label="Test label"
          icon={mockPlaywrightIcon}
          variation={column}
          disabled={state === "disabled"}
        />
      ),
    });
  }

  for (const state of ["densities", "loading"] as const) {
    executeMatrixScreenshotTest({
      name: `Icon button (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "active", "focus-visible"],
      beforeScreenshot,
      component: (column) => (
        <OnyxIconButton
          label="Test label"
          icon={mockPlaywrightIcon}
          density={column}
          loading={state === "loading"}
        />
      ),
    });
  }
});
