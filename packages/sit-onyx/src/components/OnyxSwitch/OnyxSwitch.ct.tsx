import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { TRUNCATION_TYPES } from "../../types";
import OnyxSwitch from "./OnyxSwitch.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Switch",
    columns: ["unchecked", "checked", "skeleton"],
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxSwitch
        label="Test label"
        modelValue={column === "checked"}
        skeleton={column === "skeleton"}
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });

  for (const state of ["disabled", "loading", "invalid"] as const) {
    executeMatrixScreenshotTest({
      name: `Switch (${state})`,
      columns: ["unchecked", "checked"],
      rows: ["default", "hover", "focus-visible"],
      component: (column) => (
        <OnyxSwitch
          label="Test label"
          modelValue={column === "checked"}
          disabled={state === "disabled"}
          loading={state === "loading"}
          customError={state === "invalid" ? "Test error" : undefined}
        />
      ),
      beforeScreenshot: async (component, page, column, row) => {
        if (state === "invalid") {
          await component.click();
          await component.click();
          await page.getByRole("document").click(); // reset focus
        }

        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    });
  }

  executeMatrixScreenshotTest({
    name: "Switch (truncation + required/optional)",
    columns: ["default", "required", "optional"],
    rows: TRUNCATION_TYPES,
    component: (column, row) => (
      <OnyxSwitch
        style={{ maxWidth: "12rem" }}
        label="Very long label that should be truncated"
        required={column === "required"}
        requiredMarker={column === "optional" ? "optional" : undefined}
        truncation={row}
      />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Switch (densities)",
    columns: DENSITIES,
    rows: ["unchecked", "checked", "loading", "skeleton"],
    component: (column, row) => (
      <OnyxSwitch
        label="Test label"
        density={column}
        skeleton={row === "skeleton"}
        modelValue={row === "checked"}
        loading={row === "loading"}
      />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Switch (hidden label)",
    columns: ["unchecked", "checked"],
    rows: ["default", "loading", "skeleton"],
    component: (column, row) => (
      <OnyxSwitch
        label="Test label"
        skeleton={row === "skeleton"}
        modelValue={column === "checked"}
        loading={row === "loading"}
        hideLabel
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      // should have aria-label if label is hidden
      if (row !== "skeleton") {
        await expect(component).not.toContainText("Test label");
        await expect(component.getByLabel("Test label")).toBeAttached();
      }
    },
  });
});

[
  { hideLabel: true, customError: undefined, expectedTitle: "Label" },
  { hideLabel: true, customError: "Error", expectedTitle: "Label\nError" },
  { hideLabel: false, customError: "Error", expectedTitle: "Error" },
  {
    hideLabel: false,
    customError: { shortMessage: "Error", longMessage: "Further info" },
    expectedTitle: "Error: Further info",
  },
].forEach(({ hideLabel, customError, expectedTitle }) => {
  test(`should have the title "${expectedTitle}"`, async ({ mount, makeAxeBuilder, page }) => {
    // ARRANGE
    await mount(<OnyxSwitch label="Label" hideLabel={hideLabel} customError={customError} />);

    // ASSERT
    await expect(page.getByTitle(expectedTitle), "should have the expected title").toBeVisible();

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
