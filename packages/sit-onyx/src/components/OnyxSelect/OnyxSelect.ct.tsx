import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxSelect from "./OnyxSelect.vue";
import { MULTISELECT_TEXT_MODE } from "./types";

test.describe("Screenshot tests", () => {
  for (const state of ["default", "placeholder", "with value"] as const) {
    executeMatrixScreenshotTest({
      name: `Select (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus-visible"],
      component: (column) => (
        <OnyxSelect
          style="width: 16rem"
          label="Test label"
          placeholder={state === "placeholder" ? "Test placeholder" : undefined}
          density={column}
          modelValue={
            state === "with value" ? { label: "Selected value", value: "test-value" } : undefined
          }
          options={[]}
        />
      ),
      beforeScreenshot: async (component, page, column, row) => {
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    });
  }

  executeMatrixScreenshotTest({
    name: "Select (other)",
    columns: ["default", "hideLabel"],
    rows: ["required", "optional", "message"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => (
      <OnyxSelect
        style="width: 16rem"
        label="Test label"
        hideLabel={column === "hideLabel"}
        required={row === "required"}
        requiredMarker={row === "optional" ? "optional" : undefined}
        message={row === "message" ? "Test message" : undefined}
        options={[]}
      />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Select (readonly, disabled, loading)",
    columns: ["readonly", "disabled", "loading"],
    rows: ["default", "hover", "focus-visible"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column) => (
      <OnyxSelect
        style="width: 16rem"
        label="Test label"
        placeholder="Test placeholder"
        readonly={column === "readonly"}
        disabled={column === "disabled"}
        loading={column === "loading"}
        options={[]}
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });

  executeMatrixScreenshotTest({
    name: "Select (multiple)",
    columns: MULTISELECT_TEXT_MODE,
    rows: ["empty", "one-value", "two-values", "many-values"],
    component: (column, row) => {
      const modelValues: Record<typeof row, string[]> = {
        empty: [],
        "one-value": ["Apple"],
        "two-values": ["Apple", "Pear"],
        "many-values": ["Banana", "Apple", "Cherry", "Pear", "Pineapple"],
      };

      return (
        <OnyxSelect
          style="width: 16rem"
          label="Test label"
          modelValue={modelValues[row].map((i) => ({ label: i, value: i }))}
          multiple={{ textMode: column }}
          options={[]}
        />
      );
    },
  });

  executeMatrixScreenshotTest({
    name: "Select (skeleton)",
    rows: ["default", "hideLabel"],
    columns: DENSITIES,
    component: (column, row) => (
      <OnyxSelect
        style="width: 16rem"
        label="Test label"
        density={column}
        hideLabel={row === "hideLabel"}
        options={[]}
        skeleton
      />
    ),
  });
});

test("should have aria-label if label is hidden", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxSelect style="width: 16rem" label="Test label" options={[]} hideLabel />,
  );

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
});
