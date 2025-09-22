import { iconSettings } from "@sit-onyx/icons";
import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxCalender from "./OnyxCalender.vue";

test.describe("OnyxCalender screenshots", () => {
  executeMatrixScreenshotTest({
    name: "OnyxCalender",
    columns: ["small", "big"],
    rows: ["default", "select", "hover", "focus-visible", "actions", "skeleton", "disabled"],
    component: (column, row) => {
      return (
        <OnyxCalender
          size={column}
          style={{ width: column === "small" ? "20rem" : "40rem" }}
          skeleton={row === "skeleton"}
          disabled={row === "disabled"}
        >
          {row === "actions" && (
            <template v-slot:actions>
              <OnyxIconButton icon={iconSettings} label="Settings" color="neutral" />
            </template>
          )}
        </OnyxCalender>
      );
    },
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        const dayToInteract = component.getByRole("gridcell", { name: "27" });
        switch (row) {
          case "select":
            await dayToInteract.click();
            break;
          case "hover":
            await dayToInteract.hover();
            break;
          case "focus-visible":
            await dayToInteract.click();
            await dayToInteract.focus();
            await page.keyboard.press("Enter");
            break;
          default:
        }
      },
    },
  });
});
