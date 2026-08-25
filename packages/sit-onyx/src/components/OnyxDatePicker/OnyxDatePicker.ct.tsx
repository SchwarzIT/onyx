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
  await expectEmit(onUpdateModelValue, 0);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  const inputElement = component.getByLabel("Label");

  // ACT
  await inputElement.fill("2024-11-25");

  // ASSERT
  await expect(inputElement).toHaveValue("2024-11-25");
  await expectEmit(onUpdateModelValue, 1, ["2024-11-25"]);

  // ACT
  await inputElement.clear();

  // ASSERT
  await expect(inputElement).toHaveValue("");
  await expectEmit(onUpdateModelValue, 2, [undefined]);

  await component.update({ props: { ...props, type: "datetime-local" } });

  // ACT
  await inputElement.fill("2024-11-25T12:34");

  // ASSERT
  await expect(inputElement).toHaveValue("2024-11-25T12:34");
  await expectEmit(onUpdateModelValue, 3, ["2024-11-25T11:34:00.000Z"]);

  // ACT
  await inputElement.clear();

  // ASSERT
  await expect(inputElement).toHaveValue("");
  await expectEmit(onUpdateModelValue, 4, [undefined]);
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

test("does not emit zero-padded intermediate years while typing the year segment", async ({
  mount,
}) => {
  // ARRANGE
  const onUpdateModelValue = createEmitSpy<typeof OnyxDatePicker, "onUpdate:modelValue">();
  const component = await mount(OnyxDatePicker, {
    props: { label: "label", "onUpdate:modelValue": onUpdateModelValue },
  });
  const input = component.getByLabel("label");

  // ACT
  // Type the date segment by segment. Unlike `.fill()` (which sets the whole value at once),
  // `pressSequentially` drives the native date input's segment editor, reproducing the bug where
  // the year briefly holds 1-3 digit values (0002 -> 0020 -> 0202) that used to be written back.
  await input.focus();
  await input.pressSequentially("06152026");

  // ASSERT
  // The field ends on the intended complete date...
  await expect(input).toHaveValue("2026-06-15");
  // ...and only the final value is emitted - never the 0002/0020/0202 intermediates.
  await expectEmit(onUpdateModelValue, 1, ["2026-06-15"]);
});

test("still commits a complete date and supports clearing (guard does not over-block)", async ({
  mount,
}) => {
  // ARRANGE
  const onUpdateModelValue = createEmitSpy<typeof OnyxDatePicker, "onUpdate:modelValue">();
  const component = await mount(OnyxDatePicker, {
    props: { label: "label", "onUpdate:modelValue": onUpdateModelValue },
  });
  const input = component.getByLabel("label");

  // ACT - a complete date set at once (mirrors a calendar-popup selection)
  await input.fill("2026-03-10");

  // ASSERT - a real 4-digit year is NOT blocked by the guard
  await expect(input).toHaveValue("2026-03-10");
  await expectEmit(onUpdateModelValue, 1, ["2026-03-10"]);

  // ACT - clearing still works
  await input.clear();

  // ASSERT
  await expect(input).toHaveValue("");
  await expectEmit(onUpdateModelValue, 2, [undefined]);
});
