import { expect, test } from "../../playwright-axe";
import { matrixScreenshotTest, mockPlaywrightIcon } from "../../utils/playwright";
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
  state: ["default", "disabled", "icon", "loading"],
  variation: ["primary", "secondary", "danger"],
  mode: ["default", "outline", "plain"],
  focusState: ["", "hover", "focus-visible", "active"],
} as const;

test(
  "state screenshot testing",
  matrixScreenshotTest({
    states: STATES,
    component: OnyxButton,
    baseName: "button",
    props: ({ state, variation, mode }) => ({
      label: "label",
      variation,
      mode,
      disabled: state === "disabled",
      loading: state === "loading",
      icon: state === "icon" ? mockPlaywrightIcon : undefined,
    }),
    onAfterUpdate: async ({ focusState }, { component, page }) => {
      if (focusState === "focus-visible") await page.keyboard.press("Tab");
      if (focusState === "hover") await component.hover();
      if (focusState === "active") await page.mouse.down();
    },
  }),
);
