import { expect, test } from "../../playwright-axe";
import OnyxCheckbox from "./OnyxCheckbox.vue";

test("should render unchecked", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <div style="display: grid; width: max-content;">
      <OnyxCheckbox label="Unchecked" />
      <OnyxCheckbox label="Hover" />
      <OnyxCheckbox label="Focus visible" />
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
  await expect(component).toHaveScreenshot("default.png");
});

test("should render checked", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <div style="display: grid; width: max-content;">
      <OnyxCheckbox label="Checked" modelValue={true} />
      <OnyxCheckbox label="Hover" modelValue={true} />
      <OnyxCheckbox label="Focus visible" modelValue={true} />
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
  await expect(component).toHaveScreenshot("checked.png");
});

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

test("should render disabled", async ({ mount, makeAxeBuilder }) => {
  const testCases = [
    { name: "unchecked" },
    { name: "checked", modelValue: true },
    { name: "indeterminate", indeterminate: true },
  ];

  for (const testCase of testCases) {
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
  }
});

test("should render required", async ({ mount, makeAxeBuilder }) => {
  const testCases = [
    { name: "unchecked" },
    { name: "unchecked (touched)", touched: true },
    { name: "unchecked (disabled + touched)", disabled: true, touched: true },
    { name: "indeterminate", indeterminate: true },
    { name: "indeterminate (touched)", indeterminate: true, touched: true },
    {
      name: "indeterminate (disabled + touched)",
      indeterminate: true,
      disabled: true,
      touched: true,
    },
  ];

  for (const testCase of testCases) {
    // ARRANGE
    const component = await mount(
      <div style="display: grid; width: max-content;">
        <OnyxCheckbox
          label={`Required ${testCase.name}`}
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

    // eslint-disable-next-line playwright/no-conditional-in-test
    if (testCase.touched) {
      for (const checkbox of checkboxes) {
        await checkbox.focus();
        await checkbox.blur();
      }
    }

    // ACT
    await checkboxes[1].hover();
    await checkboxes[2].focus();

    // ASSERT
    await expect(component).toHaveScreenshot(`required-${testCase.name}.png`);
  }
});
