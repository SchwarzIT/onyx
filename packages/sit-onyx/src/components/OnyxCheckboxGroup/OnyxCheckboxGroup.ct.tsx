import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { ORIENTATIONS } from "../../types";
import OnyxCheckboxGroup from "./OnyxCheckboxGroup.vue";
import type { OnyxCheckboxGroupProps } from "./types";

const mockOptions: OnyxCheckboxGroupProps["options"] = [
  { label: "Default", value: 1 },
  { label: "Required", value: 2, required: true },
  { label: "Disabled", value: 3, disabled: true },
];

test("should render", async ({ page, mount, makeAxeBuilder }) => {
  let modelValue: string[] = [];

  const eventHandlers = {
    "update:modelValue": (newValue: string[]) => (modelValue = newValue),
  };

  // ARRANGE
  const component = await mount(OnyxCheckboxGroup, {
    props: {
      options: mockOptions,
      label: "Checkbox group headline",
      withCheckAll: true,
    } satisfies OnyxCheckboxGroupProps,
    on: eventHandlers,
  });

  const masterCheckBox = component.getByLabel("Select all");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expect(masterCheckBox).not.toBeChecked();
  await expect(masterCheckBox).toHaveJSProperty("indeterminate", false);
  await expect(component).toHaveAccessibleName("Checkbox group headline");

  // ACT
  await component.getByLabel("Default").check();
  expect(modelValue).toStrictEqual([1]);
  await component.update({ props: { modelValue }, on: eventHandlers });
  await page.mouse.move(0, 0); // needed to remove hover effect that Playwright adds from checking

  // ASSERT
  await expect(masterCheckBox).not.toBeChecked();
  await expect(masterCheckBox).toHaveJSProperty("indeterminate", true);

  // ACT
  await masterCheckBox.check();
  expect(modelValue).toStrictEqual([1, 2]);
  await component.update({ props: { modelValue }, on: eventHandlers });
  await page.mouse.move(0, 0); // needed to remove hover effect that Playwright adds from checking

  // ASSERT
  await expect(masterCheckBox).toBeChecked();
  await expect(masterCheckBox).toHaveJSProperty("indeterminate", false);
  await expect(component.getByLabel("Default")).toBeChecked();
  await expect(component.getByLabel("Required")).toBeChecked();
  await expect(component.getByLabel("Disabled")).not.toBeChecked();

  // ACT
  await masterCheckBox.uncheck();
  expect(modelValue).toStrictEqual([]);
  await component.update({ props: { modelValue }, on: eventHandlers });
  await page.mouse.move(0, 0); // needed to remove hover effect that Playwright adds from unchecking

  // ASSERT
  await expect(masterCheckBox).not.toBeChecked();
  await expect(masterCheckBox).toHaveJSProperty("indeterminate", false);
  await expect(component.getByLabel("Default")).not.toBeChecked();
  await expect(component.getByLabel("Required")).not.toBeChecked();
  await expect(component.getByLabel("Disabled")).not.toBeChecked();
});

test("should render horizontally", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxCheckboxGroup
      options={mockOptions}
      label="Horizontal group headline"
      orientation="horizontal"
      withCheckAll
    />,
  );

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expect(component).toHaveScreenshot("horizontal.png");
});

test("should disabled all checkboxes if group is disabled", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxCheckboxGroup options={mockOptions} label="Disabled group headline" disabled />,
  );

  // ASSERT
  const checkboxes = await component.getByRole("checkbox").all();

  for (const checkbox of checkboxes) {
    await expect(checkbox).toBeDisabled();
  }
});

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "CheckboxGroup",
    columns: ["default", "checked", "indeterminate"],
    rows: ["default", "interacted"],
    component: (column, row) => {
      const options = [...mockOptions, { label: "Invalid", value: 4, customError: "Invalid" }];
      const modelValue: number[] = [];
      if (column === "checked") {
        modelValue.push(...[1, 2, 4]);
      }
      if (column === "indeterminate") {
        modelValue.push(1);
      }
      return (
        <OnyxCheckboxGroup
          options={options}
          label="Checkbox group headline"
          withCheckAll
          modelValue={modelValue}
          style={{
            maxWidth: "16rem",
            ...(row === "interacted" && { paddingBottom: "3rem" }),
          }}
        />
      );
    },
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        const requiredCheckbox = component.getByLabel("Required");
        const invalidCheckbox = component.getByLabel("Invalid");

        if (row === "interacted") {
          await requiredCheckbox.click();
          await requiredCheckbox.click();
          await invalidCheckbox.click();
          await invalidCheckbox.click();
        }
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "CheckboxGroup (truncation)",
    columns: ["required", "optional"],
    rows: ["default"],
    component: (column) => (
      <OnyxCheckboxGroup
        options={[
          { label: "Very long label that will be truncated", value: 1 },
          { label: "Very long required label that will be truncated", value: 2, required: true },
          {
            label: "Very long label that will be wrapped with multiline",
            value: 3,
            truncation: "multiline",
          },
          {
            label: "Very long required label that will be wrapped with multiline",
            value: 4,
            truncation: "multiline",
            required: true,
          },
        ]}
        label="Truncated group headline"
        requiredMarker={column}
        style={{ maxWidth: "16rem" }}
      />
    ),
  });

  executeMatrixScreenshotTest({
    name: "CheckboxGroup (skeletons)",
    columns: ["default"],
    rows: ORIENTATIONS,
    component: (_column, row) => (
      <OnyxCheckboxGroup
        options={[]}
        label="Skeleton group headline"
        skeleton={3}
        orientation={row}
      />
    ),
  });
});
