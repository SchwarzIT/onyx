import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxInput from "./OnyxInput.vue";

test.describe("Screenshot tests", () => {
  for (const state of ["default", "placeholder", "with value", "autofill"] as const) {
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
            modelValue={state === "with value" || state === "autofill" ? "Filled value" : undefined}
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
    name: "Input (required/optional, message/counter)",
    columns: ["default", "long-text", "hideLabel"],
    rows: ["required", "optional", "message", "counter"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => {
      const label =
        column === "long-text" ? "Very long label that should be truncated" : "Test label";
      const message =
        column === "long-text" ? "Very long message that should be truncated" : "Test message";

      return (
        <OnyxInput
          style="width: 12rem"
          label={label}
          hideLabel={column === "hideLabel"}
          required={row === "required"}
          requiredMarker={row === "optional" ? "optional" : undefined}
          message={row === "message" ? message : undefined}
          maxlength={row === "counter" ? 16 : undefined}
          modelValue={row === "counter" ? "Filled value" : undefined}
          withCounter={row === "counter"}
        />
      );
    },
  });

  executeMatrixScreenshotTest({
    name: "Input (infoLabel/infoMessage)",
    columns: ["default", "long-text"],
    rows: ["infoLabel", "infoMessage"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => {
      const label =
        column === "long-text" ? "Very long label that should be truncated" : "Test label";
      const message =
        column === "long-text" ? "Very long message that should be truncated" : "Test message";
      const infoLabel = "More information";
      const infoMessage = "Additional info message";

      return (
        <OnyxInput
          style="width: 12rem"
          label={label}
          message={row === "infoMessage" ? message : undefined}
          infoLabel={row === "infoLabel" ? infoLabel : undefined}
          infoMessage={row === "infoMessage" ? infoMessage : undefined}
        />
      );
    },
    beforeScreenshot: async (component, page, _column, _row) => {
      const tooltip = page.getByRole("tooltip");
      await component.evaluate((element) => {
        element.style.height = `10rem`;
      });

      await tooltip.hover();
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

  executeMatrixScreenshotTest({
    name: "Input (invalid)",
    columns: ["default", "autofill"],
    rows: ["default", "hover", "focus"],
    component: () => <OnyxInput style="width: 12rem" label="Test label" customError="Test error" />,
    beforeScreenshot: async (component, page, column, row) => {
      const input = component.getByLabel("Test label");

      // invalid is only triggered after touched
      await input.fill("Filled value");
      await input.blur();

      if (row === "hover") await component.hover();
      if (row === "focus") await input.focus();
      if (column == "autofill") {
        await input.evaluate((node) => node.setAttribute("data-test-autofill", ""));
      }
    },
  });

  executeMatrixScreenshotTest({
    name: "Input (skeleton)",
    columns: DENSITIES,
    rows: ["default", "hideLabel"],
    component: (column, row) => (
      <OnyxInput
        style="width: 12rem"
        label="Test label"
        density={column}
        hideLabel={row === "hideLabel"}
        skeleton
      />
    ),
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
