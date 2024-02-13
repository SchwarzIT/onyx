import { expect, test } from "../../playwright-axe";
import OnyxCheckbox from "./OnyxCheckbox.vue";

test("should render unchecked", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <div style="display: grid;">
      <OnyxCheckbox label="Default" />
      <OnyxCheckbox label="Hover" />
      <OnyxCheckbox label="Focus visible" />
    </div>,
  );

  const checkboxes = await component.getByRole("checkbox").all();

  // ACT
  await checkboxes[1].hover();
  await checkboxes[2].focus();

  // ASSERT
  for (const checkbox of checkboxes) {
    await expect(checkbox).not.toBeChecked();
  }

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render checked", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <div style="display: grid;">
      <OnyxCheckbox label="Default" modelValue={true} />
      <OnyxCheckbox label="Hover" modelValue={true} />
      <OnyxCheckbox label="Focus visible" modelValue={true} />
    </div>,
  );

  const checkboxes = await component.getByRole("checkbox").all();

  // ACT
  await checkboxes[1].hover();
  await checkboxes[2].focus();

  // ASSERT
  for (const checkbox of checkboxes) {
    await expect(checkbox).toBeChecked();
  }

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  await expect(component).toHaveScreenshot("checked.png");

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render indeterminate", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <div style="display: grid;">
      <OnyxCheckbox label="Default" indeterminate />
      <OnyxCheckbox label="Hover" indeterminate />
      <OnyxCheckbox label="Focus visible" indeterminate />
    </div>,
  );

  const checkboxes = await component.getByRole("checkbox").all();

  // ACT
  await checkboxes[1].hover();
  await checkboxes[2].focus();

  // ASSERT
  for (const checkbox of checkboxes) {
    await expect(checkbox).toHaveJSProperty("indeterminate", true);
  }

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  await expect(component).toHaveScreenshot("indeterminate.png");

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render disabled", async ({ mount, makeAxeBuilder }) => {
  const testCases = ["unchecked", "checked", "indeterminate"] as const;

  for (const testCase of testCases) {
    // ARRANGE
    const component = await mount(
      <div style="display: grid;">
        <OnyxCheckbox
          label="Default"
          modelValue={testCase === "checked"}
          indeterminate={testCase === "indeterminate"}
          disabled
        />
        <OnyxCheckbox
          label="Hover"
          modelValue={testCase === "checked"}
          indeterminate={testCase === "indeterminate"}
          disabled
        />
        <OnyxCheckbox
          label="Focus visible"
          modelValue={testCase === "checked"}
          indeterminate={testCase === "indeterminate"}
          disabled
        />
      </div>,
    );

    const checkboxes = await component.getByRole("checkbox").all();

    // ACT
    await checkboxes[1].hover();
    await checkboxes[2].focus();

    // ASSERT
    for (const checkbox of checkboxes) {
      await expect(checkbox).toBeDisabled();
    }

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    await expect(component).toHaveScreenshot(`disabled-${testCase}.png`);

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
  }
});
