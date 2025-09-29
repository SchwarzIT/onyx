import { iconSettings } from "@sit-onyx/icons";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.jsx";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxCalendar from "./OnyxCalendar.vue";

test.describe("OnyxCalendar screenshots", () => {
  const testDate = new Date(2024, 9, 23);

  executeMatrixScreenshotTest({
    name: "OnyxCalendar",
    columns: ["small", "big"],
    rows: [
      "default",
      "select",
      "hover",
      "focus-visible",
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
          initialDate={testDate}
          size={column}
          style={{ width: column === "small" ? "20rem" : "40rem" }}
          skeleton={row === "skeleton"}
          disabled={row === "disabled"}
          min={row === "min-max" ? minDate : undefined}
          max={row === "min-max" ? maxDate : undefined}
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
});
