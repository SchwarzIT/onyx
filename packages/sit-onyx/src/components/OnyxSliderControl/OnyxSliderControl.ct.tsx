import type { MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxSliderControl from "./OnyxSliderControl.vue";

const screenshotOptions = {
  rows: ["default", "hover", "focus-visible"] as const,
  hooks: {
    beforeEach: async (component, page, _column, row) => {
      const button = component.getByRole("button").first();
      const input = component.getByLabel("Change value").first();

      if (row === "hover") {
        if (await button.isVisible()) await button.hover();
        if (await input.isVisible()) await input.hover();
      }
      if (row === "focus-visible") {
        await page.keyboard.press("Tab");
      }
    },
  },
} satisfies Partial<MatrixScreenshotTestOptions>;

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Slider control (value)",
    columns: DENSITIES,
    component: (column) => <OnyxSliderControl control="value" modelValue={50} density={column} />,
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Slider control (icon decrease)",
    columns: DENSITIES,
    component: (column) => (
      <OnyxSliderControl
        control="icon"
        direction="decrease"
        modelValue={50}
        step={10}
        density={column}
      />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Slider control (icon increase)",
    columns: DENSITIES,
    component: (column) => (
      <OnyxSliderControl
        control="icon"
        direction="increase"
        modelValue={50}
        step={10}
        density={column}
      />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Slider control (input)",
    columns: DENSITIES,
    component: (column) => (
      <OnyxSliderControl
        control="input"
        modelValue={50}
        step={1}
        min={0}
        max={100}
        density={column}
      />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Slider control (disabled)",
    columns: ["icon", "input"],
    rows: ["default", "hover"],
    component: (column) => {
      return column === "icon" ? (
        <OnyxSliderControl
          control={column}
          direction="increase"
          modelValue={50}
          step={10}
          disabled
        />
      ) : (
        <OnyxSliderControl
          control={column}
          direction="increase"
          modelValue={50}
          step={10}
          min={0}
          max={100}
          disabled
        />
      );
    },
    hooks: {
      beforeEach: async (component, _page, _column, row) => {
        if (row === "hover") {
          const button = component.getByRole("button").first();
          const input = component.getByLabel("Change value").first();
          if (await button.isVisible()) await button.hover();
          if (await input.isVisible()) await input.hover();
        }
      },
    },
  });
});

test("should handle icon control", async ({ mount }) => {
  let modelValue = 50;

  // ARRANGE
  const component = await mount(OnyxSliderControl, {
    props: {
      control: "icon",
      direction: "decrease",
      modelValue,
      step: 10,
      "onUpdate:modelValue": (newValue) => (modelValue = newValue),
    },
  });

  // ACT
  await component.getByLabel("Decrease value by 10").click();

  // ASSERT
  expect(modelValue).toBe(40);

  // ACT
  await component.update({ props: { direction: "increase", modelValue: 50 } });

  // ACT
  await component.getByLabel("Increase value by 10").click();

  // ASSERT
  expect(modelValue).toBe(60);
});

test("should handle input control changes", async ({ mount }) => {
  let modelValue = 50;

  // ARRANGE
  const component = await mount(OnyxSliderControl, {
    props: {
      control: "input",
      modelValue,
      step: 10,
      min: 0,
      max: 1000,
      "onUpdate:modelValue": async (newValue) => {
        modelValue = newValue;
        await component.update({ props: { modelValue } });
      },
    },
  });

  const input = component.getByLabel("Change value");

  // ASSERT
  await expect(input).toBeVisible();
  await expect(input).toHaveValue("50");

  // ACT
  await input.fill("75");
  await input.blur();

  // ASSERT
  await expect(input).toHaveValue("75");
  expect(modelValue).toBe(75);

  // ACT
  await input.press("ArrowUp");

  // ASSERT
  await expect(input).toHaveValue("85");
  expect(modelValue).toBe(85);
});
