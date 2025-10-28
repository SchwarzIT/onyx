import { iconSettings } from "@sit-onyx/icons";
import { test } from "../../playwright/a11y.js";
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

// eslint-disable-next-line playwright/no-skipped-test -- screenshots are flaky, see: https://github.com/SchwarzIT/onyx/issues/4340
test.describe.skip("Screenshot tests", () => {
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
