import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { createFormElementUtils } from "../OnyxFormElement/OnyxFormElement.ct-utils";
import OnyxDatePicker from "./OnyxDatePicker.vue";

test.describe("Screenshot tests", () => {
  for (const state of ["default", "with value"] as const) {
    executeMatrixScreenshotTest({
      name: `DatePicker (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus"],
      component: (column) => {
        return (
          <OnyxDatePicker
            label="Test label"
            density={column}
            modelValue={state === "with value" ? new Date(2024, 10, 25, 14, 30) : undefined}
            style="width: 12rem;"
          />
        );
      },
      beforeScreenshot: async (component, page, column, row) => {
        const datepicker = component.getByLabel("Test label");
        if (row === "hover") await datepicker.hover();
        if (row === "focus") await datepicker.focus();
      },
    });
  }
});

test("should open flyout", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(<OnyxDatePicker label="Test label" style="width: 12rem;" />);
  const datepicker = component.getByLabel("Test label");
  const box = (await datepicker.boundingBox())!;

  // ACT
  await page.mouse.click(box.x + box.width - 8, box.y + box.height - 8);

  // ASSERT
  await expect(page).toHaveScreenshot("open.png");
});

test("should emit events", async ({ mount, makeAxeBuilder }) => {
  const events = {
    updateModelValue: [] as (string | undefined)[],
  };

  // ARRANGE
  const component = await mount(
    <OnyxDatePicker
      label="Label"
      onUpdate:modelValue={(value) => events.updateModelValue.push(value)}
    />,
  );

  // should not emit initial events
  expect(events).toMatchObject({ updateModelValue: [] });

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);

  const inputElement = component.getByLabel("Label");

  // ACT
  await inputElement.fill("2024-11-25");

  // ASSERT
  await expect(inputElement).toHaveValue("2024-11-25");
  expect(events).toMatchObject({
    updateModelValue: ["2024-11-25T00:00:00.000Z"],
  });
});

test("should have aria-label if label is hidden", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxDatePicker label="Test label" style="width: 12rem;" hideLabel />,
  );

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expect(component).not.toContainText("Test label");
  await expect(component.getByLabel("Test label")).toBeAttached();
});

test("should show error message after interaction", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxDatePicker label="Demo" style="width: 12rem;" required />);
  const formElementUtils = createFormElementUtils(component);
  const input = component.getByLabel("Demo");
  const errorPreview = component.getByText("Required");
  const fullError = formElementUtils
    .getTooltipPopover("message")
    .getByText("Please fill in this field.");

  // ASSERT: initially no error shows
  await expect(errorPreview).toBeHidden();
  await expect(fullError).toBeHidden();

  // ACT: interact with the input
  await input.focus();
  await input.fill("2024-11-25");
  await input.press("Delete");
  await input.blur();

  // ASSERT: after interaction, the error preview shows
  await expect(errorPreview).toBeVisible();
  await expect(formElementUtils.getTooltipTrigger("message")).toBeVisible();
  await expect(fullError).toBeHidden();

  // ACT
  await formElementUtils.triggerTooltipVisible("message");
  // ASSERT: the full error message shows
  await expect(fullError).toBeVisible();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should show correct message", async ({ mount }) => {
  const message = { shortMessage: "Test short message" };
  const successMessage = { shortMessage: "Test success short message" };
  const component = await mount(
    <OnyxDatePicker label="Label" required success={successMessage} message={message} />,
  );

  const messageElement = component.getByText("Test short message");
  const successMessageElement = component.getByText("Test success short message");
  const errorMessageElement = component.getByText("Required");
  const input = component.getByLabel("Label");

  // ASSERT
  await expect(messageElement).toBeHidden();
  await expect(successMessageElement).toBeVisible();

  //ACT
  await input.click();
  await input.fill("2024-11-25");
  await input.press("Delete");
  await input.blur();

  // ASSERT
  await expect(messageElement).toBeHidden();
  await expect(successMessageElement).toBeHidden();
  await expect(errorMessageElement).toBeVisible();
});
