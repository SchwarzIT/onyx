import { expect, test } from "../playwright/a11y";
import TestCase from "./AnimationTestCase.vue";

test("should sync animation start time", async ({ mount, page }) => {
  // ARRANGE
  await mount(<TestCase />);
  await page.getByTestId("delayed").waitFor({ state: "visible" });

  const [immediate, delayed] = await page.evaluate(() =>
    document.getAnimations().map((a) => Number(a.startTime)),
  );

  expect(immediate).toBeDefined();
  expect(delayed).toBeDefined();
  expect(immediate).toEqual(delayed);
  expect(delayed).toBe(0);
});
