import { expect, test } from "../../playwright-axe";
import OnyxListbox from "./OnyxListbox.vue";

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
      modelValue,
      label: "Test listbox",
      hideLabel: true,
    },
    on: {
      "update:modelValue": (value: number | undefined) => (modelValue = value),
    },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");
  await expect(component.getByText("Disabled")).toBeDisabled();

  // ACT (should de-select current value)
  await component.getByText("Selected").click();
  expect(modelValue).toBeUndefined();
  await component.update({ props: { modelValue } });

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render with many options", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxListbox
      options={Array.from({ length: 25 }, (_, index) => ({
        id: index,
        label: `Test option ${index + 1}`,
      }))}
      label="Test listbox"
      hideLabel
    />,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("many-options.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  await expect(component.getByText("Test option 8")).toBeInViewport();
  await expect(component.getByText("Test option 9")).not.toBeInViewport();

  await component.getByText("Test option 25").scrollIntoViewIfNeeded();
  await expect(component.getByText("Test option 25")).toBeInViewport();
});
