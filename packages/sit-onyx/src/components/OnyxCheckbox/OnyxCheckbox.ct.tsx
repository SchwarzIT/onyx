import { expect, test } from "../../playwright-axe";
import { TRUNCATION_TYPES } from "../../types/fonts";
import { createScreenshotsForAllStates } from "../../utils/playwright";
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
});

test("should render required", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  await mount(<OnyxCheckbox label="Required" required />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
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
  });
}

test("should have aria-label if label is hidden", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxCheckbox label="Test label" hideLabel />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
});

TRUNCATION_TYPES.forEach((truncation) => {
  test(`should truncate with ${truncation}`, async ({ mount }) => {
    const label = "Very long label that should be truncated";

    // ARRANGE
    const component = await mount(
      <OnyxCheckbox label={label} truncation={truncation} style="max-width: 160px;" />,
    );

    // ASSERT
    await expect(component).toContainText(label);
    await expect(component).toHaveScreenshot(`truncation-${truncation}.png`);
  });
});

const STATES = {
  state: ["default", "disabled", "required", "optional"],
  select: ["unselected", "selected", "indeterminate"],
  focusState: ["", "hover", "focus-visible"],
  labeled: ["labeled", "unlabeled"],
} as const;

test(
  "State screenshot testing",
  createScreenshotsForAllStates(
    STATES,
    "checkbox",
    async ({ select, state, labeled, focusState }, mount, page) => {
      const component = await mount(
        <OnyxCheckbox
          modelValue={select === "selected"}
          label={labeled === "labeled" ? "label" : ""}
          indeterminate={select === "indeterminate"}
          disabled={state === "disabled"}
          required={state === "required"}
        />,
        { useOptional: state === "optional" },
      );

      const checkbox = component.getByRole("checkbox");
      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await checkbox.hover();
      return component;
    },
  ),
);
