import { expect, test } from "../../playwright-axe";
import { createScreenshotsForAllStates, mockPlaywrightIcon } from "../../utils/playwright";
import OnyxButton from "./OnyxButton.vue";

test("should render", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxButton label="Button" variation="secondary" />);

  // ASSERT
  await expect(component).toContainText("Button");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should display correctly when disabled", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxButton label="Button" variation="secondary" disabled />);

  // ASSERT
  await expect(component).toContainText("Button");
  await expect(component).toBeDisabled();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render button with icon", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxButton label="Button" variation="secondary" icon={mockPlaywrightIcon} />,
  );

  // ASSERT
  await expect(component).toContainText("Button");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should truncate text", async ({ mount }) => {
  const label = "Very long label that should be truncated";

  // ARRANGE
  const component = await mount(<OnyxButton label={label} style="max-width: 8rem;" />);

  // ASSERT
  await expect(component).toContainText(label);

  // ASSERT
  await expect(component).toHaveScreenshot("truncation-ellipsis.png");
});

test("should render skeleton", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<OnyxButton label="Test label" skeleton />);

  // ASSERT
  await expect(component).toHaveScreenshot("skeleton.png");
});

const STATES = {
  state: ["default", "disabled", "icon"],
  variation: ["primary", "secondary", "danger"],
  mode: ["default", "outline", "plain"],
  focusState: ["", "hover", "focus-visible", "active"],
} as const;

test(
  "State screenshot testing",
  createScreenshotsForAllStates(
    STATES,
    "button",
    async ({ variation, state, mode, focusState }, mount, page) => {
      const component = await mount(
        <OnyxButton
          label="label"
          variation={variation}
          mode={mode}
          disabled={state === "disabled"}
          icon={state === "icon" ? mockPlaywrightIcon : undefined}
        />,
      );

      const button = component.getByRole("button");
      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await button.hover();
      if (focusState === "active") await page.mouse.down();
      return component;
    },
  ),
);
