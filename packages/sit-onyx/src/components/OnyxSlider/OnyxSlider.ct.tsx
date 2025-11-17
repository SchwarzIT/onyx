import { type MatrixScreenshotTestOptions } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import { SLIDER_CONTROLS } from "../OnyxSliderControl/types.js";
import OnyxSlider from "./OnyxSlider.vue";

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
      const root = component.locator(".onyx-slider__root").first();
      const thumb = component.locator(".onyx-slider__thumb").first();

      if (row === "hover") await root.hover();
      if (row === "focus-visible") await page.keyboard.press("Tab");
      if (row === "active") {
        const box = (await thumb.boundingBox())!;
        const position = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

        await page.mouse.move(position.x, position.y);
        await page.mouse.down();
        await page.mouse.move(position.x, position.y + 64);
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
        modelValue={50}
        density={column}
        style={{
          width: "12rem",
          marginBottom: row === "focus-visible" || row === "active" ? "3rem" : undefined,
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
        modelValue={[25, 75]}
        density={column}
        style={{
          width: "12rem",
          marginBottom: row === "focus-visible" || row === "active" ? "3rem" : undefined,
        }}
      />
    ),
  });

  executeMatrixScreenshotTest({
    ...screenshotOptions,
    name: "Slider (disabled)",
    columns: ["single", "range"],
    component: (column) => (
      <OnyxSlider
        label="Disabled slider"
        mode={column}
        modelValue={column === "single" ? 50 : [25, 75]}
        disabled
        style={{ width: "12rem" }}
      />
    ),
  });
});

test.describe("Screenshot tests (marks)", () => {
  executeMatrixScreenshotTest({
    name: "Slider (marks)",
    columns: DENSITIES,
    rows: ["simple", "labeled", "auto-generated"],
    component: (column, row) => {
      const marks =
        row === "simple" ? [0, 25, 50, 75, 100] : row === "labeled" ? LARGE_MARKS : true;
      return (
        <OnyxSlider
          label="Slider with marks"
          modelValue={50}
          marks={marks}
          step={row === "auto-generated" ? 25 : undefined}
          density={column}
          style={{ width: "12rem" }}
        />
      );
    },
  });
});

test.describe("Screenshot tests (other)", () => {
  executeMatrixScreenshotTest({
    name: "Slider (other)",
    columns: DENSITIES,
    rows: ["skeleton", "error", "message", "marks+message", "labelled-marks+message"],
    component: (column, row) => (
      <OnyxSlider
        label="Skeleton slider"
        modelValue={50}
        density={column}
        skeleton={row === "skeleton"}
        showError={row === "error"}
        error={row === "error" ? { shortMessage: "Error", longMessage: "Long error" } : undefined}
        message={
          row.includes("message")
            ? { shortMessage: "Message", longMessage: "Long message" }
            : undefined
        }
        marks={
          row.includes("labelled-marks") ? LARGE_MARKS : row.includes("marks") ? true : undefined
        }
        step={25}
        style={{ width: "12rem" }}
      />
    ),
  });
});

test.describe("Screenshot tests (controls)", () => {
  executeMatrixScreenshotTest({
    name: "Slider (controls)",
    columns: [...SLIDER_CONTROLS, "input-range"],
    rows: ["enabled", "disabled"],
    component: (column, row) => (
      <OnyxSlider
        label="Slider controls"
        modelValue={column === "input-range" ? [30, 70] : 50}
        mode={column === "input-range" ? "range" : "single"}
        control={column === "input-range" ? "input" : column}
        disabled={row === "disabled"}
        style={{ width: "16rem" }}
      />
    ),
  });
});

test.describe("Interaction tests", () => {
  test("should interact with single value slider", async ({ mount }) => {
    let modelValue = 50;

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
      },
      on: eventHandlers,
    });

    const slider = component.getByRole("slider", { name: "Test slider" });

    // ASSERT
    await expect(slider).toHaveValue("50");

    // ACT
    await slider.press("ArrowRight");

    // ASSERT
    await expect(slider, "should increase value when pressing arrow right").toHaveValue("51");
    expect(modelValue).toBe(51);
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
    await firstSlider.press("ArrowRight");

    // ASSERT
    await expect(firstSlider).toHaveValue("21");
    expect(modelValue).toStrictEqual([21, 80]);

    // ACT - adjust second slider
    await lastSlider.press("ArrowLeft");

    // ASSERT
    await expect(lastSlider).toHaveValue("79");
    expect(modelValue).toStrictEqual([21, 79]);
  });

  test("should handle keyboard navigation", async ({ mount }) => {
    let modelValue = 50;

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
        step: 1,
      },
      on: eventHandlers,
    });

    const slider = component.getByRole("slider");

    // ACT & ASSERT - Arrow keys
    await slider.press("ArrowRight");
    await expect(slider).toHaveValue("51");

    await slider.press("Shift+ArrowRight");
    await expect(slider).toHaveValue("61");

    await slider.press("ArrowLeft");
    await expect(slider).toHaveValue("60");

    await slider.press("Shift+ArrowLeft");
    await expect(slider).toHaveValue("50");

    await slider.press("ArrowUp");
    await expect(slider).toHaveValue("51");

    await slider.press("ArrowDown");
    await expect(slider).toHaveValue("50");

    // ACT & ASSERT - Home/End keys
    await slider.press("Home");
    await expect(slider).toHaveValue("0");

    await slider.press("End");
    await expect(slider).toHaveValue("100");
  });

  test("should respect min/max boundaries", async ({ mount }) => {
    let modelValue = 50;

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
    await slider.press("Home");
    await expect(slider).toHaveValue("20");

    // ACT & ASSERT - Try to go above maximum
    await slider.press("End");
    await expect(slider).toHaveValue("80");
  });

  test("should be disabled when disabled prop is true", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<OnyxSlider label="Disabled slider" modelValue={50} disabled />);

    const slider = component.getByRole("slider");

    // ASSERT
    await expect(slider).toBeDisabled();
    await expect(slider).toHaveValue("50");

    // ACT & ASSERT - Should not respond to keyboard input
    await slider.press("ArrowRight");
    await expect(slider).toHaveValue("50");
  });

  test("should interact with icon control", async ({ mount }) => {
    let modelValue = 50;

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
      },
      on: eventHandlers,
    });

    const slider = component.getByRole("slider");
    const decreaseButton = component.getByRole("button", { name: "Decrease value by 10" });
    const increaseButton = component.getByRole("button", { name: "Increase value by 10" });

    // ASSERT
    await expect(decreaseButton).toBeVisible();
    await expect(increaseButton).toBeVisible();

    // ACT
    await increaseButton.click();

    // ASSERT
    await expect(slider, "should increase by shiftStep").toHaveValue("60");

    // ACT
    await decreaseButton.click();

    // ASSERT
    await expect(slider, "should decrease by shiftStep").toHaveValue("50");
  });

  test("should handle auto-generated marks", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxSlider label="Auto marks slider" modelValue={50} marks step={20} min={0} max={100} />,
    );

    // Should have marks at 0, 20, 40, 60, 80, 100
    const marks = component.locator(".onyx-slider__mark");
    await expect(marks).toHaveCount(6);
  });

  test("should hide tooltip when disabled", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxSlider label="No tooltip slider" modelValue={50} disableTooltip />,
    );

    const slider = component.getByRole("slider");

    // ACT
    await slider.focus();

    // ASSERT
    await expect(component.getByRole("tooltip")).toBeHidden();
  });

  test("should interact with input control in single mode", async ({ mount }) => {
    let modelValue = 50;

    const eventHandlers = {
      "update:modelValue": async (newValue: number) => {
        modelValue = newValue;
        await component.update({ props: { modelValue }, on: eventHandlers });
      },
    };

    // ARRANGE
    const component = await mount(OnyxSlider, {
      props: {
        label: "Input control slider",
        modelValue,
        control: "input",
        min: 20,
        max: 80,
      },
      on: eventHandlers,
    });

    const slider = component.getByRole("slider");
    const input = component.getByLabel("Change value");

    // ASSERT
    await expect(input).toBeVisible();
    await expect(input).toHaveValue("50");
    await expect(slider).toHaveValue("50");

    // ACT - Change value via input
    await input.fill("75");
    await input.blur();

    // ASSERT
    expect(modelValue).toBe(75);
    await expect(slider).toHaveValue("75");

    // ACT - Change value via input to max boundary
    await input.fill("80");
    await input.blur();

    // ASSERT
    expect(modelValue).toBe(80);
    await expect(slider).toHaveValue("80");

    // ACT - Try to set value above maximum
    await input.fill("100");
    await input.blur();

    // ASSERT - Should clamp to maximum
    await expect(input).toHaveValue("80");
    await expect(slider).toHaveValue("80");
    expect(modelValue).toBe(80);

    // ACT - Try to set value below minimum
    await input.fill("10");
    await input.blur();

    // ASSERT - Should clamp to minimum
    expect(modelValue).toBe(20);
    await expect(input).toHaveValue("20");
    await expect(slider).toHaveValue("20");
  });

  test("should interact with input control in range mode", async ({ mount }) => {
    let modelValue: [number, number] = [25, 75];

    const eventHandlers = {
      "update:modelValue": async (newValue: [number, number]) => {
        modelValue = newValue;
        await component.update({ props: { modelValue }, on: eventHandlers });
      },
    };

    // ARRANGE
    const component = await mount(OnyxSlider, {
      props: {
        label: "Range input control slider",
        mode: "range",
        modelValue,
        control: "input",
      },
      on: eventHandlers,
    });

    const sliders = component.getByRole("slider");
    const firstSlider = sliders.first();
    const lastSlider = sliders.last();
    const firstInput = component.getByLabel("Change start value");
    const lastInput = component.getByLabel("Change end value");

    // ASSERT
    await expect(firstInput).toBeVisible();
    await expect(lastInput).toBeVisible();
    await expect(firstInput).toHaveValue("25");
    await expect(lastInput).toHaveValue("75");
    await expect(firstSlider).toHaveValue("25");
    await expect(lastSlider).toHaveValue("75");

    // ACT - Change first value via input
    await firstInput.fill("26");
    await firstInput.blur();

    // ASSERT
    await expect(firstInput).toHaveValue("26");
    expect(modelValue).toStrictEqual([26, 75]);

    // ACT - Change second value via input
    await lastInput.fill("80");
    await lastInput.blur();

    // ASSERT
    await expect(lastSlider).toHaveValue("80");
    expect(modelValue).toStrictEqual([26, 80]);

    // ACT - Try to set overlapping values (first > second)
    await firstInput.fill("85");
    await firstInput.blur();

    // ASSERT - Should not allow crossing over
    expect(modelValue).toStrictEqual([26, 80]); // Should remain unchanged
    await expect(firstInput).toHaveValue("26");
  });
});
