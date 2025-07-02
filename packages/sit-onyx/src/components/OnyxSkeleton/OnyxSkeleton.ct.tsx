import { expect, test } from "../../playwright/a11y.js";
import OnyxSkeleton from "./OnyxSkeleton.vue";

test("should render", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxSkeleton style={{ width: "6rem", height: "2rem" }} />);

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
