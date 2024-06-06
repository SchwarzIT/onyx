import { expect, test } from "../../playwright/a11y";
import TestInput from "./TestInput.vue";

test("should display label", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<TestInput label="Hello World" />);

  // ASSERT
  await expect(component).toContainText("Hello World");
  await expect(component).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should validate required inputs", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<TestInput label="Demo" required />);
  const input = component.getByLabel("Demo");

  // ACT
  await input.focus();
  await input.blur();

  // ASSERT
  await expect(component).toContainText("Please fill in this field.");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
