import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright-axe";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxInput from "./OnyxInput.vue";

test.describe("Screenshot tests", () => {
  for (const state of ["default", "placeholder", "with-value", "autofill"] as const) {
    executeMatrixScreenshotTest({
      name: `Input (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus"],
      component: (column) => {
        return (
          <OnyxInput
            label="Test label"
            placeholder={state === "placeholder" ? "Test placeholder" : undefined}
            density={column}
            modelValue={state === "with-value" || state === "autofill" ? "Filled value" : undefined}
            style="width: 12rem;"
          />
        );
      },
      beforeScreenshot: async (component, page, column, row) => {
        const input = component.getByLabel("Test label");
        if (row === "hover") await component.hover();
        if (row === "focus") await input.focus();
        if (state == "autofill") {
          await input.evaluate((node) => node.setAttribute("data-test-autofill", ""));
        }
      },
    });
  }

  executeMatrixScreenshotTest({
    name: "Input (other)",
    columns: ["default", "hideLabel"],
    rows: ["required", "optional", "message", "counter"],
    component: (column, row) => (
      <OnyxInput
        style="width: 12rem"
        label="Test label"
        hideLabel={column === "hideLabel"}
        required={row === "required"}
        requiredMarker={row === "optional" ? "optional" : undefined}
        message={row === "message" ? "Test message" : undefined}
        maxlength={row === "counter" ? 16 : undefined}
        modelValue={row === "counter" ? "Filled value" : undefined}
        withCounter={row === "counter"}
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      if (row === "message") {
        await expect(component).toContainText("Test message");
        const input = component.getByLabel("Test label");
        await component.getByText("Test message").focus();
        await expect(input).not.toBeFocused(); // should not focus input when focusing message
      }

      if (row === "counter") {
        await expect(component).toContainText("12/16");
      }
    },
  });

  executeMatrixScreenshotTest({
    name: "Input (readonly, disabled, loading)",
    columns: ["readonly", "disabled", "loading"],
    rows: ["default", "hover", "focus"],
    component: (column) => (
      <OnyxInput
        style="width: 12rem"
        label="Test label"
        placeholder="Test placeholder"
        readonly={column === "readonly"}
        disabled={column === "disabled"}
        loading={column === "loading"}
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      if (row === "hover") await component.hover();
      if (row === "focus") await component.getByLabel("Test label").focus();
    },
  });
});

test("should emit events", async ({ mount, makeAxeBuilder }) => {
  const events = {
    updateModelValue: [] as string[],
    change: [] as string[],
    focusCount: 0,
    blurCount: 0,
  };

  // ARRANGE
  const component = await mount(
    <OnyxInput
      label="Label"
      onUpdate:modelValue={(value) => events.updateModelValue.push(value)}
      onChange={(value) => events.change.push(value)}
      onFocus={() => events.focusCount++}
      onBlur={() => events.blurCount++}
    />,
  );

  // should not emit initial events
  expect(events).toMatchObject({
    updateModelValue: [],
    change: [],
    focusCount: 0,
    blurCount: 0,
  });

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  const inputElement = component.getByLabel("Label");

  // ACT
  await inputElement.pressSequentially("Test");

  // ASSERT
  await expect(inputElement).toHaveValue("Test");
  expect(events).toMatchObject({
    updateModelValue: ["T", "Te", "Tes", "Test"],
    change: [],
    focusCount: 1,
    blurCount: 0,
  });

  // ACT
  await inputElement.blur();
  expect(events).toMatchObject({
    updateModelValue: ["T", "Te", "Tes", "Test"],
    change: ["Test"],
    focusCount: 1,
    blurCount: 1,
  });
});

test("should have aria-label if label is hidden", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxInput label="Test label" style="width: 12rem;" hideLabel />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
});
