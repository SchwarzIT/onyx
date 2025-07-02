import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxDatePicker from "./OnyxDatePicker.vue";

test.describe("Screenshot tests", () => {
  for (const type of ["date", "datetime-local"] as const) {
    for (const state of ["default", "with value"] as const) {
      executeMatrixScreenshotTest({
        name: `DatePicker (${type}, ${state})`,
        columns: DENSITIES,
        rows: ["default", "hover", "focus"],
        component: (column) => {
          return (
            <OnyxDatePicker
              label="Test label"
              density={column}
              modelValue={state === "with value" ? new Date(2024, 10, 25, 14, 30) : undefined}
              style="width: 16rem;"
              type={type}
            />
          );
        },
        hooks: {
          beforeEach: async (component, page, column, row) => {
            const datepicker = component.getByLabel("Test label");
            if (row === "hover") await datepicker.hover();
            if (row === "focus") await datepicker.focus();
          },
        },
      });
    }
  }
});

test("should emit events", async ({ mount, makeAxeBuilder }) => {
  const events = {
    updateModelValue: [] as (string | undefined)[],
  };

  // ARRANGE
  const component = await mount(
    <OnyxDatePicker
      label="Label"
      onUpdate:modelValue={(value) => events.updateModelValue.push(value)}
    />,
  );

  // should not emit initial events
  expect(events).toMatchObject({ updateModelValue: [] });

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  const inputElement = component.getByLabel("Label");

  // ACT
  await inputElement.fill("2024-11-25");

  // ASSERT
  await expect(inputElement).toHaveValue("2024-11-25");
  expect(events).toMatchObject({
    updateModelValue: ["2024-11-25T00:00:00.000Z"],
  });
});

test("should show min errors", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxDatePicker
      label="Label"
      min={new Date(2024, 11, 10)}
      modelValue={new Date(2024, 11, 5)}
    />,
  );

  await expect(component).toBeVisible();

  // error is only shown after interaction so we need to interact first to see the error
  const input = component.getByLabel("Label");
  await input.click();
  await input.blur();

  await expect(component).toContainText("Too low");
  await expect(component).toContainText("Input value must be greater than or equal to 12/10/2024");
});

test("should show max errors", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxDatePicker
      label="Label"
      max={new Date(2024, 11, 6)}
      modelValue={new Date(2024, 11, 20)}
    />,
  );

  await expect(component).toBeVisible();

  // error is only shown after interaction so we need to interact first to see the error
  const input = component.getByLabel("Label");
  await input.click();
  await input.blur();

  await expect(component).toContainText("Too high");
  await expect(component).toContainText("Input value must be less than or equal to 12/06/2024");
});
