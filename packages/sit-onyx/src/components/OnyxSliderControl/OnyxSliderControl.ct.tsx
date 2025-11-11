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
        shiftStep={10}
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
        shiftStep={10}
        density={column}
      />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Slider control (input)",
    columns: DENSITIES,
    component: (column) => <OnyxSliderControl control="input" modelValue={50} density={column} />,
  });

  executeMatrixScreenshotTest({
    name: "Slider control (disabled)",
    columns: ["icon", "input"],
    rows: ["default", "hover"],
    component: (column) => {
      return (
        <OnyxSliderControl
          control={column}
          direction="increase"
          modelValue={50}
          shiftStep={10}
          disabled={true}
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

test.describe("Interaction tests", () => {
  test("should handle icon control decrease", async ({ mount }) => {
    let modelValue = 50;

    const eventHandlers = {
      "update:modelValue": async (newValue: number) => {
        modelValue = newValue;
      },
    };

    // ARRANGE
    const component = await mount(OnyxSliderControl, {
      props: {
        control: "icon",
        direction: "decrease",
        modelValue,
        shiftStep: 10,
      },
      on: eventHandlers,
    });

    const button = component.getByRole("button");

    // ASSERT
    await expect(button).toBeVisible();
    await expect(button).toHaveAccessibleName(/decrease.*10/i);

    // ACT
    await button.click();

    // ASSERT
    expect(modelValue).toBe(40);
  });

  test("should handle icon control increase", async ({ mount }) => {
    let modelValue = 50;

    const eventHandlers = {
      "update:modelValue": async (newValue: number) => {
        modelValue = newValue;
      },
    };

    // ARRANGE
    const component = await mount(OnyxSliderControl, {
      props: {
        control: "icon",
        direction: "increase",
        modelValue,
        shiftStep: 5,
      },
      on: eventHandlers,
    });

    const button = component.getByRole("button");

    // ASSERT
    await expect(button).toBeVisible();
    await expect(button).toHaveAccessibleName(/increase.*5/i);

    // ACT
    await button.click();

    // ASSERT
    expect(modelValue).toBe(55);
  });

  test("should handle input control changes", async ({ mount }) => {
    let modelValue = 50;

    const eventHandlers = {
      "update:modelValue": async (newValue: number) => {
        modelValue = newValue;
      },
    };

    // ARRANGE
    const component = await mount(OnyxSliderControl, {
      props: {
        control: "input",
        modelValue,
      },
      on: eventHandlers,
    });

    const input = component.getByLabel("Change value");

    // ASSERT
    await expect(input).toBeVisible();
    await expect(input).toHaveValue("50");

    // ACT
    await input.fill("75");
    await input.blur();

    // ASSERT
    expect(modelValue).toBe(75);
  });

  test("should display value control correctly", async ({ mount }) => {
    // ARRANGE
    const component = await mount(OnyxSliderControl, {
      props: {
        control: "value",
        modelValue: 42,
      },
    });

    // ASSERT
    await expect(component).toContainText("42");
    await expect(component.getByRole("button")).toBeHidden();
    await expect(component.getByRole("spinbutton")).toBeHidden();
  });

  test("should handle disabled state for input control", async ({ mount }) => {
    // ARRANGE
    const component = await mount(OnyxSliderControl, {
      props: {
        control: "input",
        modelValue: 50,
        disabled: true,
      },
    });

    const input = component.getByLabel("Change value");

    // ASSERT
    await expect(input).toBeDisabled();
  });
});
