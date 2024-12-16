import { expect, test } from "../../playwright/a11y";
import TestWrapperCt from "./TestWrapper.ct.vue";

test("should behave correctly", async ({ mount, makeAxeBuilder }) => {
  let closeEventCount = 0;

  // ARRANGE
  const component = await mount(<TestWrapperCt onClose={() => closeEventCount++} />);
  const closeButton = component.getByRole("button", { name: "Close dialog" });

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ACT
  await closeButton.click();

  // ASSERT
  expect(closeEventCount).toBe(1);
});
