import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { TRUNCATION_TYPES } from "../../types/fonts";
import OnyxRadioButton from "./OnyxRadioButton.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Radio button (unchecked)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxRadioButton value="test-value" label="Test label" name="test-name" density={column} />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      await expect(component.getByLabel("Test label")).not.toBeChecked();
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });

  executeMatrixScreenshotTest({
    name: "Radio button (checked)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxRadioButton
        value="test-value"
        label="Test label"
        name="test-name"
        density={column}
        checked
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      await expect(component.getByLabel("Test label")).toBeChecked();
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });

  executeMatrixScreenshotTest({
    name: "Radio button (disabled)",
    columns: ["unchecked", "checked"],
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxRadioButton
        value="test-value"
        label="Test label"
        name="test-name"
        checked={column === "checked"}
        disabled
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      await expect(component.getByLabel("Test label")).toBeDisabled();
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });

  executeMatrixScreenshotTest({
    name: "Radio button (invalid)",
    columns: ["unchecked", "checked", "longError"],
    rows: ["default", "hover", "focus-visible"],
    component: (column, row) => {
      const customError =
        column === "longError"
          ? { shortMessage: "Error", longMessage: "Further info" }
          : "Test error";
      return (
        <OnyxRadioButton
          style={row !== "default" ? "padding-top: 3rem;" : ""}
          value="test-value"
          label="Test label"
          name="test-name"
          customError={customError}
          checked={column === "checked"}
        />
      );
    },
    beforeScreenshot: async (component, page, column, row) => {
      await expect(page.locator("input:invalid")).toBeAttached();

      if (row === "hover") {
        await component.getByText("Test label").hover();
      }
      if (row === "focus-visible") await page.keyboard.press("Tab");

      // wait for the tooltip to show up reliably
      if (["focus-visible", "hover"].includes(row)) {
        // eslint-disable-next-line playwright/no-standalone-expect
        await expect(
          component.getByRole("tooltip"),
          `should show error tooltip for ${row} and ${column}`,
        ).toBeVisible();
      }
    },
  });

  executeMatrixScreenshotTest({
    name: "Radio button (truncation)",
    columns: TRUNCATION_TYPES,
    rows: ["default"],
    component: (column) => (
      <OnyxRadioButton
        value="test-value"
        label="Very long label that should be truncated"
        name="test-name"
        truncation={column}
        style={{ width: "12rem" }}
      />
    ),
    beforeScreenshot: async (component) => {
      await expect(component).toContainText("Very long label that should be truncated");
    },
  });

  executeMatrixScreenshotTest({
    name: "Radio button (skeleton + loading)",
    columns: DENSITIES,
    rows: ["skeleton", "loading"],
    component: (column, row) => (
      <OnyxRadioButton
        value="test-value"
        label="Test label"
        name="test-name"
        density={column}
        skeleton={row === "skeleton"}
        loading={row === "loading"}
      />
    ),
  });
});
