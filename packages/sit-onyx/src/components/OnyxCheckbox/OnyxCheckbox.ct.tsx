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
  const testCases = ["unchecked", "checked", "indeterminate"] as const;

  for (const testCase of testCases) {
    // ARRANGE
    const component = await mount(
      <div style="display: grid; width: max-content;">
        <OnyxCheckbox
          label={`Disabled ${testCase}`}
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
    await expect(component).toHaveScreenshot(`disabled-${testCase}.png`);
  }
});
