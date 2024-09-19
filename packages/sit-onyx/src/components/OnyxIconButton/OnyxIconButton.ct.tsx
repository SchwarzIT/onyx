import type { HTMLAttributes } from "vue";
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

test("should behave correctly", async ({ page, mount }) => {
  const clickSpy: MouseEvent[] = [];
  const setup = {
    props: {
      label: "trigger something",
      icon: mockPlaywrightIcon,
      onClick: (e) => clickSpy.push(e),
    } satisfies OnyxIconButtonProps & HTMLAttributes,
  };

  // ARRANGE
  const component = await mount(OnyxIconButton, setup);
  const buttonElement = page.getByRole("button");

  await test.step("clickable by default", async () => {
    // ACT
    await buttonElement.click();
    // ASSERT
    await expect(buttonElement).toBeEnabled();
    expect(clickSpy).toHaveLength(1);
  });

  await test.step("not interactive when disabled ", async () => {
    // ARRANGE
    await component.update({ ...setup, props: { disabled: true } }); // ACT
    // ACT
    // eslint-disable-next-line playwright/no-force-option
    await buttonElement.click({ force: true });
    // ASSERT
    await expect(buttonElement).toBeDisabled();
    expect(clickSpy).toHaveLength(1);
  });

  await test.step("not interactive when loading ", async () => {
    // ARRANGE
    await component.update({ ...setup, props: { disabled: false, loading: true } });
    // ASSERT
    await expect(buttonElement).toBeDisabled();
  });

  await test.step("clickable again ", async () => {
    // ARRANGE
    await component.update({ ...setup, props: { disabled: false, loading: false } });
    // ACT
    await buttonElement.click();
    // ASSERT
    await expect(buttonElement).toBeEnabled();
    expect(clickSpy).toHaveLength(2);
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
