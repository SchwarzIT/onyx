import { expect, test } from "../../playwright/a11y";
import TestWrapperCt from "./TestWrapper.ct.vue";

test("should render", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(TestWrapperCt, {
    props: {
      count: 3.5,
    },
  });

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expect(component.getByLabel("Element 5")).toBeInViewport({ ratio: 1 });
  await expect(component.getByLabel("Element 6")).not.toBeInViewport({ ratio: 1 });
});
