import { iconSettings } from "@sit-onyx/icons";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.jsx";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxCalendar from "./OnyxCalendar.vue";
import TestCaseDayContent from "./TestCaseDayContent.ct.vue";

test.describe("Screenshot tests", () => {
  const testDate = new Date(2024, 9, 23);

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
          showCalendarWeek={row === "calender-weeks"}
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
    rows: ["default", "single", "multiple", "range"],
    component: (column, row) => {
      return (
        <OnyxCalendar
          viewMonth={testDate}
          size={column}
          selection={row === "default" ? undefined : row}
          style={{ width: column === "small" ? "20rem" : "40rem" }}
        />
      );
    },
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        await component.getByRole("button", { name: "20" }).click();

        if (row === "range" || row === "multiple") {
          await component.getByRole("button", { name: "26" }).click();
        }
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "OnyxCalendar (custom content)",
    columns: ["small", "big"],
    rows: ["default"],
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
