import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import { TRUNCATION_TYPES } from "../../types/fonts.js";
import OnyxRadioButton from "./OnyxRadioButton.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Radio button (unchecked)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxRadioButton value="test-value" label="Test label" name="test-name" density={column} />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await expect(component.getByLabel("Test label")).not.toBeChecked();
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
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
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await expect(component.getByLabel("Test label")).toBeChecked();
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
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
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await expect(component.getByLabel("Test label")).toBeDisabled();
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
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
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await expect(page.locator("input:invalid")).toBeAttached();

        if (row === "hover") {
          await component.getByText("Test label").hover();
        }
        if (row === "focus-visible") await page.keyboard.press("Tab");

        // wait for the tooltip to show up reliably
        if (["focus-visible", "hover"].includes(row)) {
          await expect(
            component.getByRole("tooltip"),
            `should show error tooltip for ${row} and ${column}`,
          ).toBeVisible();

          const tooltipSize = await component
            .getByRole("tooltip")
            .evaluate((element) => [element.clientHeight, element.clientWidth]);

          // set paddings to fit the full tooltip in the screenshot
          await component.evaluate(
            (element, { tooltipSize: [height] }) => {
              const verticalPadding = `${height + 12}px`;
              element.style.paddingBottom = verticalPadding;
            },
            { tooltipSize },
          );
        }
      },
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
    hooks: {
      beforeEach: async (component) => {
        await expect(component).toContainText("Very long label that should be truncated");
      },
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
