import { test } from "@playwright/experimental-ct-vue";
import { rangeSliderTesting, singleSliderTesting } from "./createSlider.testing.js";
import TestSlider from "./TestSlider.vue";

test("single slider", async ({ mount, page }) => {
  const component = await mount(<TestSlider modelValue={50} />);

  await singleSliderTesting({
    page,
    slider: component.getByLabel("Slider"),
    rail: component.locator(".slider-root"),
  });
});

test("range slider", async ({ mount, page }) => {
  const component = await mount(<TestSlider modelValue={[25, 75]} />);

  await rangeSliderTesting({
    page,
    slider: component.getByLabel("Slider"),
    rail: component.locator(".slider-root"),
  });
});
