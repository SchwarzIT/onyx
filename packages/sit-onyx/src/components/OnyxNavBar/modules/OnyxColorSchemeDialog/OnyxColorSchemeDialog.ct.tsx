import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../../../playwright/screenshots.js";
import OnyxColorSchemeDialog from "./OnyxColorSchemeDialog.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Color scheme dialog",
    columns: ["default"],
    rows: ["default", "hover", "mobile"],
    component: () => <OnyxColorSchemeDialog modelValue={"auto"} open />,
    hooks: {
      // set component size to fully include the tooltip
      beforeEach: async (component, page, column, row) => {
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
          await component.getByText("Auto", { exact: true }).hover();
        }
      },
    },
  });
});

test("should behave correctly", async ({ mount, page }) => {
  await page.setViewportSize({ width: 512, height: 640 });

  const onUpdateModelValue = createEmitSpy<typeof OnyxColorSchemeDialog, "onUpdate:modelValue">();
  const onUpdateOpen = createEmitSpy<typeof OnyxColorSchemeDialog, "onUpdate:open">();

  // ARRANGE
  const component = await mount(
    <OnyxColorSchemeDialog
      modelValue="light"
      open
      style={{ width: "48rem" }}
      onUpdate:modelValue={onUpdateModelValue}
      onUpdate:open={onUpdateOpen}
    />,
  );

  const clickOption = (label: string) => {
    return component.getByText(label, { exact: true }).click();
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
  expectEmit(onUpdateModelValue, 1, ["dark"]);
  expectEmit(onUpdateOpen, 1, [false]);

  // ACT
  await clickOption("Auto");

  // ASSERT
  expectEmit(onUpdateModelValue, 1);

  await component.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  expectEmit(onUpdateModelValue, 2, ["auto"]);
  expectEmit(onUpdateOpen, 2, [false]);

  // ACT
  await clickOption("Light");
  await component.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  expectEmit(onUpdateModelValue, 3, ["light"]);
  expectEmit(onUpdateOpen, 3, [false]);

  // ACT
  await component.getByRole("button", { name: "Cancel" }).click();

  // ASSERT
  expectEmit(onUpdateOpen, 4, [false]);

  // ACT
  await page.keyboard.press("Escape");

  // ASSERT
  expectEmit(onUpdateOpen, 5, [false]);
});
