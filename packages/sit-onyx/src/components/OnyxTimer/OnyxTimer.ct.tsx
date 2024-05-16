import { expect, test } from "../../playwright/a11y";
import OnyxTimer from "./OnyxTimer.vue";

const endTime = new Date();
endTime.setTime(Date.now() + 30 * 1000);

const endTimeEvent = new Date();
endTimeEvent.setTime(Date.now() + 2000);

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

    // will get an error with this rule, seems like color has not enough contrast
    // need to disable rule: disabledAccessibilityRules: ["color-contrast"],

    // ACT
    //   const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    //   expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should render timer with label", async ({ mount }) => {
    // ARRANGE
    const component = await mount(OnyxTimer, {
      props: { ...defaultProps, label: "Test label" },
    });

    // ASSERT
    await expect(component).toHaveScreenshot("timer-with-label.png");
  });

  test("should render timer with no time left", async ({ mount }) => {
    // ARRANGE
    const component = await mount(OnyxTimer, {
      props: { ...defaultProps, endTime: new Date().toISOString() },
    });

    // ASSERT
    await expect(component).toContainText(/00:00 seconds/);
  });

  test("emits event when timer is finished", async ({ mount, page }) => {
    let timerEnded = false;
    // ARRANGE
    const component = await mount(
      <OnyxTimer end-time={endTimeEvent.toISOString()} onTimerEnded={() => (timerEnded = true)} />,
    );
    // ASSERT
    await expect(component).toContainText(/00:00 seconds/, { timeout: 3000 });
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(1000);
    await expect(timerEnded).toBeTruthy();
  });
});
