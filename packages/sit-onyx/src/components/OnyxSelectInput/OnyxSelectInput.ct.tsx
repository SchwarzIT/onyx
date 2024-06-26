import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxSelectInput from "./OnyxSelectInput.vue";
import { MULTISELECT_TEXT_MODE } from "./types";

test.describe("Screenshot tests", () => {
  for (const state of ["default", "placeholder", "with value"] as const) {
    executeMatrixScreenshotTest({
      name: `SelectInput (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus"],
      component: (column) => (
        <OnyxSelectInput
          style="width: 16rem"
          label="Test label"
          placeholder={state === "placeholder" ? "Test placeholder" : undefined}
          density={column}
          modelValue={
            state === "with value" ? [{ label: "Selected value", value: "test-value" }] : undefined
          }
        />
      ),
      beforeScreenshot: async (component, page, column, row) => {
        if (row === "hover") await component.hover();
        if (row === "focus") await page.keyboard.press("Tab");
      },
    });
  }

  executeMatrixScreenshotTest({
    name: "SelectInput (other)",
    columns: ["default", "hideLabel"],
    rows: ["required", "optional", "message"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => (
      <OnyxSelectInput
        style="width: 16rem"
        label="Test label"
        hideLabel={column === "hideLabel"}
        required={row === "required"}
        requiredMarker={row === "optional" ? "optional" : undefined}
        message={row === "message" ? "Test message" : undefined}
      />
    ),
  });

  executeMatrixScreenshotTest({
    name: "SelectInput (readonly, disabled, loading)",
    columns: ["readonly", "disabled", "loading"],
    rows: ["default", "hover", "focus"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column) => (
      <OnyxSelectInput
        style="width: 16rem"
        label="Test label"
        placeholder="Test placeholder"
        readonly={column === "readonly"}
        disabled={column === "disabled"}
        loading={column === "loading"}
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      if (row === "hover") await component.hover();
      if (row === "focus") await page.keyboard.press("Tab");
    },
  });

  executeMatrixScreenshotTest({
    name: "SelectInput (multiple)",
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
        <OnyxSelectInput
          style="width: 16rem"
          label="Test label"
          modelValue={modelValues[row].map((i) => ({ label: i, value: i }))}
          textMode={column}
        />
      );
    },
  });

  executeMatrixScreenshotTest({
    name: "SelectInput (skeleton)",
    rows: ["default", "hideLabel"],
    columns: DENSITIES,
    component: (column, row) => (
      <OnyxSelectInput
        style="width: 16rem"
        label="Test label"
        density={column}
        hideLabel={row === "hideLabel"}
        skeleton
      />
    ),
  });
});

test("should have aria-label if label is hidden", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxSelectInput style="width: 16rem" label="Test label" hideLabel />,
  );

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
});

test("should prevent manual typing in the input", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxSelectInput placeholder="Test" style="width: 16rem" label="Test label" />,
  );

  // // ACT
  const input = component.getByLabel("Test label(optional)");
  await input.pressSequentially("ABC");

  // // ASSERT
  await expect(input).not.toHaveValue("ABC");
  await expect(input).toHaveValue("");
});
