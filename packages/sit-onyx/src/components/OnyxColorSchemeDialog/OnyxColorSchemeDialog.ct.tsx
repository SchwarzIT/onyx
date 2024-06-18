import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxColorSchemeDialog from "./OnyxColorSchemeDialog.vue";
import type { ColorSchemeValue } from "./types";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Color scheme dialog",
    columns: ["default", "active"],
    rows: ["default", "hover", "mobile"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column) => (
      <OnyxColorSchemeDialog modelValue={column === "active" ? "auto" : undefined} open />
    ),
    // set component size to fully include the tooltip
    beforeScreenshot: async (component, page, column, row) => {
      const size = await component
        .getByRole("dialog")
        .evaluate((element: HTMLElement) => [element.offsetHeight, element.offsetWidth]);

      const height = row === "mobile" ? 832 : size[0] + 48;
      const width = row === "mobile" ? 384 : size[1] + 16;

      await page.setViewportSize({ height, width });

      // set paddings to fit the full tooltip in the screenshot
      await component.evaluate(
        (element, { height, width }) => {
          element.style.height = `${height}px`;
          element.style.width = `${width}px`;
        },
        { height, width },
      );

      if (row === "hover") {
        // eslint-disable-next-line playwright/no-force-option -- since the radio button is visually hidden, we need to use force here
        await component.getByLabel("Auto").hover({ force: true });
      }
    },
  });
});

test("should behave correctly", async ({ mount, page }) => {
  await page.setViewportSize({ width: 512, height: 640 });

  const updateModelValueEvents: ColorSchemeValue[] = [];
  let closeEventCount = 0;

  // ARRANGE
  const component = await mount(
    <OnyxColorSchemeDialog
      modelValue="light"
      open
      style={{ width: "48rem" }}
      onUpdate:modelValue={(value) => updateModelValueEvents.push(value)}
      onClose={() => closeEventCount++}
    />,
  );

  const clickOption = (label: string) => {
    // eslint-disable-next-line playwright/no-force-option -- since the radio button is visually hidden, we need to use force here
    return component.getByLabel(label).click({ force: true });
  };

  // ASSERT (should be focussed initially)
  await expect(component.getByLabel("Light")).toBeFocused();

  // ACT
  await page.keyboard.press("ArrowDown");

  // ASSERT
  await expect(component.getByLabel("Dark")).toBeFocused();

  // ACT
  await page.keyboard.press("Enter");

  // ASSERT
  expect(updateModelValueEvents).toStrictEqual(["dark"]);
  expect(closeEventCount).toBe(1);

  // ACT
  await clickOption("Auto");

  // ASSERT
  expect(updateModelValueEvents).toStrictEqual(["dark"]);

  await component.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  expect(updateModelValueEvents).toStrictEqual(["dark", "auto"]);
  expect(closeEventCount).toBe(2);

  // ACT
  await clickOption("Light");
  await component.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  expect(updateModelValueEvents).toStrictEqual(["dark", "auto", "light"]);
  expect(closeEventCount).toBe(3);

  // ACT
  await component.getByRole("button", { name: "Cancel" }).click();

  // ASSERT
  expect(closeEventCount).toBe(4);

  // ACT
  await page.keyboard.press("Escape");

  // ASSERT
  expect(closeEventCount).toBe(5);
});
