import { expect, test } from "../../../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../../../playwright/screenshots";
import type { ColorSchemeValue } from "../OnyxColorSchemeDialog/types";
import OnyxColorSchemeMenuItem from "./OnyxColorSchemeMenuItem.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Color scheme menu item",
    columns: ["default"],
    rows: ["default", "hover"],
    component: () => (
      <ul style={{ listStyle: "none", padding: 0 }} role="menu">
        <OnyxColorSchemeMenuItem modelValue="auto" />
      </ul>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "hover") await component.getByText("Appearance: Auto").hover();
      },
    },
  });
});

test("should behave correctly", async ({ page, mount }) => {
  const modelValueEvents: ColorSchemeValue[] = [];

  // ARRANGE
  const component = await mount(OnyxColorSchemeMenuItem, {
    props: {
      modelValue: "auto",
    },
    on: {
      "update:modelValue": (value: ColorSchemeValue) => modelValueEvents.push(value),
    },
  });

  // ASSERT
  await expect(component).toContainText("Appearance: Auto");

  // ACT
  await component.click();

  // ASSERT
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  // ACT
  await dialog.getByText("Light").click();
  await dialog.getByRole("button", { name: "Apply" }).click();
  await component.update({ props: { modelValue: "light" } });

  // ASSERT
  expect(modelValueEvents).toStrictEqual(["light"]);
  await expect(component).toContainText("Appearance: Light");
});
