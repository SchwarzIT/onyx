import { iconSettings } from "@sit-onyx/icons";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.jsx";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxCalendar from "./OnyxCalendar.vue";
import TestCaseDayContent from "./TestCaseDayContent.vue";

test.describe("Screenshot tests", () => {
  const testDate = new Date(2024, 9, 23);
  const date1 = new Date(testDate.getFullYear(), testDate.getMonth(), 20);
  const date2 = new Date(testDate.getFullYear(), testDate.getMonth(), 26);
  executeMatrixScreenshotTest({
    name: "OnyxCalendar",
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
      const minDate = new Date(testDate.getFullYear(), testDate.getMonth(), 20);
      const maxDate = new Date(testDate.getFullYear(), testDate.getMonth(), 26);

      return (
        <OnyxCalendar
          viewMonth={testDate}
          size={column}
          style={{ width: column === "small" ? "20rem" : "40rem" }}
          skeleton={row === "skeleton"}
          disabled={row === "disabled"}
          min={row === "min-max" ? minDate : undefined}
          max={row === "min-max" ? maxDate : undefined}
          displayCalendarWeek={row === "calender-weeks"}
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
        const dayToInteract = component.getByRole("button", {
          name: testDate.getDate().toString(),
        });
        switch (row) {
          case "select":
            await dayToInteract.click();
            break;
          case "hover":
            await dayToInteract.hover();
            break;
          case "focus-visible":
            await dayToInteract.click();
            await page.keyboard.press("ArrowLeft");
            break;
          default:
        }
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "OnyxCalendar (selection)",
    columns: ["small", "big"],
    rows: ["view", "single", "multiple", "range"],
    component: (column, row) => {
      return (
        <OnyxCalendar
          viewMonth={testDate}
          size={column}
          selection={row}
          style={{ width: column === "small" ? "20rem" : "40rem" }}
        />
      );
    },
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        const dayToInteract = component.getByRole("button", {
          name: date1.getDate().toString(),
        });
        const day2ToInteract = component.getByRole("button", {
          name: date2.getDate().toString(),
        });

        await dayToInteract.click();
        if (row === "range" || row === "multiple") {
          await day2ToInteract.click();
        }
      },
    },
  });
  executeMatrixScreenshotTest({
    name: "OnyxCalendar (day-slot)",
    columns: ["small", "big"],
    rows: ["day-slot"],
    component: (column) => {
      return (
        <TestCaseDayContent
          size={column}
          style={{ width: column === "small" ? "20rem" : "40rem" }}
        />
      );
    },
  });
});
