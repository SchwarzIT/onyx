import { test } from "@playwright/experimental-ct-vue";
import { rangeSliderTesting, singleSliderTesting } from "./createSlider.testing.js";
import RangeSlider from "./RangeSlider.vue";
import SimpleSlider from "./SimpleSlider.vue";

test("single-thumb slider", async ({ mount, page }) => {
  const component = await mount(<SimpleSlider />);

  await singleSliderTesting({
    page,
    slider: component.getByRole("slider"),
    rail: component.locator(".slider-root"),
  });
});

test("range slider", async ({ mount, page }) => {
  const component = await mount(<RangeSlider />);

  await rangeSliderTesting({
    page,
    slider: component.getByRole("slider"),
    rail: component.locator(".slider-root"),
  });
});
