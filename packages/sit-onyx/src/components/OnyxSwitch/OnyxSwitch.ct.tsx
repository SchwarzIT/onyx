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

  // ASSERT
  await expect(component).not.toBeChecked();
});

test("should render checked", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxSwitch label="Checked" modelValue={true} />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).toBeChecked();
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

    // ASSERT
    for (const onyxSwitch of switches) {
      await expect(onyxSwitch).toBeDisabled();
    }
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
    "switch",
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

      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await component.hover();
      return component;
    },
  ),
);
