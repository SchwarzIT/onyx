import { DENSITIES } from "../../composables/density.js";
import { test } from "../../playwright/a11y.js";
import {
  executeMatrixScreenshotTest,
  type OnyxMatrixScreenshotHookContext,
} from "../../playwright/screenshots.js";
import OnyxSelectOption from "./OnyxSelectOption.vue";

const context: OnyxMatrixScreenshotHookContext = {
  disabledAccessibilityRules: [
    // aria-required-parent is ignored here because this component is only a single option which is internally always
    // used together with a parent so we disable the failing rule here
    "aria-required-parent",
    // TODO: as part of https://github.com/SchwarzIT/onyx/issues/1026,
    // the following disabled rule should be removed.
    "nested-interactive",
  ],
};

test.describe("Single select screenshot tests", () => {
  for (const state of ["default", "disabled"] as const) {
    executeMatrixScreenshotTest({
      name: `Select option (${state})`,
      columns: ["default", "selected"],
      rows: ["default", "hover", "focus-visible"],
      context,
      component: (column, row) => (
        <OnyxSelectOption
          aria-selected={column === "selected"}
          active={row === "focus-visible"}
          aria-disabled={state === "disabled"}
          {...{ role: "option" }}
        >
          Test label
        </OnyxSelectOption>
      ),
      hooks: {
        beforeEach: async (component, page, column, row) => {
          if (row === "hover") await component.hover();
        },
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
      context,
      component: (column, row) => (
        <OnyxSelectOption
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
      hooks: {
        beforeEach: async (component, page, column, row) => {
          if (row === "hover") await component.hover();
        },
      },
    });
  }
});

test.describe("Density Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Select option (densities)",
    columns: DENSITIES,
    rows: ["default", "multiselect"],
    context,
    component: (column, row) => (
      <OnyxSelectOption multiple={row === "multiselect"} density={column} {...{ role: "option" }}>
        Test label
      </OnyxSelectOption>
    ),
    hooks: {
      beforeEach: async (component) => {
        await component.hover();
      },
    },
  });
});
