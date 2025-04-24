import { expect, test } from "../playwright/a11y";

import TestCase from "./useAnchorPostionPolyfillTestCase.vue";

test("should position tooltip correctly after scrolling", async ({ mount, page }) => {
  // ARRANGE
  await mount(TestCase);
  const positionedElement = page.getByText("Positioned");
  const targetElement = page.getByText("Target");

  let positionedBoundingBox = await positionedElement.boundingBox();
  let targetBoundingBox = await targetElement.boundingBox();

  expect(positionedBoundingBox!.y + 100).toBe(targetBoundingBox!.y);

  await page.evaluate(() => {
    window.scrollBy(0, 50);
  });

  positionedBoundingBox = await positionedElement.boundingBox();
  targetBoundingBox = await targetElement.boundingBox();

  expect(positionedBoundingBox!.y + 100).toBe(targetBoundingBox!.y);
});
