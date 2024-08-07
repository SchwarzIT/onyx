import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { DIRECTIONS, type SelectOptionValue } from "../../types";
import OnyxRadioGroup from "./OnyxRadioGroup.vue";
import type { RadioButtonOption } from "./types";

const EXAMPLE_OPTIONS = [
  { label: "Dummy 1", value: 1 },
  { label: "Dummy 2", value: 2 },
  { label: "Dummy 3", value: 3, loading: true },
  { label: "Dummy 4", value: 4, disabled: true },
  { label: "Dummy 5", value: 5, skeleton: true },
] satisfies RadioButtonOption[];

test.describe("screenshot tests", () => {
  for (const direction of DIRECTIONS) {
    executeMatrixScreenshotTest({
      name: `Radio group (${direction})`,
      columns: DENSITIES,
      rows: ["default", "label", "skeleton"],
      component: (column, row) => (
        <OnyxRadioGroup
          modelValue={EXAMPLE_OPTIONS[0].value}
          label="Test headline"
          hideLabel={row !== "label"}
          options={EXAMPLE_OPTIONS}
          skeleton={row === "skeleton" ? 3 : undefined}
          density={column}
          direction={direction}
        />
      ),
    });
  }
});

test.describe("screenshot tests (truncation)", () => {
  executeMatrixScreenshotTest({
    name: "Radio group (truncation)",
    columns: DENSITIES,
    rows: ["default"],
    component: (column) => (
      <OnyxRadioGroup
        modelValue={EXAMPLE_OPTIONS[0].value}
        style="max-width: 16rem;"
        label="Very long headline that should be truncated multiline"
        options={[
          { label: "Very long label that will be truncated", value: 1 },
          {
            label: "Very long label that will be truncated with multiline",
            value: 2,
            truncation: "multiline",
          },
        ]}
        required
        density={column}
      />
    ),
  });
});

test("should behave correctly", async ({ mount }) => {
  const modelValueEvents: SelectOptionValue[] = [];

  // ARRANGE
  const component = await mount(
    <OnyxRadioGroup
      options={EXAMPLE_OPTIONS}
      label="Test headline"
      modelValue={EXAMPLE_OPTIONS[0].value}
      onUpdate:modelValue={(value) => modelValueEvents.push(value)}
    />,
  );

  // ASSERT
  await expect(component).toHaveRole("radiogroup");
  await expect(component).toHaveAccessibleName("Test headline");
  await expect(component.getByRole("radio", { name: EXAMPLE_OPTIONS[0].label })).toBeChecked();

  // ACT
  await component.getByRole("radio", { name: EXAMPLE_OPTIONS[0].label }).check();

  // ASSERT (should not emit change if already checked option is checked)
  expect(modelValueEvents).toStrictEqual([]);

  // ACT
  await component.getByRole("radio", { name: EXAMPLE_OPTIONS[1].label }).check();

  // ASSERT
  expect(modelValueEvents).toStrictEqual([EXAMPLE_OPTIONS[1].value]);
  await expect(component.getByRole("radio", { name: EXAMPLE_OPTIONS[0].label })).not.toBeChecked();
  await expect(component.getByRole("radio", { name: EXAMPLE_OPTIONS[1].label })).toBeChecked();
});

test("should display correctly when disabled", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxRadioGroup options={EXAMPLE_OPTIONS} disabled />);

  const radioButtons = await component.getByRole("radio", { disabled: true }).all();

  // ASSERT
  expect(radioButtons).toHaveLength(3); // loading and skeleton are no radio buttons so length is 3 and not 5

  for (const radio of radioButtons) {
    await expect(radio).toBeDisabled();
  }

  const accessibilityScanResults = await makeAxeBuilder().analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
