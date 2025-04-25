import { expect, test } from "../playwright/a11y";

import TestCase from "./useAnchorPostionPolyfillTestCase.vue";

test("should position tooltip correctly after scrolling", async ({ mount, page }) => {
  // ARRANGE
  await mount(TestCase);
  const positionedElement = page.getByText("Positioned");
  const targetElement = page.getByText("Target");

  let positionedBoundingBox = await positionedElement.boundingBox();
  let targetBoundingBox = await targetElement.boundingBox();

  expect(positionedBoundingBox!.y + targetBoundingBox!.height).toBe(targetBoundingBox!.y);

  const scrollY = await page.evaluate(() => {
    window.scrollBy(0, 50);
    return window.scrollY;
  });

  positionedBoundingBox = await positionedElement.boundingBox();
  targetBoundingBox = await targetElement.boundingBox();

  expect(positionedBoundingBox!.y + targetBoundingBox!.height + scrollY).toBe(targetBoundingBox!.y);
});
