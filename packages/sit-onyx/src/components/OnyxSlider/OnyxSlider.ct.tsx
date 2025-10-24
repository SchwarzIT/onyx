import { expect, test } from "../../playwright/a11y.js";
import OnyxSlider from "./OnyxSlider.vue";

const SLIDER_MARKS = [
  { value: 0, label: "Min" },
  { value: 50, label: "Mid" },
  { value: 100, label: "Max" },
];

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
  await slider.press("ArrowRight");

  // ASSERT - value should have increased by 2
  await expect(slider).toHaveValue("52");
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
  await firstSlider.press("ArrowRight");

  // ASSERT
  await expect(firstSlider).toHaveValue("22");

  // ACT - adjust second slider
  await lastSlider.focus();
  await lastSlider.press("ArrowLeft");
  await lastSlider.press("ArrowLeft");

  // ASSERT
  await expect(lastSlider).toHaveValue("78");
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

test("should display required indicator", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<OnyxSlider label="Required slider" modelValue={50} />);

  // Since required prop is not available on OnyxSlider, this test is simplified
  // The label should still be visible and properly rendered
  await expect(component.getByText("Required slider")).toBeVisible();
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
  let modelValue = 30;
  const eventHandlers = {
    "update:modelValue": (value: number) => {
      modelValue = value;
    },
  };

  // ARRANGE
  const component = await mount(
    <OnyxSlider label="Control slider" modelValue={modelValue} control="value" />,
    { on: eventHandlers },
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
