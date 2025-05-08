import type { Locator } from "@playwright/test";
import { expect, test } from "../../playwright/a11y";
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

test("should resize", async ({ page, mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<TestWrapperCt />);
  const button = component.getByRole("button", { name: "Drag to change width" });

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expectWidth(component, 32);

  // ACT
  await button.hover();
  await page.mouse.down();
  await page.mouse.move(64, 0);

  // ASSERT
  await expectWidth(component, 64, "should resize by dragging");

  // ACT
  await page.mouse.move(200, 0);
  await expectWidth(component, 128, "should consider max-width");

  // ACT
  await page.mouse.move(0, 0);
  await expectWidth(component, 16, "should consider min-width");
});

test("should reset size with double click", async ({ page, mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<TestWrapperCt />);
  const button = component.getByRole("button", { name: "Drag to change width" });

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expectWidth(component, 32);

  // ACT
  await button.hover();
  await page.mouse.down();
  await page.mouse.move(64, 0);

  // ASSERT
  await expectWidth(component, 64, "should resize by dragging");

  // ACT
  await button.dblclick();

  // ASSERT
  await expectWidth(component, 32, "should reset width with double click");
});

test("should cancel current resizing with Escape", async ({ page, mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<TestWrapperCt />);
  const button = component.getByRole("button", { name: "Drag to change width" });

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expectWidth(component, 32);

  // ACT
  await button.hover();
  await page.mouse.down();
  await page.mouse.move(64, 0);
  await page.mouse.up();

  // ASSERT
  await expectWidth(component, 64, "should resize by dragging");

  // ACT
  await page.mouse.down();
  await page.mouse.move(100, 0);

  // ASSERT
  await expectWidth(component, 100, "should resize by dragging");

  // ACT
  await page.keyboard.press("Escape");

  // ASSERT
  await expectWidth(component, 64, "should cancel current resizing with Escape");
});
