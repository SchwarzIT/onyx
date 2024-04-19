import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxListboxOption from "./OnyxListboxOption.vue";

test.describe("Screenshot tests", () => {
  for (const state of ["default", "disabled"] as const) {
    executeMatrixScreenshotTest({
      name: `Listbox option (${state})`,
      columns: ["default", "selected"],
      rows: ["default", "hover", "focus-visible", "multiple"],
      component: (column, row) => (
        <OnyxListboxOption
          aria-label="Label"
          aria-selected={column === "selected"}
          active={row === "focus-visible"}
          aria-disabled={state === "disabled"}
          multiple={row === "multiple"}
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
