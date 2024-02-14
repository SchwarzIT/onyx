import { expect, test } from "../../playwright-axe";
import OnyxCheckbox from "./OnyxCheckbox.vue";

const uncheckedTestCases = [{ name: "default" }, { name: "required", required: true }];
for (const testCase of uncheckedTestCases) {
  test(`should render unchecked (${testCase.name})`, async ({ mount, makeAxeBuilder }) => {
    // ARRANGE
    const component = await mount(
      <div style="display: grid; width: max-content;">
        <OnyxCheckbox label={`Unchecked ${testCase.name}`} required={testCase.required} />
        <OnyxCheckbox label="Hover" required={testCase.required} />
        <OnyxCheckbox label="Focus visible" required={testCase.required} />
      </div>,
    );

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);

    const checkboxes = await component.getByRole("checkbox").all();

    // ACT
    await checkboxes[1].hover();
    await checkboxes[2].focus();

    // ASSERT
    for (const checkbox of checkboxes) {
      await expect(checkbox).not.toBeChecked();
    }

    // ASSERT
    await expect(component).toHaveScreenshot(`unchecked-${testCase.name}.png`);
  });
}

const checkedTestCases = [{ name: "default" }, { name: "required", required: true }];
for (const testCase of checkedTestCases) {
  test(`should render checked (${testCase.name})`, async ({ mount, makeAxeBuilder }) => {
    // ARRANGE
    const component = await mount(
      <div style="display: grid; width: max-content;">
        <OnyxCheckbox
          label={`Checked ${testCase.name}`}
          modelValue={true}
          required={testCase.required}
        />
        <OnyxCheckbox label="Hover" modelValue={true} required={testCase.required} />
        <OnyxCheckbox label="Focus visible" modelValue={true} required={testCase.required} />
      </div>,
    );

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);

    const checkboxes = await component.getByRole("checkbox").all();

    // ACT
    await checkboxes[1].hover();
    await checkboxes[2].focus();

    // ASSERT
    for (const checkbox of checkboxes) {
      await expect(checkbox).toBeChecked();
    }

    // ASSERT
    await expect(component).toHaveScreenshot(`checked-${testCase.name}.png`);
  });
}

test("should render indeterminate", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <div style="display: grid; width: max-content;">
      <OnyxCheckbox label="Indeterminate" indeterminate />
      <OnyxCheckbox label="Hover" indeterminate />
      <OnyxCheckbox label="Focus visible" indeterminate />
    </div>,
  );

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  const checkboxes = await component.getByRole("checkbox").all();

  // ACT
  await checkboxes[1].hover();
  await checkboxes[2].focus();

  // ASSERT
  for (const checkbox of checkboxes) {
    await expect(checkbox).toHaveJSProperty("indeterminate", true);
  }

  // ASSERT
  await expect(component).toHaveScreenshot("indeterminate.png");
});

const disabledTestCases = [
  { name: "unchecked" },
  { name: "checked", modelValue: true },
  { name: "indeterminate", indeterminate: true },
];
for (const testCase of disabledTestCases) {
  test(`should render disabled (${testCase.name})`, async ({ mount, makeAxeBuilder }) => {
    // ARRANGE
    const component = await mount(
      <div style="display: grid; width: max-content;">
        <OnyxCheckbox
          label={`Disabled ${testCase.name}`}
          modelValue={testCase.modelValue}
          indeterminate={testCase.indeterminate}
          disabled
        />
        <OnyxCheckbox
          label="Hover"
          modelValue={testCase.modelValue}
          indeterminate={testCase.indeterminate}
          disabled
        />
        <OnyxCheckbox
          label="Focus visible"
          modelValue={testCase.modelValue}
          indeterminate={testCase.indeterminate}
          disabled
        />
      </div>,
    );

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);

    const checkboxes = await component.getByRole("checkbox").all();

    // ACT
    await checkboxes[1].hover();
    await checkboxes[2].focus();

    // ASSERT
    for (const checkbox of checkboxes) {
      await expect(checkbox).toBeDisabled();
    }

    // ASSERT
    await expect(component).toHaveScreenshot(`disabled-${testCase.name}.png`);
  });
}

const invalidTestCases = [
  { name: "unchecked" },
  { name: "unchecked (disabled)", disabled: true },
  { name: "indeterminate", indeterminate: true },
  { name: "indeterminate (disabled)", indeterminate: true, disabled: true },
];
for (const testCase of invalidTestCases) {
  test(`should render invalid (${testCase.name})`, async ({ mount, makeAxeBuilder }) => {
    // ARRANGE
    const component = await mount(
      <div style="display: grid; width: max-content;">
        <OnyxCheckbox
          label={`Invalid ${testCase.name}`}
          indeterminate={testCase.indeterminate}
          disabled={testCase.disabled}
          required
        />
        <OnyxCheckbox
          label="Hover"
          indeterminate={testCase.indeterminate}
          disabled={testCase.disabled}
          required
        />
        <OnyxCheckbox
          label="Focus visible"
          indeterminate={testCase.indeterminate}
          disabled={testCase.disabled}
          required
        />
      </div>,
    );

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);

    const checkboxes = await component.getByRole("checkbox").all();

    // invalid only shows if checkbox is touched
    for (const checkbox of checkboxes) {
      await checkbox.focus();
      await checkbox.blur();
    }

    // ACT
    await checkboxes[1].hover();
    await checkboxes[2].focus();

    // ASSERT
    await expect(component).toHaveScreenshot(`invalid-${testCase.name}.png`);
  });
}
