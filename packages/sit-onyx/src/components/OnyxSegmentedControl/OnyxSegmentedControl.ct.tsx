import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.jsx";
import OnyxSegmentedControl from "./OnyxSegmentedControl.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Segmented Control",
    columns: DENSITIES,
    rows: ["default", "icon", "labelAndIcon", "hover", "focus", "disabled", "truncated"],
    component: (column, row) => {
      const modelValue = "option-1";
      return (
        <div style={{ width: row === "truncated" ? "6rem" : "30rem" }}>
          <OnyxSegmentedControl
            modelValue={modelValue}
            options={[
              {
                value: "option-1",
                label: "Option 1",
                hideLabel: row === "icon",
                icon: row === "icon" || row === "labelAndIcon" ? mockPlaywrightIcon : undefined,
              },
              {
                value: "option-2",
                label: "Option 2",
                hideLabel: row === "icon",
                icon: row === "icon" || row === "labelAndIcon" ? mockPlaywrightIcon : undefined,
                disabled: row === "disabled",
              },
            ]}
            density={column}
          />
        </div>
      );
    },
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const firstControl = component.getByText("Option 1");
        const radio = component.getByRole("radio", { name: "Option 1" });

        if (row === "hover") await firstControl.hover();
        if (row === "focus") await radio.focus();
      },
    },
  });
});

test("should behave correctly", async ({ mount }) => {
  // ARRANGE
  let modelValue = "option-2";
  const component = await mount(
    <OnyxSegmentedControl
      modelValue={modelValue}
      onUpdate:modelValue={(value) => (modelValue = value)}
      options={[
        {
          value: "option-1",
          label: "Option 1",
        },
        {
          value: "option-2",
          label: "Option 2",
        },
        {
          value: "option-3",
          label: "Option 3",
          disabled: true,
        },
      ]}
    />,
  );
  const firstControl = component.getByText("Option 1");
  const radio = component.getByRole("radio", { name: "Option 1" });

  // ACT

  expect(modelValue).toBe("option-2");
  await expect(radio).not.toBeChecked();

  // ASSERT
  await firstControl.click();

  // ACT
  await expect(radio).toBeChecked();
  expect(modelValue).toBe("option-1");
});
