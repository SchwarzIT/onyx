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
      const fakeNow = new Date("June 21 2026 13:00:00").getTime();
      Date.now = () => fakeNow;
    });
  });
  test("should render timer", async ({ mount }) => {
    // ARRANGE
    const component = await mount(OnyxTimer, {
      props: defaultProps,
    });

    await expect(component).toContainText("00:30 seconds");
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

  test("emits event when timer is finished and renders 2 seconds", async ({ mount, page }) => {
    let timerEnded = false;
    // ARRANGE
    const component = await mount(
      <OnyxTimer endTime={endTimeEvent.toISOString()} onTimerEnded={() => (timerEnded = true)} />,
    );
    // ASSERT
    await page.evaluate(() => {
      const fakeNow = new Date("June 21 2026 13:00:05").getTime();
      Date.now = () => fakeNow;
    });
    await expect(component).toContainText(/00:00 seconds/);
    await expect(timerEnded).toBeTruthy();
  });
});
