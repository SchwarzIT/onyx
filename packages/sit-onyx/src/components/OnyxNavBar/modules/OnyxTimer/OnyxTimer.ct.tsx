import { expect, test } from "../../../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../../../playwright/screenshots.js";
import OnyxTimer from "./OnyxTimer.vue";

const MOCK_NOW = new Date(2024, 0, 1, 12);

const getEndDate = (offset: number) => {
  const endTime = new Date(MOCK_NOW);
  endTime.setTime(endTime.getTime() + offset);
  return endTime;
};

test.beforeEach(async ({ page }) => {
  await page.clock.install();
  await page.clock.setFixedTime(MOCK_NOW);
});

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Timer",
    columns: ["default", "with-label"],
    rows: ["seconds", "minutes", "hours"],
    component: (column, row) => {
      const endTimes: Record<typeof row, Date> = {
        seconds: getEndDate(30 * 1000),
        minutes: getEndDate(330 * 1000),
        hours: getEndDate(3930 * 1000),
      };

      return (
        <OnyxTimer endTime={endTimes[row]} label="Label" hideLabel={column !== "with-label"} />
      );
    },
  });
});

test("should emit event when timer is finished", async ({ mount, page }) => {
  let timerEndedCount = 0;
  const endTime = getEndDate(30 * 1000);

  // ARRANGE
  const component = await mount(
    <OnyxTimer endTime={endTime} label="Label" onTimerEnded={() => timerEndedCount++} />,
  );

  await page.clock.setFixedTime(endTime);

  // ASSERT
  await expect(component).toContainText("00:00 sec");
  expect(timerEndedCount).toBe(1);
});
