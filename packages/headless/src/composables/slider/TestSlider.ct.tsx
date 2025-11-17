import { test } from "@playwright/experimental-ct-vue";
import { multiThumbSliderTesting, singleThumbSliderTesting } from "./createSlider.testing.js";
import RangeSlider from "./RangeSlider.vue";
import SimpleSlider from "./SimpleSlider.vue";

test("single-thumb slider", async ({ mount, page }) => {
  const component = await mount(<SimpleSlider />);

  await singleThumbSliderTesting({
    page,
    slider: page.getByRole("slider"),
    container: component.locator(".slider-root"),
    initialValues: [25],
  });
});

test("range slider", async ({ mount, page }) => {
  const component = await mount(<RangeSlider />);

  await multiThumbSliderTesting({
    page,
    slider: page.getByRole("slider"),
    container: component.locator(".slider-root"),
    initialValues: [25, 75],
  });
});
