import { expect, test } from "../../playwright-axe";
import { TRUNCATION_TYPES } from "../../types/fonts";
import { executeScreenshotsForAllStates } from "../../utils/playwright";
import OnyxCheckbox from "./OnyxCheckbox.vue";

test("should render unchecked", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <div style="display: grid; width: max-content;">
      <OnyxCheckbox label="Unchecked" value="1" />
      <OnyxCheckbox label="Hover" value="2" />
      <OnyxCheckbox label="Focus visible" value="3" />
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
      <OnyxCheckbox label="Checked" value="1" modelValue={true} />
      <OnyxCheckbox label="Hover" value="2" modelValue={true} />
      <OnyxCheckbox label="Focus visible" value="3" modelValue={true} />
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
      <OnyxCheckbox label="Indeterminate" value="1" indeterminate />
      <OnyxCheckbox label="Hover" value="2" indeterminate />
      <OnyxCheckbox label="Focus visible" value="3" indeterminate />
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
  await mount(<OnyxCheckbox label="Required" value="1" required />);

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
          value="1"
          disabled
        />
        <OnyxCheckbox
          label="Hover"
          modelValue={testCase.modelValue}
          indeterminate={testCase.indeterminate}
          value="2"
          disabled
        />
        <OnyxCheckbox
          label="Focus visible"
          modelValue={testCase.modelValue}
          indeterminate={testCase.indeterminate}
          value="3"
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
          value="1"
          required
        />
        <OnyxCheckbox
          label="Hover"
          indeterminate={testCase.indeterminate}
          disabled={testCase.disabled}
          value="2"
          required
        />
        <OnyxCheckbox
          label="Focus visible"
          indeterminate={testCase.indeterminate}
          disabled={testCase.disabled}
          value="3"
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
  const component = await mount(<OnyxCheckbox label="Test label" value="1" hideLabel />);

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
      <OnyxCheckbox label={label} truncation={truncation} value="1" style="max-width: 10rem;" />,
    );

    // ASSERT
    await expect(component).toContainText(label);
    await expect(component).toHaveScreenshot(`truncation-${truncation}.png`);
  });
});

test("should render skeleton", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <div style="display:grid; width:max-content;">
      <OnyxCheckbox label="Test label" value="1" skeleton />
      <OnyxCheckbox label="Test label hidden" value="2" skeleton hideLabel />
    </div>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("skeleton.png");
});

const STATES = {
  state: ["default", "disabled", "required", "optional"],
  select: ["unselected", "selected", "indeterminate"],
  density: ["compact", "default", "cozy"],
  focusState: ["", "hover", "focus-visible"],
  labeled: ["labeled", "unlabeled"],
} as const;

test.describe("state screenshot tests", () => {
  executeScreenshotsForAllStates(
    STATES,
    "checkbox",
    async ({ select, state, labeled, density, focusState }, mount, page) => {
      const component = await mount(
        <OnyxCheckbox
          modelValue={select === "selected"}
          label="label"
          indeterminate={select === "indeterminate"}
          density={density}
          disabled={state === "disabled"}
          required={state === "required"}
          hideLabel={labeled === "unlabeled"}
          value="1"
        />,
        { useOptional: state === "optional" },
      );

      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await component.hover();
      return component;
    },
  );
});
