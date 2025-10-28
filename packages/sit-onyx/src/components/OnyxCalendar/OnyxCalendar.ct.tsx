import { iconSettings } from "@sit-onyx/icons";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxCalendar from "./OnyxCalendar.vue";
import TestCase from "./TestCase.ct.vue";

const MOCK_NOW = new Date(2024, 9, 23);

const getMockDate = (offset: number) => {
  const date = new Date(MOCK_NOW);
  date.setDate(date.getDate() + offset);
  return date;
};

test.beforeEach(async ({ page }) => {
  await page.clock.install();
  await page.clock.setFixedTime(MOCK_NOW);
});

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Calendar",
    columns: ["small", "big"],
    rows: [
      "default",
      "select",
      "hover",
      "focus-visible",
      "calender-weeks",
      "actions",
      "min-max",
      "skeleton",
      "disabled",
    ],
    component: (column, row) => {
      const minDate = getMockDate(-3);
      const maxDate = getMockDate(3);

      return (
        <OnyxCalendar
          selectionMode="single"
          size={column}
          style={{ width: column === "small" ? "20rem" : "40rem" }}
          skeleton={row === "skeleton"}
          disabled={row === "disabled"}
          min={row === "min-max" ? minDate : undefined}
          max={row === "min-max" ? maxDate : undefined}
          showCalendarWeeks={row === "calender-weeks"}
        >
          {row === "actions" && (
            <template v-slot:actions>
              <OnyxIconButton icon={iconSettings} label="Settings" color="neutral" />
            </template>
          )}
        </OnyxCalendar>
      );
    },
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        const todayButton = component.getByRole("button", { name: MOCK_NOW.getDate().toString() });

        if (row === "select") await todayButton.click();
        if (row === "focus-visible") {
          await todayButton.click();
          await page.keyboard.press("ArrowLeft");
        }
        if (row === "hover") await todayButton.hover();
      },
    },
  });
});

test.describe("Screenshot tests (selection mode)", () => {
  executeMatrixScreenshotTest({
    name: "Calendar (selectionMode)",
    columns: ["small", "big"],
    rows: ["default", "single", "multiple", "range"],
    component: (column, row) => {
      return (
        <OnyxCalendar
          size={column}
          selectionMode={row === "default" ? undefined : row}
          style={{ width: column === "small" ? "20rem" : "40rem" }}
        />
      );
    },
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        if (row !== "default") {
          await component.getByRole("button", { name: "Sunday, October 20" }).click();
        }

        if (row === "range" || row === "multiple") {
          await component.getByRole("button", { name: "Saturday, October 26" }).click();
        }
      },
    },
  });
});

test.describe("Screenshot tests (custom content)", () => {
  executeMatrixScreenshotTest({
    name: "Calendar (custom content + disabled days)",
    columns: ["small", "big"],
    rows: ["custom-content", "custom-disabled-days"],
    component: (column, row) => {
      return (
        <TestCase
          size={column}
          style={{ width: column === "small" ? "20rem" : "40rem" }}
          showContent={row === "custom-content"}
          disabledDays={row === "custom-disabled-days"}
        />
      );
    },
  });
});

test("range mode", async ({ mount, page }) => {
  const minDate = getMockDate(-12);

  // ARRANGE
  const component = await mount(
    <OnyxCalendar
      selectionMode="range"
      style={{ width: "40rem" }}
      min={minDate}
      showCalendarWeeks
    />,
  );
  const startRange = component.getByRole("button", { name: "Tuesday, October 15," });
  const endRange = component.getByRole("button", { name: "Monday, October 21," });
  const endRange2 = component.getByRole("button", { name: "Friday, October 25," });
  const middleDate = component.getByRole("button", { name: "Saturday, October 19," });
  const today = component.getByRole("button", { name: "Wednesday, October 23," });
  const weekNumber = component.getByRole("button", { name: "43" });
  const weekNumberDisabled = component.getByRole("button", { name: "40" });

  const startCell = component.getByRole("gridcell", { name: "Tuesday, October 15," });
  const endCell2 = component.getByRole("gridcell", { name: "Friday, October 25," });
  const todayCell = component.getByRole("gridcell", { name: "Wednesday, October 23," });

  // Today outside range
  // ACT
  await startRange.click();
  await endRange.click();
  await page.mouse.move(0, 0);
  //ASSERT
  await expect(component).toHaveScreenshot("range.png");
  // Today inside range
  // ACT
  await startRange.click();
  await endRange2.click();
  await page.mouse.move(0, 0);
  // ASSERT
  await expect(startCell).toHaveClass(/onyx-calendar-cell--range-start/);
  await expect(endCell2).toHaveClass(/onyx-calendar-cell--range-end/);
  await expect(todayCell).toHaveClass(/onyx-calendar-cell--range-middle/);
  await expect(component).toHaveScreenshot("range-withToday.png");

  // hover start end middle today
  await startRange.hover();
  await expect(component).toHaveScreenshot("range-hover-start.png");

  await endRange2.hover();
  await expect(component).toHaveScreenshot("range-hover-end.png");

  await middleDate.hover();
  await expect(component).toHaveScreenshot("range-hover-middle.png");

  await today.hover();
  await expect(component).toHaveScreenshot("range-hover-today.png");

  // focus-visible start end middle today
  await page.mouse.move(0, 0);
  await page.keyboard.press("ArrowLeft");
  await expect(component).toHaveScreenshot("range-focus-outside.png");

  await page.keyboard.press("ArrowRight");
  await expect(component).toHaveScreenshot("range-focus-start.png");
  await page.keyboard.press("ArrowRight");
  await expect(component).toHaveScreenshot("range-focus-middle.png");

  await page.keyboard.press("ArrowDown");
  await expect(component).toHaveScreenshot("range-focus-today.png");

  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await expect(component).toHaveScreenshot("range-focus-end.png");

  // week number hovered disabled // inside min
  await weekNumberDisabled.hover();
  await expect(weekNumberDisabled).toBeDisabled();

  // week number hovered enabled // inside range
  await weekNumber.hover();
  await expect(component).toHaveScreenshot("week-number-hover.png");

  // week number clicked
  await weekNumber.click();
  await expect(component).toHaveScreenshot("week-select.png");

  // end start date is the same
  await startRange.click();
  await expect(component).toHaveScreenshot("only-start-selected.png");

  await startRange.click();
  await expect(component).toHaveScreenshot("start-date-same-as-end.png");
});
