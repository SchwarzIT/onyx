import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../playwright/a11y.js";
import OnyxSkeleton from "./OnyxSkeleton.vue";

test("should render", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const onClick = createEmitSpy();
  const component = await mount(
    <OnyxSkeleton style={{ width: "6rem", height: "2rem" }} onClick={onClick} />,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ACT
  // eslint-disable-next-line playwright/no-force-option -- We want to test and enforce that clicks on skeletons are suppressed.
  await component.click({ force: true });

  // ASSERT
  expectEmit(onClick, 0);
});
