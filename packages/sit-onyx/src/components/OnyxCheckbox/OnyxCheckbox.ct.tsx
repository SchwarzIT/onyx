import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { TRUNCATION_TYPES } from "../../types";
import OnyxCheckbox from "./OnyxCheckbox.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Checkbox",
    columns: ["unchecked", "indeterminate", "checked", "loading", "hideLabel"],
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxCheckbox
        label="Test label"
        modelValue={column === "checked"}
        indeterminate={column === "indeterminate"}
        hideLabel={column === "hideLabel"}
        loading={column === "loading"}
        value="test-value"
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      const checkbox = component.getByLabel("Test label");

      if (column === "unchecked") await expect(checkbox).not.toBeChecked();
      if (column === "checked") await expect(checkbox).toBeChecked();
      if (column === "indeterminate") {
        await expect(checkbox).not.toBeChecked();
        await expect(checkbox).toHaveJSProperty("indeterminate", true);
      }
      if (column === "hideLabel") {
        await expect(component).not.toContainText("Test label");
        await expect(component.getByLabel("Test label")).toBeAttached(); // should have aria-label if label is hidden
      }

      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });

  executeMatrixScreenshotTest({
    name: "Checkbox (disabled)",
    columns: ["unchecked", "indeterminate", "checked", "loading", "hideLabel"],
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxCheckbox
        label="Test label"
        modelValue={column === "checked"}
        indeterminate={column === "indeterminate"}
        hideLabel={column === "hideLabel"}
        loading={column === "loading"}
        value="test-value"
        disabled
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      const checkbox = component.getByLabel("Test label");

      if (column !== "loading") {
        await expect(checkbox).toBeDisabled();
      } else {
        await expect(checkbox).not.toBeAttached();
      }

      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });

  executeMatrixScreenshotTest({
    name: "Checkbox (invalid)",
    columns: ["unchecked", "indeterminate", "checked", "disabled", "hideLabel"],
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxCheckbox
        label="Test label"
        modelValue={column === "checked"}
        indeterminate={column === "indeterminate"}
        hideLabel={column === "hideLabel"}
        disabled={column === "disabled"}
        customError="Test error"
        value="test-value"
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      const checkbox = component.getByLabel("Test label");

      if (column !== "disabled") {
        // invalid only shows if checkbox is touched

        await checkbox.click();
        await checkbox.click();
        await page.getByRole("document").click(); // reset focus

        if (column === "indeterminate") {
          await checkbox.evaluate(
            (element) => ((element as HTMLInputElement).indeterminate = true),
          );
        }
      }

      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });

  executeMatrixScreenshotTest({
    name: "Checkbox (densities)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible", "loading"],
    component: (column, row) => (
      <OnyxCheckbox
        label="Test label"
        density={column}
        loading={row === "loading"}
        value="test-value"
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });

  executeMatrixScreenshotTest({
    name: "Checkbox (other)",
    columns: ["default", "hideLabel"],
    rows: ["required", "optional", "skeleton"],
    component: (column, row) => (
      <OnyxCheckbox
        label="Test label"
        hideLabel={column === "hideLabel"}
        required={row === "required"}
        requiredMarker={row === "optional" ? "optional" : undefined}
        skeleton={row === "skeleton"}
        value="test-value"
      />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Checkbox (truncation)",
    columns: ["default", "required", "optional"],
    rows: TRUNCATION_TYPES,
    component: (column, row) => (
      <OnyxCheckbox
        label="Very long label that should be truncated"
        truncation={row}
        required={column === "required"}
        requiredMarker={column === "optional" ? "optional" : undefined}
        style={{ width: "12rem" }}
        value="test-value"
      />
    ),
    beforeScreenshot: async (component) => {
      await expect(component).toContainText("Very long label that should be truncated");
    },
  });
});
