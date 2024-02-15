import { generatePermutations } from "../../utils/playwright";
import { expect, test } from "../../playwright-axe";
import OnyxRadioButton from "./OnyxRadioButton.vue";

test("should display correctly", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  await mount(
    <OnyxRadioButton id="my-id" label="radio label" name="radio form" value="radio-value" />,
  );

  // ASSERT
  await expect(page.getByRole("radio")).toBeAttached();
  await expect(page.getByLabel("radio label")).toBeAttached();
  await expect(page.getByText("radio label")).toBeAttached();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should display correctly when selected", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  await mount(
    <OnyxRadioButton
      id="my-id"
      label="radio label"
      name="radio form"
      value="radio-value"
      selected
    />,
  );

  // ASSERT
  await expect(page.getByRole("radio")).toBeChecked();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should display correctly when disabled", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  await mount(
    <OnyxRadioButton
      id="my-id"
      label="radio label"
      name="radio form"
      value="radio-value"
      selected
      isDisabled
    />,
  );

  // ASSERT
  await expect(page.getByRole("radio")).toBeDisabled();
  await expect(page.getByRole("radio")).toBeChecked();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should display correctly when invalid", async ({ mount, makeAxeBuilder, page }) => {
  // ARRANGE
  await mount(
    <OnyxRadioButton
      id="my-id"
      label="radio label"
      name="radio form"
      value="radio-value"
      errorMessage="radio error"
      selected
    />,
  );

  // ASSERT
  await expect(page.locator("input:invalid")).toBeAttached();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

const STATES = {
  state: ["default", "disabled", "invalid", "required"],
  select: ["selected", "unselected"],
  focus: ["", "hover", "focus-visible"],
} as const;

const testSetup = generatePermutations(STATES);

test("Screenshot test", async ({ mount, page }) => {
  const component = await mount(
    <div
      data-testid="screenshot-root"
      style="display: grid; grid-template-columns: repeat(6, 300px)"
    >
      {testSetup.map(({ select, state, focus }, i) => {
        const label = `${state} ${select} ${focus}`;
        return (
          <div class={focus && `pw-${focus}`} key={i}>
            <OnyxRadioButton
              selected={select === "selected"}
              disabled={state === "disabled"}
              required={state === "required"}
              errorMessage={state === "invalid" ? "invalid" : ""}
              name={label}
              label={label}
              id={label}
              key={label}
            />
          </div>
        );
      })}
    </div>,
  );

  const { width, height } = await page.getByTestId("screenshot-root").evaluate((e) => ({
    height: e.scrollHeight + 50,
    width: e.scrollWidth + 50,
  }));

  await page.setViewportSize({ width, height });

  // ASSERT
  await expect(component).toHaveScreenshot("radio-button-states.png");
});
