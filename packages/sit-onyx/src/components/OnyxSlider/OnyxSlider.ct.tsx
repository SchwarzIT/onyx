import type { MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxSlider from "./OnyxSlider.vue";

const SLIDER_MARKS = [
  { value: 0, label: "Min" },
  { value: 50, label: "Mid" },
  { value: 100, label: "Max" },
];

const LARGE_MARKS = [
  { value: 0, label: "0°C" },
  { value: 25, label: "25°C" },
  { value: 50, label: "50°C" },
  { value: 75, label: "75°C" },
  { value: 100, label: "100°C" },
];

const screenshotOptions = {
  rows: ["default", "hover", "focus-visible", "active"] as const,
  hooks: {
    beforeEach: async (component, page, _column, row) => {
      const sliderContainer = component.locator(".onyx-slider__container").first();
      const thumb = component.locator(".onyx-slider__thumb").first();

      if (row === "hover") await sliderContainer.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
      if (row === "active") {
        await thumb.click();
      }
    },
  },
} satisfies Partial<MatrixScreenshotTestOptions>;

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Slider (single)",
    columns: DENSITIES,
    component: (column, row) => (
      <OnyxSlider
        label="Single slider"
        modelValue={40}
        density={column}
        style={{
          width: "12rem",
          marginBottom: row === "focus-visible" ? "3rem" : undefined,
        }}
      />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Slider (range)",
    columns: DENSITIES,
    component: (column, row) => (
      <OnyxSlider
        label="Range slider"
        mode="range"
        modelValue={[20, 75]}
        density={column}
        style={{
          width: "12rem",
          marginBottom: row === "focus-visible" ? "3rem" : undefined,
        }}
      />
    ),
  });

  executeMatrixScreenshotTest({
    name: "Slider (disabled)",
    columns: ["single", "range"],
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxSlider
        label="Disabled slider"
        mode={column}
        modelValue={column === "single" ? 40 : [20, 75]}
        disabled
        style={{
          width: "12rem",
        }}
      />
    ),
    hooks: {
      beforeEach: async (component, page, _olumn, row) => {
        const sliderContainer = component.locator(".onyx-slider__container").first();
        if (row === "hover") await sliderContainer.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "Slider (skeleton)",
    columns: DENSITIES,
    rows: ["horizontal", "vertical"],
    component: (column, row) => (
      <OnyxSlider
        label="Skeleton slider"
        modelValue={40}
        density={column}
        orientation={row}
        skeleton
        style={{
          width: row === "vertical" ? "5rem" : "16rem",
          height: row === "vertical" ? "16rem" : undefined,
        }}
      />
    ),
  });
});

test.describe("Screenshot tests (with marks)", () => {
  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Slider (marks)",
    columns: ["simple", "labeled", "auto-generated"],
    component: (column) => {
      const marks =
        column === "simple" ? [0, 25, 50, 75, 100] : column === "labeled" ? LARGE_MARKS : true;

      return (
        <OnyxSlider
          label="Slider with marks"
          modelValue={[20, 75]}
          mode="range"
          marks={marks}
          step={column === "auto-generated" ? 25 : undefined}
          style={{
            width: "12rem",
          }}
        />
      );
    },
  });

  executeMatrixScreenshotTest({
    name: "Slider (discrete)",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible", "active"],
    component: (column, row) => (
      <OnyxSlider
        label="Discrete slider"
        modelValue={50}
        density={column}
        discrete
        marks={SLIDER_MARKS}
        style={{
          width: "12rem",
          marginBottom: row === "focus-visible" ? "3rem" : undefined,
        }}
      />
    ),
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        const sliderContainer = component.locator(".onyx-slider__container").first();
        const thumb = component.locator(".onyx-slider__thumb").first();

        if (row === "hover") await sliderContainer.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
        if (row === "active") {
          await thumb.click();
        }
      },
    },
  });
});

test.describe("Screenshot tests (orientation)", () => {
  executeMatrixScreenshotTest({
    name: "Slider (vertical)",
    columns: ["single", "range", "with-marks"],
    rows: DENSITIES,
    component: (column, row) => (
      <OnyxSlider
        label="Vertical slider"
        mode={column === "range" ? "range" : "single"}
        modelValue={column === "range" ? [20, 75] : 40}
        orientation="vertical"
        density={row}
        marks={column === "with-marks" ? LARGE_MARKS : undefined}
        style={{
          height: "16rem",
          width: "5rem",
        }}
      />
    ),
  });
});

test.describe("Screenshot tests (error states)", () => {
  executeMatrixScreenshotTest({
    name: "Slider (error)",
    columns: ["short", "long"],
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxSlider
        label="Error slider"
        modelValue={30}
        showError
        customError={
          column === "short"
            ? { shortMessage: "Error" }
            : { shortMessage: "Error", longMessage: "This is a detailed error message" }
        }
        style={{
          width: "12rem",
        }}
      />
    ),
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        const sliderContainer = component.locator(".onyx-slider__container").first();
        if (row === "hover") await sliderContainer.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test.describe("Screenshot tests (message)", () => {
  executeMatrixScreenshotTest({
    name: "Slider (message)",
    columns: DENSITIES,
    rows: ["default"],
    component: (column) => (
      <OnyxSlider
        label="Slider with message"
        modelValue={40}
        density={column}
        message={{ shortMessage: "Adjust the slider to set your preference" }}
      />
    ),
  });
});

test.describe("Screenshot tests (tooltip)", () => {
  executeMatrixScreenshotTest({
    name: "Slider (tooltip)",
    columns: ["tooltip-enabled", "tooltip-disabled"],
    rows: ["single", "range"],
    component: (column, row) => (
      <OnyxSlider
        label="Slider tooltip"
        mode={row}
        modelValue={row === "single" ? 40 : [20, 75]}
        disableTooltip={column === "tooltip-disabled"}
        style={{
          width: "12rem",
          marginBottom: "3rem",
        }}
      />
    ),
    hooks: {
      beforeEach: async (_component, page) => {
        await page.keyboard.press("Tab");
      },
    },
  });
});

test.describe("Interaction tests", () => {
  test("should interact with single value slider", async ({ mount }) => {
    let modelValue: number = 50;

    const eventHandlers = {
      "update:modelValue": async (newValue: number) => {
        modelValue = newValue;
        await component.update({ props: { modelValue }, on: eventHandlers });
      },
    };

    // ARRANGE
    const component = await mount(OnyxSlider, {
      props: {
        label: "Test slider",
        modelValue,
        min: 0,
        max: 100,
      },
      on: eventHandlers,
    });

    const slider = component.getByRole("slider", { name: "Test slider" });

    // ASSERT
    await expect(slider).toHaveValue("50");

    // ACT - keyboard interaction
    await slider.focus();
    await slider.press("ArrowRight");

    // ASSERT - value should have increased by 1
    await expect(slider).toHaveValue("51");
  });

  test("should interact with range slider", async ({ mount }) => {
    let modelValue: [number, number] = [20, 80];

    const eventHandlers = {
      "update:modelValue": async (newValue: [number, number]) => {
        modelValue = newValue;
        await component.update({ props: { modelValue }, on: eventHandlers });
      },
    };

    // ARRANGE
    const component = await mount(OnyxSlider, {
      props: {
        label: "Range slider",
        mode: "range",
        modelValue,
        min: 0,
        max: 100,
      },
      on: eventHandlers,
    });
    const sliders = component.getByRole("slider");
    const firstSlider = sliders.first();
    const lastSlider = sliders.last();

    // ASSERT
    await expect(firstSlider).toHaveValue("20");
    await expect(lastSlider).toHaveValue("80");

    // ACT - adjust first slider
    await firstSlider.focus();
    await firstSlider.press("ArrowRight");

    // ASSERT
    await expect(firstSlider).toHaveValue("21");

    // ACT - adjust second slider
    await lastSlider.focus();
    await lastSlider.press("ArrowLeft");

    // ASSERT
    await expect(lastSlider).toHaveValue("79");
  });

  test("should handle keyboard navigation", async ({ mount }) => {
    let modelValue: number = 50;

    const eventHandlers = {
      "update:modelValue": async (newValue: number) => {
        modelValue = newValue;
        await component.update({ props: { modelValue }, on: eventHandlers });
      },
    };

    // ARRANGE
    const component = await mount(OnyxSlider, {
      props: {
        label: "Keyboard test slider",
        modelValue,
        min: 0,
        max: 100,
        step: 10,
      },
      on: eventHandlers,
    });

    const slider = component.getByRole("slider");
    await slider.focus();

    // ACT & ASSERT - Arrow keys
    await component.page().keyboard.press("ArrowRight");
    await expect(slider).toHaveValue("60");

    await component.page().keyboard.press("ArrowLeft");
    await expect(slider).toHaveValue("50");

    await component.page().keyboard.press("ArrowUp");
    await expect(slider).toHaveValue("60");

    await component.page().keyboard.press("ArrowDown");
    await expect(slider).toHaveValue("50");

    // ACT & ASSERT - Home/End keys
    await component.page().keyboard.press("Home");
    await expect(slider).toHaveValue("0");

    await component.page().keyboard.press("End");
    await expect(slider).toHaveValue("100");
  });

  test("should respect min/max boundaries", async ({ mount }) => {
    let modelValue: number = 50;

    const eventHandlers = {
      "update:modelValue": async (newValue: number) => {
        modelValue = newValue;
        await component.update({ props: { modelValue }, on: eventHandlers });
      },
    };

    // ARRANGE
    const component = await mount(OnyxSlider, {
      props: {
        label: "Boundary test slider",
        modelValue,
        min: 20,
        max: 80,
      },
      on: eventHandlers,
    });

    const slider = component.getByRole("slider");

    // ACT & ASSERT - Try to go below minimum
    await slider.focus();
    await component.page().keyboard.press("Home");
    await expect(slider).toHaveValue("20");

    // ACT & ASSERT - Try to go above maximum
    await component.page().keyboard.press("End");
    await expect(slider).toHaveValue("80");
  });

  test("should work with marks", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxSlider label="Marks slider" modelValue={50} marks={SLIDER_MARKS} />,
    );

    // ASSERT - Check marks are displayed
    await expect(component.getByText("Min")).toBeVisible();
    await expect(component.getByText("Mid")).toBeVisible();
    await expect(component.getByText("Max")).toBeVisible();
  });

  test("should be disabled when disabled prop is true", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxSlider label="Disabled slider" modelValue={50} disabled={true} />,
    );

    const slider = component.getByRole("slider");

    // ASSERT
    await expect(slider).toBeDisabled();

    // ACT & ASSERT - Should not respond to keyboard input
    await slider.focus();
    await expect(slider).toHaveValue("50");
    await component.page().keyboard.press("ArrowRight");
    await expect(slider).toHaveValue("50");
  });

  test("should display custom error message", async ({ mount }) => {
    const errorMessage = "Custom error";

    // ARRANGE
    const component = await mount(
      <OnyxSlider
        label="Error slider"
        modelValue={30}
        showError
        customError={{ shortMessage: errorMessage }}
      />,
    );

    // ASSERT
    await expect(component.getByText(errorMessage)).toBeVisible();
  });

  test("should display help message", async ({ mount }) => {
    const helpMessage = "Adjust the slider to set your preference";

    // ARRANGE
    const component = await mount(
      <OnyxSlider label="Help slider" modelValue={50} message={{ shortMessage: helpMessage }} />,
    );

    // ASSERT
    await expect(component.getByText(helpMessage)).toBeVisible();
  });

  test("should display value control", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxSlider label="Control slider" modelValue={30} control="value" />,
    );

    const valueControls = component.getByRole("img");

    // ASSERT - Value control should be visible
    await expect(valueControls.first()).toBeVisible();
    await expect(valueControls.first()).toHaveText("0");
    await expect(valueControls.last()).toBeVisible();
    await expect(valueControls.last()).toHaveText("100");
  });

  test("should display and interact with icon control buttons", async ({ mount }) => {
    let modelValue: number = 50;

    const eventHandlers = {
      "update:modelValue": async (newValue: number) => {
        modelValue = newValue;
        await component.update({ props: { modelValue }, on: eventHandlers });
      },
    };

    // ARRANGE
    const component = await mount(OnyxSlider, {
      props: {
        label: "Icon control slider",
        modelValue,
        control: "icon",
        min: 0,
        max: 100,
        shiftStep: 10,
      },
      on: eventHandlers,
    });

    const slider = component.getByRole("slider");
    const buttons = component.getByRole("button");
    const increaseButton = buttons.nth(1);
    const decreaseButton = buttons.nth(0);

    // ASSERT - Icon buttons should be visible
    await expect(decreaseButton).toBeVisible();
    await expect(increaseButton).toBeVisible();

    // ACT - Click increase button
    await increaseButton.click();

    // ASSERT - Value should have increased by shiftStep
    await expect(slider).toHaveValue("60");

    // ACT - Click decrease button
    await decreaseButton.click();

    // ASSERT - Value should have decreased by shiftStep back to original
    await expect(slider).toHaveValue("50");
  });

  test("should handle discrete mode", async ({ mount }) => {
    let modelValue: number = 50;

    const eventHandlers = {
      "update:modelValue": async (newValue: number) => {
        modelValue = newValue;
        await component.update({ props: { modelValue }, on: eventHandlers });
      },
    };

    // ARRANGE
    const component = await mount(OnyxSlider, {
      props: {
        label: "Discrete slider",
        modelValue,
        discrete: true,
        marks: SLIDER_MARKS,
      },
      on: eventHandlers,
    });

    const slider = component.getByRole("slider");

    // ASSERT - Should snap to mark values
    await slider.focus();
    await component.page().keyboard.press("ArrowRight");

    // In discrete mode, it should snap to the next mark (100)
    await expect(slider).toHaveValue("100");

    await component.page().keyboard.press("ArrowLeft");
    // Should snap back to previous mark (50)
    await expect(slider).toHaveValue("50");
  });

  test("should support vertical orientation", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxSlider
        label="Vertical slider"
        modelValue={40}
        orientation="vertical"
        marks={SLIDER_MARKS}
        style={{ height: "16rem" }}
      />,
    );

    // ASSERT - Check slider is present and accessible
    const slider = component.getByRole("slider");
    await expect(slider).toHaveValue("40");

    // ASSERT - Check marks are displayed
    await expect(component.getByText("Min")).toBeVisible();
    await expect(component.getByText("Mid")).toBeVisible();
    await expect(component.getByText("Max")).toBeVisible();
  });

  test("should handle auto-generated marks", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxSlider label="Auto marks slider" modelValue={40} marks step={20} min={0} max={100} />,
    );

    // ASSERT - Auto-generated marks should be visible based on step
    const slider = component.getByRole("slider");
    await expect(slider).toHaveValue("40");

    // Should have marks at 0, 20, 40, 60, 80, 100
    const markElements = component.locator(".onyx-slider__mark");
    await expect(markElements).toHaveCount(6);
  });

  test("should hide tooltip when disabled", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxSlider label="No tooltip slider" modelValue={40} disableTooltip={true} />,
    );

    const slider = component.getByRole("slider");

    // ACT - Focus to trigger potential tooltip
    await slider.focus();

    // ASSERT - Tooltip should not be visible
    await expect(component.getByRole("tooltip")).toBeHidden();
  });
});
