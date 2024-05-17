import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxTextarea from "./OnyxTextarea.vue";

test.describe("Screenshot tests", () => {
  for (const state of ["default", "placeholder", "with value"] as const) {
    executeMatrixScreenshotTest({
      name: `Textarea (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus"],
      component: (column) => {
        return (
          <OnyxTextarea
            label="Test label"
            placeholder={state === "placeholder" ? "Test placeholder" : undefined}
            density={column}
            modelValue={state === "with value" ? "Filled value" : undefined}
            style="width: 12rem;"
          />
        );
      },
      beforeScreenshot: async (component, page, column, row) => {
        const input = component.getByLabel("Test label");
        if (row === "hover") await component.hover();
        if (row === "focus") await input.focus();
      },
    });
  }

  executeMatrixScreenshotTest({
    name: "Textarea (required/optional, message/counter)",
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
        <OnyxTextarea
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
    name: "Textarea (readonly, disabled)",
    columns: ["readonly", "disabled"],
    rows: ["default", "hover", "focus"],
    component: (column) => (
      <OnyxTextarea
        style="width: 12rem"
        label="Test label"
        placeholder="Test placeholder"
        readonly={column === "readonly"}
        disabled={column === "disabled"}
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      if (row === "hover") await component.hover();
      if (row === "focus") await component.getByLabel("Test label").focus();
    },
  });

  executeMatrixScreenshotTest({
    name: "Textarea (invalid)",
    columns: ["default"],
    rows: ["default", "hover", "focus"],
    component: () => (
      <OnyxTextarea style="width: 12rem" label="Test label" customError="Test error" />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      const input = component.getByLabel("Test label");

      // invalid is only triggered after touched
      await input.fill("Filled value");
      await input.blur();

      if (row === "hover") await component.hover();
      if (row === "focus") await input.focus();
    },
  });

  executeMatrixScreenshotTest({
    name: "Textarea (skeleton)",
    columns: DENSITIES,
    rows: ["default", "hideLabel", "autosize-min-6-rows"],
    component: (column, row) => (
      <OnyxTextarea
        style="width: 12rem"
        label="Test label"
        density={column}
        hideLabel={row === "hideLabel"}
        autosize={row === "autosize-min-6-rows" ? { min: 6 } : undefined}
        skeleton
      />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Textarea (manual resize)",
    columns: ["default", "filled"],
    rows: ["default", "resized"],
    component: (column) => (
      <OnyxTextarea
        style="width: 12rem"
        label="Test label"
        modelValue={
          column === "filled"
            ? Array.from({ length: 3 }, (_, index) => index + 1).join("\n")
            : undefined
        }
      />
    ),
    beforeScreenshot: async (component, page, column, row) => {
      const textarea = component.getByLabel("Test label");
      if (row === "resized") {
        const box = (await textarea.boundingBox())!;

        const x = box.x + box.width - 4;
        const y = box.y + box.height - 4;

        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x, y + 120);
      }
    },
  });

  executeMatrixScreenshotTest({
    name: "Textarea (autosize)",
    columns: ["initial-value", "user-typed"],
    rows: [
      "0-rows",
      "1-row",
      "2-rows",
      "3-rows",
      "4-rows",
      "5-rows",
      "6-rows",
      "7-rows",
      "8-rows",
      "long-value",
    ],
    component: (column, row) => {
      let modelValue = "";

      if (row === "long-value") {
        modelValue = "Test".repeat(64);
      } else {
        modelValue = Array.from({ length: +row[0] }, (_, index) => `Line ${index + 1}`).join("\n");
      }

      return (
        <OnyxTextarea
          style="width: 12rem"
          label="Test label"
          modelValue={column !== "user-typed" ? modelValue : undefined}
        />
      );
    },
    beforeScreenshot: async (component, page, column, row) => {
      const textarea = component.getByLabel("Test label");

      if (column === "user-typed") {
        if (row === "long-value") {
          await textarea.fill("Test".repeat(64));
        } else {
          const modelValue = Array.from({ length: +row[0] }, (_, index) => `Line ${index + 1}`);

          for (let i = 0; i < modelValue.length; i++) {
            await textarea.pressSequentially(modelValue[i]);
            if (i < modelValue.length - 1) {
              await textarea.press("Enter");
            }
          }
        }
      }
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
    <OnyxTextarea
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
  const component = await mount(<OnyxTextarea label="Test label" hideLabel />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
});
