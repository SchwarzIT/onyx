import { expect, test } from "../../playwright-axe";
import { executeScreenshotsForAllStates } from "../../utils/playwright";
import OnyxSelect from "./OnyxSelect.vue";

test("should have aria-label if label is hidden", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxSelect label="Test label" hideLabel />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
});

const SINGLE_STATES = {
  // TODO: add readonly
  state: ["default", "disabled", "required", "optional"],
  selection: ["", "Selection"],
  focusState: ["", "hover", "focus-visible"],
  labeled: ["labeled", "unlabeled"],
} as const;

test.describe("state screenshot tests", () => {
  executeScreenshotsForAllStates(
    SINGLE_STATES,
    "single-select",
    async ({ selection, state, labeled, focusState }, mount, page) => {
      const component = await mount(
        <OnyxSelect
          modelValue={selection ? selection : undefined}
          label={labeled}
          hideLabel={labeled === "unlabeled"}
          disabled={state === "disabled"}
          required={state === "required"}
        />,
        { useOptional: state === "optional" },
      );

      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await component.hover();
      return component;
    },
  );
});

const MULTIPLE_STATES = {
  selection: [
    [],
    ["Apple"],
    ["Apple", "Pear"],
    ["Banana", "Apple", "Cherry", "Pear", "Pineapple"],
  ].map((values) => JSON.stringify(values)),
  multiselectTextMode: ["summary", "preview"],
} as const;

test.describe("multiselect value display states screenshot tests", () => {
  executeScreenshotsForAllStates(
    MULTIPLE_STATES,
    "multi-select",
    async ({ selection, multiselectTextMode }, mount) => {
      const component = await mount(
        <OnyxSelect
          modelValue={JSON.parse(selection)}
          label={`Multiselect with ${multiselectTextMode}`}
          multiselectTextMode={multiselectTextMode}
        />,
      );

      return component;
    },
  );
});
