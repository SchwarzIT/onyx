import { test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxCalender from "./OnyxCalender.vue";

test.describe("OnyxCalender screenshots", () => {
  executeMatrixScreenshotTest({
    name: "OnyxCalender",
    columns: ["small", "big"],
    rows: ["default", "select", "hover", "focus-visible", "skeleton", "disabled"],
    component: (column, row) => {
      return (
        <OnyxCalender
          size={column}
          style={{ width: column === "small" ? "20rem" : "30rem" }}
          skeleton={row === "skeleton"}
          disabled={row === "disabled"}
        />
      );
    },
    hooks: {
      beforeEach: async (component, page, column, row) => {
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
            await page.keyboard.press("Tab");
            break;
          default:
        }
      },
    },
  });
});
