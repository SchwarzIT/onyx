import { comboboxSelectOnlyTesting } from "@sit-onyx/headless/playwright";
import { expect, test } from "../../playwright/a11y";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxCombobox from "./OnyxCombobox.vue";
import type { ComboboxOption } from "./types";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";

const MOCK_VARIED_OPTIONS = [
  { id: "1", label: "Default" },
  { id: "2", label: "Selected" },
  { id: "3", label: "Disabled", disabled: true },
  { id: "4", label: "Very long label ".repeat(5) },
];

const MOCK_MANY_OPTIONS = Array.from({ length: 25 }, (_, index) => ({
  id: `${index}`,
  label: `Test option ${index + 1}`,
})) satisfies ComboboxOption[];

test("should render", async ({ mount, makeAxeBuilder }) => {
  let modelValue: string | undefined = "2";

  // ARRANGE
  const component = await mount(OnyxCombobox, {
    props: {
      options: MOCK_VARIED_OPTIONS,
      label: "Test listbox",
      modelValue,
    },
    on: {
      "update:modelValue": async (value: string | undefined) => {
        modelValue = value;
        await component.update({ props: { modelValue } });
      },
    },
  });

  // ASSERT
  await component.getByRole("combobox").click(); // open
  await expect(component).toHaveScreenshot("default.png");
  await expect(component.getByRole("option").getByText("Disabled")).toBeDisabled();

  // ACT (should de-select current value)
  await component.getByRole("option").getByText("Default").click();
  expect(modelValue).toBe("1");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test.describe("Multiselect screenshot tests", () => {
  const modelValues = {
    "no-selection": [],
    "partial-selection": [2],
    "all-selected": [1, 2, 4],
  };
  executeMatrixScreenshotTest({
    name: `Listbox multiselect`,
    columns: ["default", "check-all"],
    rows: ["no-selection", "partial-selection", "all-selected"],
    disabledAccessibilityRules: [
      // TODO: color-contrast: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
      "color-contrast",
      // TODO: as part of https://github.com/SchwarzIT/onyx/issues/1026,
      // the following disabled rule should be removed.
      "nested-interactive",
    ],
    component: (column, row) => (
      <OnyxCombobox
        label={`${column} listbox`}
        options={MOCK_VARIED_OPTIONS}
        modelValue={modelValues[row]}
        withCheckAll={column === "check-all"}
        multiple={true}
      />
    ),
  });
});

test("should interact with multiselect", async ({ mount }) => {
  let modelValue: number[] = [2];

  const eventHandlers = {
    "update:modelValue": async (value: number[]) => {
      modelValue = value;
      await component.update({ props: { modelValue }, on: eventHandlers });
    },
  };

  // ARRANGE
  const component = await mount(OnyxCombobox<number, true>, {
    props: {
      options: MOCK_VARIED_OPTIONS,
      label: "Test listbox",
      withCheckAll: { label: "Select all" },
      multiple: true,
      modelValue,
    },
    on: eventHandlers,
  });

  // ASSERT
  await expect(component.getByText("Disabled")).toBeDisabled();
  expect(modelValue).toEqual([2]);

  // ACT (should de-select current value)
  await component.getByText("Selected").click();
  // ASSERT
  expect(modelValue).toEqual([]);

  // // ACT (should select all non-disabled values)
  await component.getByRole("option", { name: "Select all" }).click();
  // ASSERT
  expect(modelValue).toEqual([1, 2, 4]);
});

test("should render with many options", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  const component = await mount(OnyxCombobox, {
    props: {
      options: MOCK_OPTIONS,
      label: "Test combobox",
      listLabel: "Test listbox",
    },
    on: {
      "update:modelValue": (modelValue: string | undefined) =>
        component.update({ props: { modelValue } }),
    },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("many-options.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  await comboboxSelectOnlyTesting(
    page,
    component.getByRole("listbox"),
    component.getByRole("combobox"),
  );
});

test("should render with grouped options", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(OnyxListbox, {
    props: {
      options: [
        {
          id: "cat",
          label: "Cat",
          group: "Land",
        },
        {
          id: "dog",
          label: "Dog",
          group: "Land",
        },
        {
          id: "dolphin",
          label: "Dolphin",
          group: "Water",
        },
        {
          id: "flounder",
          label: "Flounder",
          group: "Water",
        },
      ],
      label: "Test listbox",
    },
    on: {
      "update:modelValue": (modelValue: number | undefined) =>
        component.update({ props: { modelValue } }),
    },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("grouped-options.png");
  await expect(component.getByRole("group", { name: "Water" })).toBeVisible();
  await expect(component.getByRole("group", { name: "Land" })).toBeVisible();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should show empty state", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxCombobox label="Test combobox" listLabel="Test listbox" options={[]} />,
  );
  await component.getByRole("combobox").click(); // open

  // ASSERT
  await expect(component).toHaveScreenshot("empty.png");
  await expect(component).toContainText("No data available");

  // TODO: comment back in once contrast issues of the empty component are fixed
  // ACT
  // const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  // expect(accessibilityScanResults.violations).toEqual([]);
});

test("should show loading state", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxCombobox label="Test combobox" listLabel="Test listbox" options={MOCK_OPTIONS} loading />,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("loading.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should support lazy loading", async ({ mount }) => {
  let lazyLoadEventCount = 0;

  const eventHandlers = {
    lazyLoad: () => lazyLoadEventCount++,
  };

  // ARRANGE
  const component = await mount(OnyxCombobox, {
    props: {
      options: MOCK_MANY_OPTIONS,
      label: "Test combobox",
      listLabel: "Test listbox",
      lazyLoading: { enabled: true },
    },
    on: eventHandlers,
  });

  const updateProps = (props: Partial<OnyxComboboxProps>) => {
    return component.update({ props, on: eventHandlers });
  };

  await component.getByRole("combobox").click(); // open

  await expect(component.getByRole("option")).toHaveCount(25);

  const listbox = component.getByRole("listbox");

  const scrollToOption = async (label: string) => {
    await listbox
      .getByLabel(label)
      .evaluate((element) => element.scrollIntoView({ block: "end", behavior: "smooth" }));
  };

  // ACT (should not emit event if not scrolled completely to the end)
  await scrollToOption("Test option 20");

  // ASSERT
  await expect(() => expect(lazyLoadEventCount).toBe(0)).toPass();

  // ACT
  await scrollToOption("Test option 25");

  // ASSERT
  await expect(() => expect(lazyLoadEventCount).toBe(1)).toPass();

  // ACT
  await updateProps({ lazyLoading: { enabled: true, loading: true } });

  // ASSERT
  const loadingIndicator = component.locator(".onyx-loading-dots");
  await loadingIndicator.scrollIntoViewIfNeeded();
  await expect(loadingIndicator).toBeVisible();
  await expect(component).toHaveScreenshot("lazy-loading-active.png");

  // ACT
  await updateProps({
    loading: false,
    options: MOCK_MANY_OPTIONS.concat(
      Array.from({ length: 25 }, (_, index) => {
        const id = MOCK_MANY_OPTIONS.length + index;
        return { id, label: `Test option ${id + 1}` };
      }),
    ),
  });

  // ASSERT
  await expect(component.getByRole("option")).toHaveCount(50);
  await expect(component.getByLabel("Test option 25")).toBeInViewport();
  await expect(() => expect(lazyLoadEventCount).toBe(1)).toPass();

  // ACT (should support customizing the scroll offset)

  await updateProps({
    lazyLoading: { enabled: true, scrollOffset: 120 },
  });
  await scrollToOption("Test option 48");

  // ASSERT
  await expect(() => expect(lazyLoadEventCount).toBe(2)).toPass();
});

test("should display optionsEnd slot", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxCombobox options={MOCK_MANY_OPTIONS} label="Test label">
      <template v-slot:optionsEnd>
        <OnyxButton label="Load more" mode="plain" style={{ width: "100%" }} />
      </template>
    </OnyxCombobox>,
  );

  await component.getByRole("combobox").click(); // open

  const button = component.getByRole("button", { name: "Load more" });

  // ACT
  await button.scrollIntoViewIfNeeded();

  // ASSERT
  await expect(component).toHaveScreenshot("custom-load-button.png");
});
