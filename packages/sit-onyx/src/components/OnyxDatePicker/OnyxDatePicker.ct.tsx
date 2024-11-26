import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
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
              style="width: 12rem;"
              type={type}
            />
          );
        },
        beforeScreenshot: async (component, page, column, row) => {
          const datepicker = component.getByLabel("Test label");
          if (row === "hover") await datepicker.hover();
          if (row === "focus") await datepicker.focus();
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
