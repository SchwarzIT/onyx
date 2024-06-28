import type { MountResultJsx } from "@playwright/experimental-ct-vue";
import type { Locator } from "@playwright/test";
import { comboboxSelectOnlyTesting, comboboxTesting } from "@sit-onyx/headless/playwright";
import type { FormErrorMessages } from "src/composables/useCustomValidity";
import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxSelect from "./OnyxSelect.vue";
import type { OnyxSelectProps, SelectOption } from "./types";

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
] satisfies SelectOption[];

const MOCK_MANY_OPTIONS = Array.from({ length: 25 }, (_, index) => ({
  value: index,
  label: `Test option ${index + 1}`,
})) satisfies SelectOption[];

const openFlyout = async (component: MountResultJsx) => {
  await component.click();

  // since the flyout is positioned absolute, we need to set the component size accordingly
  // so the screenshot contains the whole component
  await component.evaluate((element) => {
    element.style.height = `${element.scrollHeight}px`;
    element.style.width = `${element.scrollWidth}px`;
  });
};

test.describe("Default screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Select",
    columns: DENSITIES,
    rows: ["default", "required", "hideLabel", "open"],
    disabledAccessibilityRules: DISABLED_ACCESSIBILITY_RULES,
    component: (column, row) => (
      <div>
        <OnyxSelect
          label="Label"
          listLabel="List label"
          options={MOCK_VARIED_OPTIONS}
          modelValue={MOCK_VARIED_OPTIONS[1]}
          density={column}
          required={row === "required"}
          hideLabel={row === "hideLabel"}
        />
      </div>
    ),
    beforeScreenshot: async (component, _page, _column, row) => {
      if (row === "open") await openFlyout(component);
    },
  });
});

test.describe("Empty screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Select (empty)",
    columns: DENSITIES,
    rows: ["empty", "search-empty"],
    disabledAccessibilityRules: DISABLED_ACCESSIBILITY_RULES,
    component: (column, row) => (
      <div>
        {row === "empty" ? (
          <OnyxSelect label="Label" listLabel="List label" options={[]} density={column} />
        ) : (
          <OnyxSelect
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
  ] satisfies SelectOption[];

  executeMatrixScreenshotTest({
    name: "Select (grouped)",
    columns: DENSITIES,
    rows: ["default"],
    disabledAccessibilityRules: DISABLED_ACCESSIBILITY_RULES,
    component: (column) => (
      <div>
        <OnyxSelect
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
    name: "Select (multiple)",
    columns: DENSITIES,
    rows: ["default", "check-all", "search", "preview"],
    disabledAccessibilityRules: [
      ...DISABLED_ACCESSIBILITY_RULES,
      // TODO: as part of https://github.com/SchwarzIT/onyx/issues/1026,
      // the following disabled rule should be removed.
      "nested-interactive",
    ],
    component: (column, row) => {
      let modelValue = [MOCK_VARIED_OPTIONS[0]];
      if (column === "compact") modelValue = [];
      if (column === "cozy" || row === "preview") modelValue = MOCK_VARIED_OPTIONS;

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
          />
        </div>
      );
    },
    beforeScreenshot: async (component, _page, _column, row) => {
      if (row !== "preview") await openFlyout(component);
    },
  });
});

test.describe("Loading screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Select (loading)",
    columns: ["loading", "lazy-loading", "custom-button"],
    rows: ["default"],
    disabledAccessibilityRules: DISABLED_ACCESSIBILITY_RULES,
    component: (column) => (
      <div>
        <OnyxSelect
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
        </OnyxSelect>
      </div>
    ),
    beforeScreenshot: async (component, _page, column) => {
      await openFlyout(component);

      if (column !== "loading") {
        await component.getByLabel(MOCK_MANY_OPTIONS.at(-1)!.label).scrollIntoViewIfNeeded();
      }
    },
  });
});

test.describe("Invalidity handling screenshots", () => {
  const isTooltipVisible = async (tooltip: Locator) => {
    await expect(tooltip).toBeVisible();
  };

  executeMatrixScreenshotTest({
    name: "Select (message replacement on invalid)",
    columns: ["default", "long-text"],
    rows: ["messageTooltip", "error", "errorTooltip"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => {
      const showLongMessage = column !== "default";
      const label =
        column === "long-text"
          ? "Very very long test label that should be truncated"
          : "Test label";
      const message = showLongMessage
        ? "Very long message that should be truncated"
        : "Test message";
      const errorMessages: FormErrorMessages = {
        shortMessage: showLongMessage
          ? "Very long error preview that should be truncated"
          : "Test error",
        longMessage: row === "errorTooltip" ? "Extended error information" : undefined,
      };
      const messageTooltip = "Additional info message";

      return (
        <OnyxSelect
          style="width: 12rem"
          label={label}
          message={message}
          customError={row !== "messageTooltip" ? errorMessages : undefined}
          messageTooltip={messageTooltip}
          listLabel="List label"
          options={MOCK_VARIED_OPTIONS}
        />
      );
    },
    beforeScreenshot: async (component, page, _column, row) => {
      const input = component.getByLabel("Test label");

      // invalid is only triggered after open/closing the flyout
      await input.click();
      await component.click();
      await input.blur();

      await component.evaluate((element) => {
        element.style.padding = `0 5rem 3rem 2rem`;
      });

      if (row !== "error") {
        const tooltipButton =
          row === "errorTooltip"
            ? page.getByLabel("Error Tooltip")
            : page.getByLabel("Info Tooltip");
        const tooltip = page.getByRole("tooltip");

        await tooltipButton.hover();

        await isTooltipVisible(tooltip);
      }
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
        modelValue={column === "with-value" ? MOCK_VARIED_OPTIONS[0] : undefined}
      />
    ),
    beforeScreenshot: async (component, _page, _column, row) => {
      const input = component.getByLabel("Test label");

      // invalid is only triggered after open/closing the flyout
      await input.click();
      await component.click();

      if (row !== "focus") {
        await input.blur();
      }
      if (row === "hover") await input.hover();
    },
  });
});

test.describe("Other screenshots", () => {
  executeMatrixScreenshotTest({
    name: "Select (readonly, disabled, loading, skeleton)",
    columns: ["readonly", "disabled", "loading", "skeleton"],
    rows: ["default", "hover", "focus-visible"],
    disabledAccessibilityRules: DISABLED_ACCESSIBILITY_RULES,
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
    beforeScreenshot: async (component, page, column, row) => {
      if (row === "hover") await component.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
    },
  });
});

test("should interact with single select", async ({ mount }) => {
  let modelValue: SelectOption | undefined = MOCK_VARIED_OPTIONS[1];

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
  await expect(component.getByText("Disabled")).toBeDisabled();
  expect(modelValue).toStrictEqual(MOCK_VARIED_OPTIONS[1]);

  // ACT
  await component.getByText("Selected").click();
  // ASSERT
  expect(modelValue).toStrictEqual(MOCK_VARIED_OPTIONS[1]);
  await expect(comboboxInput).toBeFocused();

  // // ACT
  await component.click();
  await component.getByRole("option", { name: "Default" }).click();
  // ASSERT
  expect(modelValue).toStrictEqual(MOCK_VARIED_OPTIONS[0]);
  await expect(comboboxInput).toBeFocused();
});

test("should interact with multiselect and search", async ({ mount }) => {
  let modelValue: SelectOption[] | undefined = [MOCK_VARIED_OPTIONS[1]];
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

  await component.click();

  // ASSERT
  await expect(component.getByText("Disabled")).toBeDisabled();
  expect(modelValue).toStrictEqual([MOCK_VARIED_OPTIONS[1]]);
  await expect(miniSearchInput).toBeFocused();

  // ACT
  await miniSearchInput.fill("default");
  await miniSearchInput.press("ArrowDown");
  await miniSearchInput.press("Enter");

  // ASSERT
  expect(modelValue).toStrictEqual([MOCK_VARIED_OPTIONS[1], MOCK_VARIED_OPTIONS[0]]);
  await expect(miniSearchInput).toBeFocused();

  // ACT
  await component.click();

  // ASSERT
  await expect(mainInput).toBeFocused();
});

test("should interact with multiselect", async ({ mount }) => {
  let modelValue: SelectOption[] | undefined = [MOCK_VARIED_OPTIONS[1]];

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

// eslint-disable-next-line playwright/expect-expect
test("should pass headless accessibility tests (select only)", async ({ mount, page }) => {
  const eventHandlers = {
    "update:modelValue": (modelValue: SelectOption) => {
      component.update({ props: { modelValue }, on: eventHandlers });
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
  const component = await mount(OnyxSelect, {
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
  await component.click();

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
  await expect(submitEventCount).toBe(0);
});
