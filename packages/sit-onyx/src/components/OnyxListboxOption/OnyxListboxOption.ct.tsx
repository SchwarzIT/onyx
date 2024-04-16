import { test } from "../../playwright-axe";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxListboxOption from "./OnyxListboxOption.vue";

test.describe("Screenshot tests", () => {
  for (const state of ["default", "disabled"] as const) {
    executeMatrixScreenshotTest({
      name: `Listbox option ${state}`,
      columns: ["default", "selected"],
      rows: ["default", "hover", "focus-visible"],
      component: (column, row) => (
        <OnyxListboxOption
          aria-label="Label"
          aria-selected={column === "selected"}
          active={row === "focus-visible"}
          aria-disabled={state === "disabled"}
        >
          Test label
        </OnyxListboxOption>
      ),
      beforeScreenshot: async (component, page, column, row) => {
        if (row === "hover") await component.hover();
      },
    });
  }
});
