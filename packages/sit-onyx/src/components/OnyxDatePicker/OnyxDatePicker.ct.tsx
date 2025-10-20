import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxDatePicker from "./OnyxDatePicker.vue";

test.describe("Screenshot tests", () => {
  const dateString = new Date(2024, 10, 25, 14, 30).toISOString();

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
              modelValue={state === "with value" ? dateString : undefined}
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
  const onUpdateModelValue = createEmitSpy<typeof OnyxDatePicker, "onUpdate:modelValue">();

  // ARRANGE
  const props = { label: "label", "onUpdate:modelValue": onUpdateModelValue };
  const component = await mount(OnyxDatePicker, { props });

  // ASSERT
  // should not emit initial events
  expectEmit(onUpdateModelValue, 0);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  const inputElement = component.getByLabel("Label");

  // ACT
  await inputElement.fill("2024-11-25");

  // ASSERT
  await expect(inputElement).toHaveValue("2024-11-25");
  expectEmit(onUpdateModelValue, 1, ["2024-11-25"]);

  // ACT
  await inputElement.clear();

  // ASSERT
  await expect(inputElement).toHaveValue("");
  expectEmit(onUpdateModelValue, 2, [undefined]);

  await component.update({ props: { ...props, type: "datetime-local" } });

  // ACT
  await inputElement.fill("2024-11-25T12:34");

  // ASSERT
  await expect(inputElement).toHaveValue("2024-11-25T12:34");
  expectEmit(onUpdateModelValue, 3, ["2024-11-25T11:34:00.000Z"]);

  // ACT
  await inputElement.clear();

  // ASSERT
  await expect(inputElement).toHaveValue("");
  expectEmit(onUpdateModelValue, 4, [undefined]);
});

test("should show min errors", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxDatePicker
      label="Label"
      min={new Date(2024, 11, 10)}
      modelValue={new Date(2024, 11, 5).toISOString()}
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
      modelValue={new Date(2024, 11, 20).toISOString()}
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
