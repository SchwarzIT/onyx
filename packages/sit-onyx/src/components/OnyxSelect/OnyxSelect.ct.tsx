import type { MountResultJsx } from "@playwright/experimental-ct-vue";
import { comboboxSelectOnlyTesting, comboboxTesting } from "@sit-onyx/headless/playwright";
import { DENSITIES } from "../../composables/density";
import type { FormMessages } from "../../composables/useCustomValidity";
import { expect, test } from "../../playwright/a11y";
import {
  executeMatrixScreenshotTest,
  type OnyxMatrixScreenshotHookContext,
} from "../../playwright/screenshots";
import type { SelectOptionValue } from "../../types";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import { createFormElementUtils } from "../OnyxFormElement/OnyxFormElement.ct-utils";
import OnyxSelect from "./OnyxSelect.vue";
import TestWrapperCt from "./TestWrapper.ct.vue";
import { SELECT_ALIGNMENTS, type OnyxSelectProps, type SelectOption } from "./types";

const context = {
  disabledAccessibilityRules: [
    // the scrollable region are the options but they should not be focusable because
    // the focus should remain on the parent element
    "scrollable-region-focusable",
  ],
} satisfies OnyxMatrixScreenshotHookContext;

const nestedChildrenContext = {
  disabledAccessibilityRules: [
    ...context.disabledAccessibilityRules,
    // "nested-interactive" is false positive, see: https://github.com/SchwarzIT/onyx/issues/1026#issuecomment-2446134327
    "nested-interactive",
  ],
} satisfies OnyxMatrixScreenshotHookContext;

const MOCK_VARIED_OPTIONS = [
  { value: 1, label: "Default" },
  { value: 2, label: "Selected option" },
  { value: 3, label: "Disabled", disabled: true },
  { value: 4, label: "Very long label ".repeat(5) },
] satisfies SelectOption[];

const MOCK_VARIED_OPTIONS_VALUES = MOCK_VARIED_OPTIONS.map(({ value }) => value);

const MOCK_MANY_OPTIONS = Array.from({ length: 25 }, (_, index) => ({
  value: index,
  label: `Test option ${index + 1}`,
})) satisfies SelectOption[];

const MOCK_LONG_LABELED_OPTIONS = Array.from({ length: 10 }, (_, index) => ({
  value: index,
  label: `Long labeled option ${index + 1} `.repeat(3),
})) satisfies SelectOption[];

const MOCK_MULTILINE_LONG_LABELED_OPTIONS = MOCK_LONG_LABELED_OPTIONS.map((option) => ({
  ...option,
  truncation: "multiline",
})) satisfies SelectOption[];

const openFlyout = async (component: MountResultJsx) => {
  const toggleButton = component.getByLabel("Toggle selection popover");

  if (await toggleButton.isEnabled()) await toggleButton.click();
};

test.describe("Default screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Select",
    columns: DENSITIES,
    rows: ["default", "required", "hideLabel", "open"],
    context,
    component: (column, row) => (
      <div>
        <OnyxSelect
          label="Label"
          listLabel="List label"
          options={MOCK_VARIED_OPTIONS}
          modelValue={MOCK_VARIED_OPTIONS_VALUES[1]}
          density={column}
          required={row === "required"}
          hideLabel={row === "hideLabel"}
          style={{
            marginBottom: row === "open" ? "15rem" : undefined,
          }}
        />
      </div>
    ),
    hooks: {
      beforeEach: async (component, _page, _column, row) => {
        if (row === "open") await openFlyout(component);
      },
    },
  });
});

test.describe("Empty screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Select (empty)",
    columns: DENSITIES,
    rows: ["empty", "search-empty"],
    context,
    component: (column, row) => (
      <div>
        {row === "empty" ? (
          <OnyxSelect
            label="Label"
            listLabel="List label"
            options={[]}
            density={column}
            style={{ marginBottom: "15rem" }}
          />
        ) : (
          <OnyxSelect
            label="Label"
            listLabel="List label"
            options={[]}
            density={column}
            withSearch={true}
            searchTerm="search term"
            style={{ marginBottom: "18rem" }}
          />
        )}
      </div>
    ),
    hooks: {
      beforeEach: async (component) => {
        await openFlyout(component);
      },
    },
  });
});

test.describe("Truncated options screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Select (truncated)",
    columns: DENSITIES,
    rows: ["ellipsis", "multiline"],
    context,
    component: (column, row) => (
      <OnyxSelect
        label="Label"
        listLabel="List label"
        options={
          row === "ellipsis" ? MOCK_LONG_LABELED_OPTIONS : MOCK_MULTILINE_LONG_LABELED_OPTIONS
        }
        density={column}
        style={{ marginBottom: "22rem" }}
      />
    ),
    hooks: {
      beforeEach: async (component) => {
        await openFlyout(component);
        const option = component.getByLabel(MOCK_MULTILINE_LONG_LABELED_OPTIONS[0].label);
        await option.hover();
      },
    },
  });
});

test.describe("Grouped screenshots", () => {
  const GROUPED_OPTIONS = [
    { value: "cat", label: "Cat", group: "Land" },
    { value: "dog", label: "Dog", group: "Land" },
    { value: "dolphin", label: "Dolphin", group: "Water" },
    { value: "flounder", label: "Flounder", group: "Water" },
  ] satisfies SelectOption[];

  executeMatrixScreenshotTest({
    name: "Select (grouped)",
    columns: ["default", "with-search", "with-check-all"],
    rows: DENSITIES,
    context: nestedChildrenContext,
    component: (column, row) => {
      const preselected: SelectOptionValue = GROUPED_OPTIONS[0].value;
      const multiple = column === "with-check-all";
      return multiple ? (
        <div>
          <OnyxSelect
            label="Label"
            listLabel="List label"
            options={GROUPED_OPTIONS}
            modelValue={[preselected]}
            density={row}
            multiple={true}
            withCheckAll={true}
            style={{ marginBottom: "22rem" }}
          />
        </div>
      ) : (
        <div>
          <OnyxSelect
            label="Label"
            listLabel="List label"
            options={GROUPED_OPTIONS}
            modelValue={preselected}
            density={row}
            multiple={false}
            withSearch={column === "with-search"}
            style={{ marginBottom: "20rem" }}
          />
        </div>
      );
    },
    hooks: {
      beforeEach: async (component) => {
        await openFlyout(component);
      },
    },
  });
});

test.describe("Multiple screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Select (multiple)",
    columns: DENSITIES,
    rows: ["default", "check-all", "search", "preview"],
    context: nestedChildrenContext,
    component: (column, row) => {
      let modelValue = [MOCK_VARIED_OPTIONS_VALUES[0]];
      if (column === "compact") modelValue = [];
      if (column === "cozy" || row === "preview")
        modelValue = MOCK_VARIED_OPTIONS.map(({ value }) => value);

      return (
        <div>
          <OnyxSelect
            label="Label"
            listLabel="List label"
            options={MOCK_VARIED_OPTIONS}
            density={column}
            multiple={true}
            modelValue={modelValue}
            withSearch={row === "search"}
            withCheckAll={row === "check-all"}
            textMode={row === "preview" ? "preview" : undefined}
            style={{ marginBottom: row !== "preview" ? "20rem" : undefined }}
          />
        </div>
      );
    },
    hooks: {
      beforeEach: async (component, _page, _column, row) => {
        if (row !== "preview") await openFlyout(component);
      },
    },
  });
});

test.describe("List description screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Select (list-description)",
    columns: DENSITIES,
    rows: ["default"],
    context,
    component: (column) => (
      <div>
        <OnyxSelect
          label="Label"
          listLabel="List label"
          options={MOCK_MANY_OPTIONS}
          density={column}
          listDescription="List description"
          style={{ marginBottom: "25rem" }}
        />
      </div>
    ),
    hooks: {
      beforeEach: async (component, _page, _column) => {
        await openFlyout(component);
      },
    },
  });
});

test.describe("Alignment screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Select (alignment)",
    columns: SELECT_ALIGNMENTS,
    rows: ["top", "bottom"],
    context,
    component: (column, row) => (
      <div
        style={{
          paddingTop: row === "top" ? "22rem" : "",
          paddingBottom: row !== "top" ? "22rem" : "",
        }}
      >
        <OnyxSelect
          label="Label"
          listLabel="List label"
          options={MOCK_MANY_OPTIONS}
          alignment={column}
        />
      </div>
    ),
    hooks: {
      beforeEach: async (component) => {
        await openFlyout(component);
      },
    },
  });
});

test.describe("Loading screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Select (loading)",
    columns: ["loading", "lazy-loading", "custom-button"],
    rows: ["default"],
    context,
    component: (column) => (
      <div>
        <OnyxSelect
          label="Label"
          listLabel="List label"
          options={MOCK_MANY_OPTIONS}
          loading={column === "loading"}
          lazyLoading={column === "lazy-loading" ? { enabled: true, loading: true } : undefined}
          style={{ marginBottom: "25rem" }}
        >
          {column === "custom-button" && (
            <template v-slot:optionsEnd>
              <OnyxButton label="Load more" mode="plain" />
            </template>
          )}
        </OnyxSelect>
      </div>
    ),
    hooks: {
      beforeEach: async (component, _page, column) => {
        await openFlyout(component);

        if (column !== "loading") {
          await component.getByLabel(MOCK_MANY_OPTIONS.at(-1)!.label).scrollIntoViewIfNeeded();
        }
      },
    },
  });
});

test.describe("Invalidity handling screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Select (message replacement on invalid)",
    columns: ["default", "long-text"],
    rows: ["messageTooltip", "error", "errorTooltip"],
    component: (column, row) => {
      const showLongMessage = column !== "default";
      const label =
        column === "long-text"
          ? "Very very long test label that should be truncated"
          : "Test label";
      const message = {
        shortMessage: `${
          showLongMessage ? "Very long message that should be truncated" : "Test message"
        }`,
        longMessage: "Additional info message",
      };
      const errorMessages: FormMessages = {
        shortMessage: showLongMessage
          ? "Very long error preview that should be truncated"
          : "Test error",
        longMessage: row === "errorTooltip" ? "Extended error information" : undefined,
      };

      return (
        <OnyxSelect
          style={{ width: "12rem", marginRight: column === "long-text" ? "6rem" : undefined }}
          label={label}
          message={message}
          customError={row !== "messageTooltip" ? errorMessages : undefined}
          listLabel="List label"
          options={MOCK_VARIED_OPTIONS}
        />
      );
    },
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        const input = component.getByLabel("Test label");

        // invalid is only triggered after open/closing the flyout
        await input.click();
        await page.getByRole("document").click(); // reset mouse

        await component.evaluate((element) => {
          element.style.padding = `0 5rem 3rem 2rem`;
        });

        if (row !== "error") {
          await createFormElementUtils(page).triggerTooltipVisible("message");
        }
      },
    },
  });

  executeMatrixScreenshotTest({
    name: `Select (invalid variations)`,
    columns: ["default", "placeholder", "with-value"],
    rows: ["default", "hover", "focus"],
    component: (column) => (
      <OnyxSelect
        style="width: 12rem"
        label="Test label"
        placeholder={column === "placeholder" ? "Test placeholder" : undefined}
        customError={{ shortMessage: "Test error" }}
        listLabel="List label"
        options={MOCK_VARIED_OPTIONS}
        modelValue={column === "with-value" ? MOCK_VARIED_OPTIONS_VALUES[0] : undefined}
      />
    ),
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        const input = component.getByLabel("Test label");

        // invalid is only triggered after open/closing the flyout
        await input.click();
        await component.click();

        if (row !== "focus") {
          await page.getByRole("document").click(); // reset mouse
        }
        if (row === "hover") await input.hover();
      },
    },
  });
});

test.describe("Other screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Select (readonly, disabled, loading, skeleton)",
    columns: ["readonly", "disabled", "loading", "skeleton"],
    rows: ["default", "hover", "focus-visible"],
    context,
    component: (column) => (
      <OnyxSelect
        label="Label"
        listLabel="List label"
        options={MOCK_MANY_OPTIONS}
        placeholder="Placeholder"
        readonly={column === "readonly"}
        disabled={column === "disabled"}
        loading={column === "loading"}
        skeleton={column === "skeleton"}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test("should interact with single select", async ({ mount }) => {
  let modelValue: number | undefined = MOCK_VARIED_OPTIONS_VALUES[1];

  const eventHandlers = {
    "update:modelValue": async (value: typeof modelValue) => {
      modelValue = value;
      await component.update({ props: { modelValue }, on: eventHandlers });
    },
  };

  // ARRANGE
  const component = await mount(OnyxSelect, {
    props: {
      options: MOCK_VARIED_OPTIONS,
      label: "Test select",
      listLabel: "Select label",
      modelValue,
    },
    on: eventHandlers,
  });

  const comboboxInput = component.getByRole("combobox", { name: "Test select" });

  await component.click();

  // ASSERT
  await expect(component.getByRole("option", { name: "Disabled" })).toBeDisabled();
  expect(modelValue).toStrictEqual(MOCK_VARIED_OPTIONS_VALUES[1]);

  // ACT
  await component.getByRole("combobox", { name: "Test select" }).click();
  // ASSERT
  expect(modelValue).toStrictEqual(MOCK_VARIED_OPTIONS_VALUES[1]);
  await expect(comboboxInput).toBeFocused();

  // // ACT
  await component.click();
  await component.getByRole("option", { name: "Default" }).click();
  // ASSERT
  expect(modelValue).toStrictEqual(MOCK_VARIED_OPTIONS_VALUES[0]);
  await expect(comboboxInput).toBeFocused();
});

test("should unset correctly", async ({ mount }) => {
  // ARRANGE
  const component = await mount(TestWrapperCt);

  const output = component.getByTestId("modelValue");
  const select = component.getByRole("combobox");
  await expect(select).toHaveValue("");
  await expect(output).toHaveText("");

  await select.click();
  await component.getByRole("option", { name: "Default" }).click();
  await expect(select).toHaveValue("Default");
  await expect(output).toHaveText("1");

  await component.getByRole("button", { name: "Unset" }).click();
  await expect(select).toHaveValue("");
  await expect(output).toHaveText("");
});

test("should interact with multiselect and search", async ({ mount }) => {
  let modelValue: number[] | undefined = [MOCK_VARIED_OPTIONS_VALUES[1]];
  let searchTerm: string = "";

  const eventHandlers = {
    "update:modelValue": async (value: typeof modelValue) => {
      modelValue = value;
      await update();
    },
    "update:searchTerm": async (value: typeof searchTerm) => {
      searchTerm = value;
      await update();
    },
  };

  const update = () => component.update({ props: { modelValue, searchTerm }, on: eventHandlers });

  // ARRANGE
  const component = await mount(OnyxSelect, {
    props: {
      options: MOCK_VARIED_OPTIONS,
      label: "Test select",
      listLabel: "Select label",
      withCheckAll: { label: "Select all" },
      withSearch: true,
      multiple: true,
      modelValue,
    },
    on: eventHandlers,
  });

  const mainInput = component.getByRole("textbox", { name: "Test select" });
  const miniSearchInput = component.getByRole("combobox", { name: "Filter the list items" });

  await mainInput.click();

  // ASSERT
  await expect(component.getByRole("option", { name: "Disabled" })).toBeDisabled();
  expect(modelValue).toStrictEqual([MOCK_VARIED_OPTIONS_VALUES[1]]);
  await expect(miniSearchInput).toBeFocused();

  // ACT
  await miniSearchInput.fill(" ");
  // ASSERT
  expect(modelValue, 'pressing "space" did not change the current selection').toStrictEqual([
    MOCK_VARIED_OPTIONS_VALUES[1],
  ]);

  // ACT
  await miniSearchInput.fill("default");
  await miniSearchInput.press("ArrowDown");
  await miniSearchInput.press("Enter");
  // ASSERT
  expect(modelValue).toStrictEqual([MOCK_VARIED_OPTIONS_VALUES[1], MOCK_VARIED_OPTIONS_VALUES[0]]);
  await expect(miniSearchInput).toBeFocused();

  // ACT
  await mainInput.click();
  // ASSERT
  await expect(mainInput).toBeFocused();

  // ACT
  await mainInput.click();
  // ASSERT
  await expect(
    miniSearchInput,
    "focuses the search even if the select is opened more than once",
  ).toBeFocused();
});

test("should interact with multiselect", async ({ mount }) => {
  let modelValue: number[] | undefined = [MOCK_VARIED_OPTIONS_VALUES[1]];

  const eventHandlers = {
    "update:modelValue": async (value: typeof modelValue) => {
      modelValue = value;
      await component.update({ props: { modelValue }, on: eventHandlers });
    },
  };
  const EXPECTED_SELECT_ALL_OPTIONS = [
    MOCK_VARIED_OPTIONS_VALUES[0],
    MOCK_VARIED_OPTIONS_VALUES[1],
    MOCK_VARIED_OPTIONS_VALUES[3],
  ];

  // ARRANGE
  const component = await mount(OnyxSelect, {
    props: {
      options: MOCK_VARIED_OPTIONS,
      label: "Test select",
      listLabel: "Select label",
      withCheckAll: { label: "Select all" },
      multiple: true,
      modelValue,
    },
    on: eventHandlers,
  });

  await component.getByRole("combobox", { name: "Test select" }).click();

  // ASSERT
  await expect(component.getByRole("option", { name: "Disabled" })).toBeDisabled();
  expect(modelValue).toStrictEqual([MOCK_VARIED_OPTIONS_VALUES[1]]);

  // ACT (should de-select current value)
  await component.getByRole("option", { name: "Selected" }).click();
  // ASSERT
  expect(modelValue).toEqual([]);

  // ACT (should select all non-disabled values)
  await component.getByRole("option", { name: "Select all" }).click();

  // ASSERT
  expect(modelValue).toStrictEqual(EXPECTED_SELECT_ALL_OPTIONS);

  // ACT (should select all non-disabled values)
  const keyboard = component.getByLabel("Test select");
  await keyboard.press("ArrowDown");
  await keyboard.press("Enter");
  // ASSERT
  expect(modelValue, "can toggle the selection with Enter").toStrictEqual([]);

  // ACT
  await keyboard.press("Space");
  // ASSERT
  expect(modelValue, "can toggle the selection with Space").toStrictEqual(
    EXPECTED_SELECT_ALL_OPTIONS,
  );
});

test("should pass headless accessibility tests", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(OnyxSelect, {
    props: {
      options: MOCK_MANY_OPTIONS,
      label: "Test select",
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

test("should pass headless accessibility tests (select only)", async ({ mount, page }) => {
  const eventHandlers = {
    "update:modelValue": async (modelValue: number) => {
      await component.update({ props: { modelValue }, on: eventHandlers });
    },
  };

  // ARRANGE
  const component = await mount(OnyxSelect, {
    props: {
      options: MOCK_MANY_OPTIONS,
      label: "Test select",
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
  const component = await mount(OnyxSelect, {
    props: {
      options: MOCK_MANY_OPTIONS,
      label: "Test select",
      listLabel: "Test listbox",
      lazyLoading: { enabled: true },
    },
    on: eventHandlers,
  });

  const updateProps = (props: Partial<OnyxSelectProps>) => {
    return component.update({ props, on: eventHandlers });
  };

  await component.getByRole("combobox", { name: "Test select" }).click();

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
  const component = await mount(OnyxSelect, {
    props: {
      options: MOCK_MANY_OPTIONS,
      label: "Test label",
      listLabel: "List label",
      withSearch: true,
      "onUpdate:searchTerm": (i) => onUpdateSearchTerm.push(i),
    },
  });

  await component.getByRole("textbox", { name: "Test label" }).click();
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

test("should show custom option slot content", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxSelect options={MOCK_VARIED_OPTIONS} label="Test label" listLabel="List label">
      {/* note that due to current Playwright limitation we can not access the slot bindings
      here to show dynamic content based on the current option */}
      <template v-slot:option>Custom content</template>
    </OnyxSelect>,
  );

  // ACT
  await component.getByRole("combobox", { name: "Test label" }).click();

  // ASSERT
  for (const option of MOCK_VARIED_OPTIONS) {
    await expect(component.getByLabel(option.label)).toContainText("Custom content");
  }
});

test("should not submit form when selecting via keyboard", async ({ page, mount }) => {
  let submitEventCount = 0;

  // ARRANGE
  await mount(
    <form onSubmit={() => submitEventCount++}>
      <OnyxSelect options={MOCK_VARIED_OPTIONS} label="Test label" listLabel="List label" />
    </form>,
  );

  // ACT
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  // ASSERT
  expect(submitEventCount).toBe(0);
});

test("should allow custom input text when a pre-selected value is unknown to OnyxSelect", async ({
  mount,
  page,
}) => {
  const modelValue = MOCK_MANY_OPTIONS.length + 5;

  // ARRANGE
  const component = await mount(OnyxSelect, {
    props: {
      options: MOCK_MANY_OPTIONS,
      label: "Test select",
      listLabel: "Select label",
      modelValue,
    },
  });

  // ASSERT (initial state)
  await expect(
    page.getByLabel("Test select"),
    "onyx should not be able to show the label to a single select option that is unknown",
  ).toBeEmpty();

  // ACT
  await component.update({ props: { valueLabel: "Custom selection label" } });

  // ASSERT
  await expect(
    page.getByLabel("Test select"),
    "the provided custom single selection label should be shown",
  ).toHaveValue("Custom selection label");

  // ACT
  await component.update({
    props: {
      multiple: true,
      modelValue: [modelValue],
      valueLabel: undefined,
    },
  });

  // ASSERT
  await expect(
    page.getByLabel("Test select"),
    "onyx should not be able to show the label to a multi select option that is unknown",
  ).toBeEmpty();

  // ACT
  await component.update({
    props: {
      multiple: true,
      modelValue: [modelValue],
      valueLabel: ["Custom selection label", "Other custom label"],
    },
  });

  // ASSERT
  await expect(
    page.getByLabel("Test select"),
    "the provided custom multi selection label should be shown",
  ).toHaveValue("2 selected");
});

test("should manage filtering internally except when filteredOptions are given", async ({
  mount,
  page,
}) => {
  const options = [
    { value: 1, label: "One" },
    { value: 2, label: "Two" },
    { value: 3, label: "Three" },
  ];
  // ARRANGE
  const component = await mount(OnyxSelect, {
    props: {
      options,
      label: "Test select",
      listLabel: "Select label",
      modelValue: 2,
      withSearch: true,
    },
  });

  // ACT
  await component.getByRole("textbox", { name: "Test select" }).click();
  await page.getByRole("option").first().waitFor();
  // ASSERT
  expect(await page.getByRole("option").count(), "should initially show all options").toBe(
    options.length,
  );
  await expect(page.getByLabel("One")).toBeVisible();

  // ACT
  const miniSearchInput = component.getByRole("combobox", { name: "Filter the list items" });
  await miniSearchInput.fill("1");
  // ASSERT
  expect(await page.getByRole("option").count(), "should filter automatically").toBeLessThan(
    options.length,
  );
  await expect(
    page.getByLabel("One"),
    "should not be able to match a search by the ID",
  ).toBeHidden();

  // ACT
  await component.update({ props: { searchTerm: "1", noFilter: true } });
  // ASSERT
  expect(
    await page.getByRole("option").count(),
    "should not filter with the internal logic when searchTerm is not managed by onyx",
  ).toBe(options.length);

  // ACT
  await component.update({ props: { options: options.filter(({ value }) => value === 1) } });
  // ASSERT
  await expect(page.getByLabel("One"), "should now show the manually matched option").toBeVisible();
  await expect(
    page.getByLabel("Test select"),
    "manual filtering will prevent onyx from showing the label of an option that is no longer available at the time",
  ).toBeEmpty();
});

test("should render a separate group for selected options", async ({ mount, page }) => {
  const options = [
    { value: 1, label: "One" },
    { value: 2, label: "Two" },
    { value: 3, label: "Three" },
  ];
  // ARRANGE
  const component = await mount(OnyxSelect, {
    props: {
      options,
      label: "Test select",
      listLabel: "Select label",
      modelValue: [2],
      multiple: true,
      withSearch: true,
    },
  });

  // ACT
  await component.getByRole("textbox", { name: "Test select" }).click();
  await page.getByRole("option").first().waitFor();
  // ASSERT
  await expect(page.getByText("Selected")).toBeVisible();
});

test("should not render a separate group for selected options (keepSelectionOrder)", async ({
  mount,
  page,
}) => {
  const options = [
    { value: 1, label: "One" },
    { value: 2, label: "Two" },
    { value: 3, label: "Three" },
  ];
  // ARRANGE
  const component = await mount(OnyxSelect, {
    props: {
      options,
      label: "Test select",
      listLabel: "Select label",
      modelValue: [2],
      multiple: true,
      withSearch: true,
      keepSelectionOrder: true,
    },
  });

  // ACT
  await component.getByRole("textbox", { name: "Test select" }).click();
  await page.getByRole("option").first().waitFor();
  // ASSERT
  await expect(page.getByText("Selected")).toBeHidden();
});
