import type { MountResultJsx } from "@playwright/experimental-ct-vue";
import { comboboxSelectOnlyTesting, comboboxTesting } from "@sit-onyx/headless/playwright";
import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxListbox from "./OnyxListbox.vue";
import type { ListboxOption, OnyxListboxProps } from "./types";

const DISABLED_ACCESSIBILITY_RULES = [
  // TODO: color-contrast: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
  "color-contrast",
  // the scrollable region are the options but they should not be focusable because
  // the focus should remain on the parent element
  "scrollable-region-focusable",
];

const MOCK_VARIED_OPTIONS = [
  { value: 1, label: "Default" },
  { value: 2, label: "Selected option" },
  { value: 3, label: "Disabled", disabled: true },
  { value: 4, label: "Very long label ".repeat(5) },
] satisfies ListboxOption[];

const MOCK_MANY_OPTIONS = Array.from({ length: 25 }, (_, index) => ({
  value: index,
  label: `Test option ${index + 1}`,
})) satisfies ListboxOption[];

const openFlyout = async (component: MountResultJsx) => {
  await component.click();

  // since the listbox is positioned absolute, we need to set the component size accordingly
  // so the screenshot contains the whole component
  await component.evaluate((element) => {
    element!.style.height = `${element.scrollHeight}px`;
    element!.style.width = `${element.scrollWidth}px`;
  });
};

test.describe("Default screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Listbox",
    columns: DENSITIES,
    rows: ["default", "open"],
    disabledAccessibilityRules: DISABLED_ACCESSIBILITY_RULES,
    component: (column) => (
      <div>
        <OnyxListbox
          label="Label"
          listLabel="List label"
          options={MOCK_VARIED_OPTIONS}
          modelValue={MOCK_VARIED_OPTIONS[1]}
          density={column}
        />
      </div>
    ),
    beforeScreenshot: async (component, page, column, row) => {
      if (row !== "default") await openFlyout(component);
    },
  });
});

test.describe("Empty screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Listbox (empty)",
    columns: DENSITIES,
    rows: ["empty", "search-empty"],
    disabledAccessibilityRules: DISABLED_ACCESSIBILITY_RULES,
    component: (column, row) => (
      <div>
        {row === "empty" ? (
          <OnyxListbox label="Label" listLabel="List label" options={[]} density={column} />
        ) : (
          <OnyxListbox
            label="Label"
            listLabel="List label"
            options={[]}
            density={column}
            withSearch={true}
            searchTerm="search term"
          />
        )}
      </div>
    ),
    beforeScreenshot: async (component) => {
      await openFlyout(component);
    },
  });
});

test.describe("Grouped screenshots", () => {
  const GROUPED_OPTIONS = [
    { value: "cat", label: "Cat", group: "Land" },
    { value: "dog", label: "Dog", group: "Land" },
    { value: "dolphin", label: "Dolphin", group: "Water" },
    { value: "flounder", label: "Flounder", group: "Water" },
  ] satisfies ListboxOption[];

  executeMatrixScreenshotTest({
    name: "Listbox (grouped)",
    columns: DENSITIES,
    rows: ["default"],
    disabledAccessibilityRules: DISABLED_ACCESSIBILITY_RULES,
    component: (column) => (
      <div>
        <OnyxListbox
          label="Label"
          listLabel="List label"
          options={GROUPED_OPTIONS}
          modelValue={GROUPED_OPTIONS[0]}
          density={column}
        />
      </div>
    ),
    beforeScreenshot: async (component) => {
      await openFlyout(component);
    },
  });
});

test.describe("Multiple screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Listbox (multiple)",
    columns: DENSITIES,
    rows: ["empty", "check-all", "search"],
    disabledAccessibilityRules: [
      ...DISABLED_ACCESSIBILITY_RULES,
      // TODO: as part of https://github.com/SchwarzIT/onyx/issues/1026,
      // the following disabled rule should be removed.
      "nested-interactive",
    ],
    component: (column, row) => (
      <div>
        <OnyxListbox
          label="Label"
          listLabel="List label"
          options={MOCK_VARIED_OPTIONS}
          density={column}
          multiple={true}
          modelValue={
            column === "default"
              ? [MOCK_VARIED_OPTIONS[0]]
              : column === "cozy"
                ? MOCK_VARIED_OPTIONS
                : []
          }
          withSearch={row === "search"}
          withCheckAll={row === "check-all"}
        />
      </div>
    ),
    beforeScreenshot: async (component) => {
      await openFlyout(component);
    },
  });
});

test.describe("Loading screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Listbox (loading)",
    columns: ["loading", "lazy-loading", "custom-button"],
    rows: ["default"],
    disabledAccessibilityRules: DISABLED_ACCESSIBILITY_RULES,
    component: (column) => (
      <div>
        <OnyxListbox
          label="Label"
          listLabel="List label"
          options={MOCK_MANY_OPTIONS}
          loading={column === "loading"}
          lazyLoading={column === "lazy-loading" ? { enabled: true, loading: true } : undefined}
        >
          {column === "custom-button" && (
            <template v-slot:optionsEnd>
              <OnyxButton label="Load more" mode="plain" />
            </template>
          )}
        </OnyxListbox>
      </div>
    ),
    beforeScreenshot: async (component, page, column) => {
      await openFlyout(component);

      if (column !== "loading") {
        await component.getByLabel(MOCK_MANY_OPTIONS.at(-1)!.label).scrollIntoViewIfNeeded();
      }
    },
  });
});

test("should interact with multiselect", async ({ mount }) => {
  let modelValue: ListboxOption[] | undefined = [MOCK_VARIED_OPTIONS[1]];

  const eventHandlers = {
    "update:modelValue": async (value: typeof modelValue) => {
      modelValue = value;
      await component.update({ props: { modelValue }, on: eventHandlers });
    },
  };

  // ARRANGE
  const component = await mount(OnyxListbox, {
    props: {
      options: MOCK_VARIED_OPTIONS,
      label: "Test listbox",
      listLabel: "Listbox label",
      withCheckAll: { label: "Select all" },
      multiple: true,
      modelValue,
    },
    on: eventHandlers,
  });

  await component.click();

  // ASSERT
  await expect(component.getByText("Disabled")).toBeDisabled();
  expect(modelValue).toStrictEqual([MOCK_VARIED_OPTIONS[1]]);

  // ACT (should de-select current value)
  await component.getByText("Selected").click();
  // ASSERT
  expect(modelValue).toEqual([]);

  // // ACT (should select all non-disabled values)
  await component.getByRole("option", { name: "Select all" }).click();
  // ASSERT
  expect(modelValue).toStrictEqual([
    MOCK_VARIED_OPTIONS[0],
    MOCK_VARIED_OPTIONS[1],
    MOCK_VARIED_OPTIONS[3],
  ]);
});

// eslint-disable-next-line playwright/expect-expect
test("should pass headless accessibility tests", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(OnyxListbox, {
    props: {
      options: MOCK_MANY_OPTIONS,
      label: "Test listbox",
      listLabel: "List label",
    },
  });

  // ASSERT
  await comboboxTesting(
    page,
    component.getByRole("listbox"),
    component.getByRole("combobox"),
    page.getByRole("button"),
    page.getByRole("option"),
  );
});

// eslint-disable-next-line playwright/expect-expect
test("should pass headless accessibility tests (select only)", async ({ mount, page }) => {
  const eventHandlers = {
    "update:modelValue": (modelValue: ListboxOption) => {
      component.update({ props: { modelValue }, on: eventHandlers });
    },
  };

  // ARRANGE
  const component = await mount(OnyxListbox, {
    props: {
      options: MOCK_MANY_OPTIONS,
      label: "Test listbox",
      listLabel: "List label",
    },
    on: eventHandlers,
  });

  // ASSERT
  await comboboxSelectOnlyTesting(
    page,
    component.getByRole("listbox"),
    component.getByRole("combobox"),
    (loc) => loc.evaluate((e) => e.classList.contains("onyx-list-item--active")),
  );
});

test("should support lazy loading", async ({ mount }) => {
  let lazyLoadEventCount = 0;

  const eventHandlers = {
    lazyLoad: () => lazyLoadEventCount++,
  };

  // ARRANGE
  const component = await mount(OnyxListbox, {
    props: {
      options: MOCK_MANY_OPTIONS,
      label: "Test listbox",
      listLabel: "Test listbox",
      lazyLoading: { enabled: true },
    },
    on: eventHandlers,
  });

  const updateProps = (props: Partial<OnyxListboxProps>) => {
    return component.update({ props, on: eventHandlers });
  };

  await component.click();

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

  // ACT
  await updateProps({
    loading: false,
    options: MOCK_MANY_OPTIONS.concat(
      Array.from({ length: 25 }, (_, index) => {
        const value = MOCK_MANY_OPTIONS.length + index;
        return { value, label: `Test option ${value + 1}` };
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

test("should handle onUpdate:searchTerm correctly when searching", async ({ mount }) => {
  const onUpdateSearchTerm: string[] = [];

  // ARRANGE
  const component = await mount(OnyxListbox, {
    props: {
      options: MOCK_MANY_OPTIONS,
      label: "Test label",
      listLabel: "List label",
      withSearch: true,
      "onUpdate:searchTerm": (i) => onUpdateSearchTerm.push(i),
    },
  });

  await component.click();
  const searchInput = component.getByLabel("Filter the list items");

  // ACT
  await searchInput.pressSequentially("test");

  // ASSERT
  expect(onUpdateSearchTerm).toHaveLength(4);
  expect(onUpdateSearchTerm.at(-1)).toBe("test");

  // ACT
  await component.getByLabel("Clear search filter").click();

  // ASSERT
  expect(onUpdateSearchTerm).toHaveLength(5);
  expect(onUpdateSearchTerm.at(-1)).toBe("");

  // ACT
  await component.update({ props: { searchTerm: "very long and new test text" } });

  // ASSERT
  await expect(searchInput).toHaveValue("very long and new test text");

  // ACT
  await component.update({ props: { searchTerm: "" } });

  // ASSERT
  expect(onUpdateSearchTerm).toHaveLength(5);
  await expect(searchInput).toHaveValue("");
});
