import { listboxTesting } from "@sit-onyx/headless/playwright";
import { expect, test } from "../../playwright-axe";
import OnyxListbox from "./OnyxListbox.vue";
import type { ListboxOption, OnyxListboxProps } from "./types";

const MOCK_OPTIONS = Array.from({ length: 25 }, (_, index) => ({
  id: index,
  label: `Test option ${index + 1}`,
})) satisfies ListboxOption[];

test("should render", async ({ mount, makeAxeBuilder }) => {
  let modelValue: number | undefined = 2;

  // ARRANGE
  const component = await mount(OnyxListbox, {
    props: {
      options: [
        { id: 1, label: "Default" },
        { id: 2, label: "Selected" },
        { id: 3, label: "Disabled", disabled: true },
        { id: 4, label: "Very long label ".repeat(5) },
      ],
      label: "Test listbox",
      modelValue,
    },
    on: {
      "update:modelValue": async (value: number | undefined) => {
        modelValue = value;
        await component.update({ props: { modelValue } });
      },
    },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");
  await expect(component.getByText("Disabled")).toBeDisabled();

  // ACT (should de-select current value)
  await component.getByText("Selected").click();
  expect(modelValue).toBeUndefined();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render with many options", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  const component = await mount(OnyxListbox, {
    props: {
      options: MOCK_OPTIONS,
      label: "Test listbox",
    },
    on: {
      "update:modelValue": (modelValue: number | undefined) =>
        component.update({ props: { modelValue } }),
    },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("many-options.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  await listboxTesting({
    page,
    listbox: component.getByRole("listbox"),
    options: component.getByRole("option"),
    isOptionActive: async (locator) => {
      const className = await locator.getAttribute("class");
      return className?.includes("onyx-listbox-option--active") ?? false;
    },
  });
});

test("should show empty state", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<OnyxListbox label="Test listbox" options={[]} />);

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
  const component = await mount(<OnyxListbox label="Test listbox" options={[]} loading />);

  // ASSERT
  await expect(component).toHaveScreenshot("loading.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should support lazy loading", async ({ mount }) => {
  let loadMoreEventCount = 0;

  const eventHandlers = {
    loadMore: () => loadMoreEventCount++,
  };

  // ARRANGE
  const component = await mount(OnyxListbox, {
    props: {
      options: MOCK_OPTIONS,
      label: "Test listbox",
      loadingMode: "lazy",
    },
    on: eventHandlers,
  });

  await expect(component.getByRole("option")).toHaveCount(25);

  const listbox = component.getByRole("listbox");

  const scrollToOption = async (label: string) => {
    await listbox
      .getByLabel(label)
      .evaluate((element) => element.scrollIntoView({ block: "end", behavior: "smooth" }));

    // wait for scrolling to be completed
    await expect(listbox.getByLabel(label)).toBeInViewport();
  };

  const updateProps = (props: Partial<OnyxListboxProps>) => {
    return component.update({ props, on: eventHandlers });
  };

  // ACT (should not emit event if not scrolled completely to the end)
  await scrollToOption("Test option 20");

  // ASSERT
  expect(loadMoreEventCount).toBe(0);

  // ACT
  await scrollToOption("Test option 25");

  // ASSERT
  expect(loadMoreEventCount).toBe(1);

  // ACT
  await updateProps({ loading: true });

  // ASSERT
  await expect(component.locator(".onyx-loading-dots")).toBeVisible();
  await expect(component).toHaveScreenshot("lazy-loading-before.png");

  // ACT
  await updateProps({
    loading: false,
    options: MOCK_OPTIONS.concat(
      Array.from({ length: 25 }, (_, index) => {
        const id = MOCK_OPTIONS.length + index;
        return { id, label: `Test option ${id + 1}` };
      }),
    ),
  });

  // ASSERT
  await expect(component.getByRole("option")).toHaveCount(50);
  await expect(component.getByLabel("Test option 25")).toBeInViewport();
  await expect(component).toHaveScreenshot("lazy-loading-after.png");
  expect(loadMoreEventCount).toBe(1);

  // ACT (should support customizing the scroll offset)

  await updateProps({
    loadingMode: { mode: "lazy", scrollOffset: 120 },
  });
  await scrollToOption("Test option 48");

  // ASSERT
  expect(loadMoreEventCount).toBe(2);
});
