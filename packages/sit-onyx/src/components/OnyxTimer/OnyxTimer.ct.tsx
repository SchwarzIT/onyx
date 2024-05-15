import { expect, test } from "../../playwright/a11y";
import OnyxTimer from "./OnyxTimer.vue";

const endTime = new Date();
endTime.setTime(Date.now() + 30 * 1000);

const defaultProps = {
  endTime: endTime.toISOString(),
  isPaused: true,
};

test.describe("Timer", () => {
  test("should render timer", async ({ mount }) => {
    // ARRANGE
    const component = await mount(OnyxTimer, {
      props: defaultProps,
    });

    // ASSERT
    await expect(component).toHaveScreenshot("default.png");

    // can't rely on exact seconds since browser rendering is delayed
    await expect(component).toContainText(/00:\d{2} seconds/);

    // need to disable rule: disabledAccessibilityRules: ["color-contrast"],

    // ACT
    //   const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    //   expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should render timer with no time left", async ({ mount }) => {
    // ARRANGE
    const component = await mount(OnyxTimer, {
      props: { ...defaultProps, endTime: new Date().toISOString() },
    });

    // ASSERT
    await expect(component).toHaveScreenshot("default.png");

    await expect(component).toContainText(/00:00 seconds/);
  });
});
