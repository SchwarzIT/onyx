import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import { TRUNCATION_TYPES } from "../../types/index.js";
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
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });

  for (const state of ["disabled", "loading"] as const) {
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
        />
      ),
      hooks: {
        beforeEach: async (component, page, column, row) => {
          if (row === "hover") {
            await component.hover();
          }
          if (row === "focus-visible") await page.keyboard.press("Tab");
        },
      },
    });
  }

  executeMatrixScreenshotTest({
    name: `Switch (invalid)`,
    columns: ["unchecked", "checked", "longError"],
    rows: ["default", "hover", "focus-visible"],
    component: (column, row) => {
      const customError =
        column === "longError"
          ? { shortMessage: "Error", longMessage: "Further info" }
          : "Test error";
      return (
        <OnyxSwitch
          style={row !== "default" ? "padding-bottom: 3rem;" : ""}
          label="Test label"
          modelValue={column === "checked"}
          customError={customError}
        />
      );
    },
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const switchRef = component.getByLabel("Test label");

        // invalid only shows if the switch is touched
        await switchRef.focus();
        await page.keyboard.press("Space");
        await page.keyboard.press("Space");

        if (row !== "focus-visible") {
          await switchRef.blur(); // reset focus
        }

        if (row === "hover") {
          await component.getByText("Test label").hover();
        }

        // wait for the tooltip to show up reliably
        if (["focus-visible", "hover"].includes(row)) {
          await expect(
            component.getByRole("tooltip"),
            `should show error tooltip for ${row} and ${column}`,
          ).toBeVisible();
        }
      },
    },
  });

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
    hooks: {
      beforeEach: async (component, page, column, row) => {
        // should have aria-label if label is hidden
        if (row !== "skeleton") {
          await expect(component).not.toContainText("Test label");
          await expect(component.getByLabel("Test label")).toBeAttached();
        }
      },
    },
  });
});

test("should have the title show the label as title if hideLabel is set", async ({
  mount,
  makeAxeBuilder,
  page,
}) => {
  // ARRANGE
  await mount(<OnyxSwitch label="Demo Label" hideLabel />);

  // ASSERT
  await expect(page.getByTitle("Demo Label"), "should have the expected title").toBeVisible();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
