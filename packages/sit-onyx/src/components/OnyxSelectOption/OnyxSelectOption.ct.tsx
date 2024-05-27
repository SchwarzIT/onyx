import { DENSITIES } from "../../composables/density";
import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxSelectOption from "./OnyxSelectOption.vue";

const disabledRules = [
  // aria-required-parent is ignored here because this component is only a single option which is internally always
  // used together with a parent so we disable the failing rule here
  "aria-required-parent",
  // TODO: color-contrast: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
  "color-contrast",
  // TODO: as part of https://github.com/SchwarzIT/onyx/issues/1026,
  // the following disabled rule should be removed.
  "nested-interactive",
];

test.describe("Single select screenshot tests", () => {
  for (const state of ["default", "disabled", "danger"] as const) {
    executeMatrixScreenshotTest({
      name: `Select option (${state})`,
      columns: ["default", "selected"],
      rows: ["default", "hover", "focus-visible"],
      // TODO: color-contrast: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
      // aria-required-parent is ignored here because this component is only a single option which is internally always
      // used together with a parent so we disable the failing rule here
      disabledAccessibilityRules: ["aria-required-parent", "color-contrast"],
      component: (column, row) => (
        <OnyxSelectOption
          aria-label="Label"
          aria-selected={column === "selected"}
          active={row === "focus-visible"}
          aria-disabled={state === "disabled"}
          color={state === "danger" ? "danger" : undefined}
          {...{ role: "option" }}
        >
          Test label
        </OnyxSelectOption>
      ),
      beforeScreenshot: async (component, page, column, row) => {
        if (row === "hover") await component.hover();
      },
    });
  }
});

test.describe("Multiselect Screenshot tests", () => {
  for (const state of ["default", "disabled"] as const) {
    executeMatrixScreenshotTest({
      name: `Multiselect option (${state})`,
      columns: ["default", "checked", "indeterminate"],
      rows: ["default", "hover", "focus-visible"],
      disabledAccessibilityRules: disabledRules,
      component: (column, row) => (
        <OnyxSelectOption
          aria-label="Label"
          aria-checked={column === "checked"}
          aria-disabled={state === "disabled"}
          active={row === "focus-visible"}
          multiple={true}
          indeterminate={column === "indeterminate"}
          {...{ role: "option" }}
        >
          Test label
        </OnyxSelectOption>
      ),
      beforeScreenshot: async (component, page, column, row) => {
        if (row === "hover") await component.hover();
      },
    });
  }
});

test.describe("Density Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Select option (densities)",
    columns: DENSITIES,
    rows: ["default", "multiselect"],
    disabledAccessibilityRules: disabledRules,
    component: (column, row) => (
      <OnyxSelectOption
        aria-label="Label"
        multiple={row === "multiselect"}
        density={column}
        {...{ role: "option" }}
      >
        Test label
      </OnyxSelectOption>
    ),
    beforeScreenshot: async (component) => {
      await component.hover();
    },
  });
});
