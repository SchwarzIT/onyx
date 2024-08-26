import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import {
  executeMatrixScreenshotTest,
  mockPlaywrightIcon,
  type MatrixScreenshotTestOptions,
} from "../../playwright/screenshots";
import { BUTTON_COLORS } from "../OnyxButton/types";
import OnyxIconButton from "./OnyxIconButton.vue";
import type { OnyxIconButtonProps } from "./types";

test("should behave correctly", async ({ mount }) => {
  const setup = {
    props: {
      label: "trigger something",
      icon: mockPlaywrightIcon,
    } satisfies OnyxIconButtonProps,
  };

  // ARRANGE
  const component = await mount(OnyxIconButton, setup);

  await test.step("clickable by default", async () => {
    // ASSERT
    await expect(component).toBeEnabled();
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
    // ASSERT
    await expect(component).toBeEnabled();
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
      columns: BUTTON_COLORS,
      rows: ["default", "hover", "active", "focus-visible"],
      beforeScreenshot,
      component: (column) => (
        <OnyxIconButton
          label="Test label"
          icon={mockPlaywrightIcon}
          color={column}
          disabled={state === "disabled"}
        />
      ),
    });
  }

  for (const state of ["densities", "loading", "skeleton"] as const) {
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
          skeleton={state === "skeleton"}
        />
      ),
    });
  }
});
