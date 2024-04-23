import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxListboxOption from "./OnyxListboxOption.vue";

test.describe("Screenshot tests", () => {
  for (const state of ["default", "disabled"] as const) {
    executeMatrixScreenshotTest({
      name: `Listbox option (${state})`,
      columns: ["default", "selected", "indeterminate"],
      rows: ["default", "hover", "focus-visible", "multiple"],
      // TODO: color-contrast: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
      // aria-required-parent is ignored here because this component is only a single option which is internally always
      // used together with a parent so we disable the failing rule here
      disabledAccessibilityRules: [
        "aria-required-parent",
        "color-contrast",
        // TODO: as part of https://github.com/SchwarzIT/onyx/issues/732,
        // the following disabled rule must be removed / fixed.
        "nested-interactive",
      ],
      component: (column, row) => (
        <OnyxListboxOption
          aria-label="Label"
          aria-selected={column === "selected" && row !== "multiple"}
          aria-checked={column === "selected" && row === "multiple"}
          active={row === "focus-visible"}
          aria-disabled={state === "disabled"}
          multiple={["multiple", "indeterminate"].includes(row)}
          indeterminate={column === "indeterminate"}
          {...{ role: "option" }}
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
