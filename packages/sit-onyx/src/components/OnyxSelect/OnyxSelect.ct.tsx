import { expect, test } from "../../playwright-axe";
import { executeScreenshotsForAllStates } from "../../utils/playwright";
import OnyxSelect from "./OnyxSelect.vue";

test("should have aria-label if label is hidden", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxSelect style="width: 16rem" label="Test label" hideLabel />);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  // ASSERT
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
});

const BASIC_STATES = {
  state: ["default", "required", "optional"],
  labeled: ["Fruits", "Hidden Label"],
} as const;

test.describe("basic state screenshot tests", () => {
  executeScreenshotsForAllStates(
    BASIC_STATES,
    "basic-select",
    async ({ state, labeled }, mount) => {
      const component = await mount(
        <OnyxSelect
          style="width: 16rem"
          modelValue={undefined}
          label={labeled}
          hideLabel={labeled === "Hidden Label"}
          required={state === "required"}
          placeholder="Select your fruits"
        />,
        { useOptional: state === "optional" },
      );
      return component;
    },
  );
});

const PERMISSIONS_STATES = {
  state: ["default", "disabled", "readonly"],
  focusState: ["", "hover", "focus-visible"],
} as const;

test.describe("permissions states screenshot tests", () => {
  executeScreenshotsForAllStates(
    PERMISSIONS_STATES,
    "permissions-select",
    async ({ state, focusState }, mount, page) => {
      const component = await mount(
        <OnyxSelect
          modelValue={undefined}
          label="Fruits"
          disabled={state === "disabled"}
          readonly={state === "readonly"}
          placeholder="Select your fruits"
        />,
      );
      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await component.hover();
      return component;
    },
  );
});

const DENSITY_STATES = {
  density: ["compact", "default", "cozy"],
} as const;

test.describe("single select value display states screenshot tests", () => {
  executeScreenshotsForAllStates(DENSITY_STATES, "density-select", async ({ density }, mount) => {
    const component = await mount(
      <OnyxSelect
        modelValue={undefined}
        label="Fruits"
        placeholder="Select your fruits"
        density={density}
      />,
    );
    return component;
  });
});

const SINGLE_STATES = {
  selection: ["", "Selection"],
} as const;

test.describe("single select value display states screenshot tests", () => {
  executeScreenshotsForAllStates(SINGLE_STATES, "single-select", async ({ selection }, mount) => {
    const component = await mount(
      <OnyxSelect
        modelValue={selection ? selection : undefined}
        label="Fruits"
        placeholder="Select your fruits"
      />,
    );
    return component;
  });
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
          style="width: 16rem"
          modelValue={JSON.parse(selection)}
          label={`Multiselect with ${multiselectTextMode}`}
          multiple={{ textMode: multiselectTextMode }}
        />,
      );
      return component;
    },
  );
});

const SKELETON_STATES = {
  withLabel: ["true", "false"],
} as const;

test.describe("skeleton states screenshot tests", () => {
  executeScreenshotsForAllStates(
    SKELETON_STATES,
    "skeleton-select",
    async ({ withLabel }, mount) => {
      const component = await mount(
        <OnyxSelect
          modelValue={undefined}
          label="Label"
          skeleton
          hideLabel={withLabel === "true"}
        />,
      );
      return component;
    },
  );
});
