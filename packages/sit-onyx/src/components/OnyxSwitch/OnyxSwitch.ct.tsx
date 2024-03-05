import { createScreenshotsForAllStates } from "../../utils/playwright";
import { expect, test } from "../../playwright-axe";
import OnyxSwitch from "./OnyxSwitch.vue";

test("should render unchecked", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxSwitch label="Unchecked" />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  const onyxSwitch = component.getByRole("checkbox");

  // ACT
  await onyxSwitch.hover();

  // ASSERT
  await expect(onyxSwitch).not.toBeChecked();
});

test("should render checked", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxSwitch label="Checked" modelValue={true} />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  const onyxSwitch = component.getByRole("checkbox");

  // ACT
  await onyxSwitch.hover();

  // ASSERT
  await expect(onyxSwitch).toBeChecked();
});

test("should render required", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  await mount(<OnyxSwitch label="Required" required />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

const disabledTestCases = [{ name: "unchecked" }, { name: "checked", modelValue: true }];

for (const testCase of disabledTestCases) {
  test(`should render disabled (${testCase.name})`, async ({ mount, makeAxeBuilder }) => {
    // ARRANGE
    const component = await mount(
      <div style="display: grid; width: max-content;">
        <OnyxSwitch label={`Disabled ${testCase.name}`} modelValue={testCase.modelValue} disabled />
        <OnyxSwitch label="Hover" modelValue={testCase.modelValue} disabled />
        <OnyxSwitch label="Focus visible" modelValue={testCase.modelValue} disabled />
      </div>,
    );

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);

    const switches = await component.getByRole("checkbox").all();

    // ACT
    await switches[1].hover();
    await switches[2].focus();

    // ASSERT
    for (const onyxSwitch of switches) {
      await expect(onyxSwitch).toBeDisabled();
    }
  });
}

const invalidTestCases = [
  { name: "unchecked" },
  { name: "unchecked (disabled)", disabled: true },
  { name: "indeterminate (disabled)", indeterminate: true, disabled: true },
];
for (const testCase of invalidTestCases) {
  test(`should render invalid (${testCase.name})`, async ({ mount, makeAxeBuilder }) => {
    // ARRANGE
    const component = await mount(
      <div style="display: grid; width: max-content;">
        <OnyxSwitch label={`Invalid ${testCase.name}`} disabled={testCase.disabled} required />
        <OnyxSwitch label="Hover" disabled={testCase.disabled} required />
        <OnyxSwitch label="Focus visible" disabled={testCase.disabled} required />
      </div>,
    );

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);

    const switches = await component.getByRole("checkbox").all();

    // invalid only shows if checkbox is touched
    for (const onyxSwitch of switches) {
      await onyxSwitch.focus();
      await onyxSwitch.blur();
    }

    // ACT
    await switches[1].hover();
    await switches[2].focus();
  });
}

test("should have aria-label if label is hidden", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxSwitch label="Test label" hideLabel />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
});

const STATES = {
  state: ["default", "disabled", "required", "optional"],
  select: ["unselected", "selected"],
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
        <OnyxSwitch
          modelValue={select === "selected"}
          label={labeled === "labeled" ? "label" : ""}
          disabled={state === "disabled"}
          required={state === "required"}
        />,
        { useOptional: state === "optional" },
      );

      const onyxSwitch = component.getByRole("checkbox");
      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await onyxSwitch.hover();
      return component;
    },
  ),
);
