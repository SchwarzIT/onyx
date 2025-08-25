import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.jsx";
import OnyxSegmentedControlElement from "../OnyxSegmentedControlElement/OnyxSegmentedControlElement.vue";
import OnyxSegmentedControl from "./OnyxSegmentedControl.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Segmented Control",
    columns: DENSITIES,
    rows: ["default", "icon", "labelAndIcon", "hover", "focus", "selected"],
    component: (column, row) => {
      const modelValue = row === "selected" ? "option-1" : null;
      return (
        <div style={{ width: "30rem" }}>
          <OnyxSegmentedControl modelValue={modelValue} density={column}>
            <OnyxSegmentedControlElement
              value="option-1"
              label={row !== "icon" ? "Option 1" : undefined}
              icon={row === "icon" || row === "labelAndIcon" ? mockPlaywrightIcon : undefined}
            />
            <OnyxSegmentedControlElement
              value="option-2"
              label={row !== "icon" ? "Option 2" : undefined}
              icon={row === "icon" || row === "labelAndIcon" ? mockPlaywrightIcon : undefined}
            />
            <OnyxSegmentedControlElement
              value="option-3"
              label={row !== "icon" ? "Option 3" : undefined}
              icon={row === "icon" || row === "labelAndIcon" ? mockPlaywrightIcon : undefined}
            />
          </OnyxSegmentedControl>
        </div>
      );
    },
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const firstControl = component.getByRole("button", { name: "Option 1" });
        if (row === "hover") await firstControl.hover();
        if (row === "focus") await firstControl.focus();
      },
    },
  });
});

test("should work correctly", async ({ mount, page }) => {
  // ARRANGE
  let modelValue = null;
  const component = await mount(
    <OnyxSegmentedControl
      modelValue={modelValue}
      onUpdate:modelValue={(val: string) => {
        modelValue = val;
      }}
    >
      <OnyxSegmentedControlElement value="option-1" label="Option 1" />
      <OnyxSegmentedControlElement value="option-2" label="Option 2" />
      <OnyxSegmentedControlElement value="option-3" label="Option 3" />
    </OnyxSegmentedControl>,
  );
  const firstControl = component.getByRole("button", { name: "Option 1" });
  const secondControl = component.getByRole("button", { name: "Option 2" });
  const thirdControl = component.getByRole("button", { name: "Option 3" });
  await firstControl.focus();

  // ACT
  expect(modelValue).toBe(null);

  // ARRANGE
  await page.keyboard.press("Space");

  // ACT
  expect(modelValue).toBe("option-1");

  // ARRANGE
  await page.keyboard.press("ArrowRight");

  // ACT
  expect(modelValue).toBe("option-2");

  // ARRANGE
  await page.keyboard.press("ArrowLeft");

  // ACT
  expect(modelValue).toBe("option-1");

  // ARRANGE
  await secondControl.click();

  // ACT
  expect(modelValue).toBe("option-2");

  // ARRANGE
  await thirdControl.click();

  // ACT
  expect(modelValue).toBe("option-3");
});
test("disabled", async ({ mount, page }) => {
  // ARRANGE
  let modelValue = null;
  const component = await mount(
    <OnyxSegmentedControl
      modelValue={modelValue}
      onUpdate:modelValue={(val: string) => {
        modelValue = val;
      }}
    >
      <OnyxSegmentedControlElement value="option-1" label="Option 1" disabled />
      <OnyxSegmentedControlElement value="option-2" label="Option 2" />
      <OnyxSegmentedControlElement value="option-3" label="Option 3" />
    </OnyxSegmentedControl>,
  );
  const firstControl = component.getByRole("button", { name: "Option 1" });
  const secondControl = component.getByRole("button", { name: "Option 2" });

  // ACT
  await expect(firstControl).toBeDisabled();

  // ASSERT
  await page.keyboard.press("Tab");

  // ACT
  await expect(secondControl).toBeFocused();
});
