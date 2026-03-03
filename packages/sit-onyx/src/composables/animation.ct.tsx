import type { Locator } from "@playwright/test";
import { expect, test } from "../playwright/a11y.js";
import TestCase from "./AnimationTestCase.vue";

const getAnimationStart = (locator: Locator) =>
  locator.evaluate((e) => Number(e.getAnimations().at(0)?.startTime));

test("should sync animation start time", async ({ mount, page }) => {
  // ARRANGE
  await mount(<TestCase />);
  await page.getByTestId("delayed").waitFor({ state: "visible" });

  const immediateSkeleton = page.getByTestId("immediate");
  const delayedSkeleton = page.getByTestId("delayed");

  await expect(
    async () => {
      const immediate = await getAnimationStart(immediateSkeleton);
      const delayed = await getAnimationStart(delayedSkeleton);
      expect(immediate).toBeDefined();
      expect(delayed).toBeDefined();
      expect(immediate).toEqual(delayed);
      expect(delayed).toBe(0);
    },
    { message: "animation should synced eventually (uses requestIdleCallback)" },
  ).toPass();
});
