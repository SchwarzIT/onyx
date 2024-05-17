import { executeMatrixScreenshotTest } from "src/playwright/screenshots";
import { expect, test } from "../../playwright/a11y";
import OnyxTimer from "./OnyxTimer.vue";

const endTime = new Date("June 21 2026 13:00:30");
const endTimeEvent = new Date("June 21 2026 13:00:02");

const defaultProps = {
  endTime: endTime.toISOString(),
};

test.describe("Timer", () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      const fakeNow = new Date("June 21 2026 13:00:00").valueOf();
      const __DateNowOffset = fakeNow - Date.now();
      const __DateNow = Date.now;
      Date.now = () => __DateNow() + __DateNowOffset;
    });
  });
  test("should render timer", async ({ mount }) => {
    // ARRANGE
    const component = await mount(OnyxTimer, {
      props: defaultProps,
    });

    await expect(component).toContainText("00:29 seconds");
  });

  test.describe("Screenshot tests", () => {
    executeMatrixScreenshotTest({
      name: "Timer",
      columns: ["default"],
      rows: ["default", "with-label"],
      // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
      disabledAccessibilityRules: ["color-contrast"],
      component: (column, row) => (
        <OnyxTimer
          endTime={endTime.toISOString()}
          label={row === "with-label" ? "Label" : undefined}
        />
      ),
    });
  });

  test("should render timer with no time left", async ({ mount }) => {
    // ARRANGE
    const component = await mount(OnyxTimer, {
      props: { ...defaultProps, endTime: new Date("June 21 2026 13:00:00").toISOString() },
    });

    // ASSERT
    await expect(component).toContainText(/00:00 seconds/);
  });

  test("emits event when timer is finished and renders 2 seconds", async ({ mount, page }) => {
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
