import type { Locator } from "@playwright/test";
import { expect, test } from "../../playwright/a11y.js";
import { dragResizeHandle } from "../../playwright/index.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import TestWrapperCt from "./TestWrapper.ct.vue";

const expectWidth = async (component: Locator, width: number, message?: string) => {
  const box = (await component.boundingBox())!;
  expect(box.width, message).toBe(width);
  return box;
};

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: "body { margin: 0; }",
  });
});

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Resize handle",
    columns: ["default"],
    rows: ["default", "hover", "active"],
    component: () => <TestWrapperCt />,
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const button = component.getByRole("button", { name: "Drag to change width" });
        if (row === "hover") await button.hover();
        if (row === "active") {
          const box = (await button.boundingBox())!;
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.mouse.down();
        }
      },
    },
  });
});

test("should resize", async ({ page, mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<TestWrapperCt />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expectWidth(component, 32);

  // ACT
  await dragResizeHandle({ page, to: 64 });

  // ASSERT
  await expectWidth(component, 64, "should resize by dragging");

  // ACT
  await dragResizeHandle({ page, to: 200 });
  await expectWidth(component, 128, "should consider max-width");

  // ACT
  await dragResizeHandle({ page, to: 0, preventUp: true });
  await expectWidth(component, 16, "should consider min-width");
});

test("should resize left", async ({ page, mount, makeAxeBuilder }) => {
  await page.setViewportSize({ height: 128, width: 256 });

  await page.addStyleTag({
    content: `body {
        display: flex;
        justify-content: flex-end;
      }`,
  });

  // ARRANGE
  const component = await mount(<TestWrapperCt alignment="left" />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expectWidth(component, 32);

  // ACT
  await dragResizeHandle({ page, to: 192 });

  // ASSERT
  await expectWidth(component, 64, "should resize by dragging");

  // ACT
  await dragResizeHandle({ page, to: 32 });
  await expectWidth(component, 128, "should consider max-width");

  // ACT
  await dragResizeHandle({ page, to: 256, preventUp: true });
  await expectWidth(component, 16, "should consider min-width");
});

test("should reset size with double click", async ({ page, mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<TestWrapperCt />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expectWidth(component, 32);

  // ACT
  await dragResizeHandle({ page, to: 64 });

  // ASSERT
  await expectWidth(component, 64, "should resize by dragging");

  // ACT
  const button = component.getByRole("button", { name: "Drag to change width" });
  await button.dblclick();

  // ASSERT
  await expectWidth(component, 32, "should reset width with double click");
});

test("should cancel current resizing with Escape", async ({ page, mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<TestWrapperCt />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expectWidth(component, 32);

  // ACT
  await dragResizeHandle({ page, to: 64 });

  // ASSERT
  await expectWidth(component, 64, "should resize by dragging");

  // ACT
  await dragResizeHandle({ page, to: 100, preventUp: true });

  // ASSERT
  await expectWidth(component, 100, "should resize by dragging");

  // ACT
  await page.keyboard.press("Escape");

  // ASSERT
  await expectWidth(component, 64, "should cancel current resizing with Escape");
});
