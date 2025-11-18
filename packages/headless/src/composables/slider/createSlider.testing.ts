import { expect, test } from "@playwright/experimental-ct-vue";
import type { Locator, Page } from "@playwright/test";

export type SliderTestingOptions = {
  /**
   * Playwright page.
   */
  page: Page;
  /**
   * Locator for the slider element(s) (native `<input>`).
   */
  slider: Locator;
  /**
   * Locator to the sliders rail element.
   */
  rail: Locator;
};

const getRailPosition = async (rail: Locator, percentage: number) => {
  const box = (await rail.boundingBox())!;
  const x = box.x + box.width * percentage;
  const y = box.y + box.height * 0.5;
  return { x, y };
};

/**
 * Comprehensive testing for single-thumb slider implementation.
 * Tests basic accessibility, keyboard navigation, and interaction patterns.
 *
 * Slider must have min=0, max=100, step=1 and initial value of 50.
 */
export const singleSliderTesting = async ({ page, slider, rail }: SliderTestingOptions) => {
  await test.step("Basic accessibility and initial state", async () => {
    await expect(slider).toHaveAttribute("role", "slider");
    await expect(slider).toHaveAttribute("aria-valuenow", "50");
    await expect(slider).toHaveAttribute("aria-valuemin", "0");
    await expect(slider).toHaveAttribute("aria-valuemax", "100");
    await expect(slider).toHaveAttribute("aria-orientation", "horizontal");
    await expect(slider).toHaveAttribute("type", "range");
    await expect(slider).toHaveAttribute("step", "1");

    await slider.focus();
    await expect(slider).toBeFocused();
  });

  await test.step("Keyboard navigation - Arrow keys", async () => {
    await slider.press("ArrowRight");
    await expect(slider).toHaveValue("51");

    await slider.press("ArrowLeft");
    await expect(slider).toHaveValue("50");

    await slider.press("ArrowUp");
    await expect(slider).toHaveValue("51");

    await slider.press("ArrowDown");
    await expect(slider).toHaveValue("50");
  });

  await test.step("Keyboard navigation - Home and End keys", async () => {
    await slider.press("End");
    await expect(slider).toHaveValue("100");

    await slider.press("Home");
    await expect(slider).toHaveValue("0");
  });

  await test.step("Keyboard navigation - Page Up/Down keys", async () => {
    await slider.press("PageUp");
    await expect(slider).toHaveValue("1");

    await slider.press("PageDown");
    await expect(slider).toHaveValue("0");
  });

  await test.step("Shift key modifies step size", async () => {
    await slider.press("Shift+ArrowRight");
    await expect(slider).toHaveValue("10");
  });

  await test.step("Mouse interaction - Click to set value", async () => {
    await expect(rail).toBeVisible();
    const { x, y } = await getRailPosition(rail, 0.75);
    await page.mouse.click(x, y);
    await expect(slider).toHaveValue("75");
  });

  await test.step("Mouse drag interaction", async () => {
    // Start drag at 25% position
    const startPosition = await getRailPosition(rail, 0.25);

    // End drag at 75% position
    const endPosition = await getRailPosition(rail, 0.75);

    await page.mouse.move(startPosition.x, startPosition.y);
    await page.mouse.down();
    await expect(slider).toHaveValue("25");

    await page.mouse.move(endPosition.x, endPosition.y);
    await page.mouse.up();
    await expect(slider).toHaveValue("75");
  });

  await test.step("Boundary value constraints", async () => {
    // Test minimum boundary
    await slider.press("Home");
    await expect(slider).toHaveValue("0");

    await slider.press("ArrowLeft"); // Try to go below min
    await expect(slider).toHaveValue("0");

    // Test maximum boundary
    await slider.press("End");
    await expect(slider).toHaveValue("100");

    await slider.press("ArrowRight"); // Try to go above max
    await expect(slider).toHaveValue("100");
  });
};

/**
 * Comprehensive testing for range slider implementation.
 * Tests range-specific behaviors, thumb independence, and collision handling.
 *
 * Slider must have min=0, max=100, step=1 and initial value of [25,75].
 */
export const rangeSliderTesting = async ({ page, slider, rail }: SliderTestingOptions) => {
  const firstThumb = slider.first();
  const lastThumb = slider.last();

  await test.step("Basic accessibility for range slider", async () => {
    await expect(slider).toHaveCount(2);

    for (let i = 0; i < 2; i++) {
      const thumb = slider.nth(i);
      await expect(thumb).toHaveAttribute("role", "slider");
      await expect(thumb).toHaveAttribute("aria-valuenow", i === 0 ? "25" : "75");
      await expect(thumb).toHaveAttribute("aria-valuemin", "0");
      await expect(thumb).toHaveAttribute("aria-valuemax", "100");
      await expect(thumb).toHaveAttribute("step", "1");
    }
  });

  await test.step("Independent thumb navigation", async () => {
    await firstThumb.focus();
    await expect(firstThumb).toBeFocused();

    await firstThumb.press("ArrowRight");
    await expect(firstThumb).toHaveValue("26");

    await firstThumb.press("ArrowLeft");
    await expect(firstThumb).toHaveValue("25");

    await lastThumb.focus();
    await expect(lastThumb).toBeFocused();

    await lastThumb.press("ArrowRight");
    await expect(lastThumb).toHaveValue("76");

    await lastThumb.press("ArrowLeft");
    await expect(lastThumb).toHaveValue("75");
  });

  await test.step("Tab navigation between thumbs", async () => {
    await firstThumb.focus();
    await expect(firstThumb).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(lastThumb).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(firstThumb).toBeFocused();
  });

  await test.step("Click and drag interactions", async () => {
    let position = await getRailPosition(rail, 0.1);

    await page.mouse.click(position.x, position.y);
    await expect(firstThumb).toHaveValue("10");
    await expect(lastThumb).toHaveValue("75");

    position = await getRailPosition(rail, 0.8);
    await page.mouse.click(position.x, position.y);
    await expect(firstThumb).toHaveValue("10");
    await expect(lastThumb).toHaveValue("80");

    position = await getRailPosition(rail, 0.1);
    await page.mouse.move(position.x, position.y);
    await page.mouse.down();

    position = await getRailPosition(rail, 0.5);
    await page.mouse.move(position.x, position.y);
    await expect(firstThumb, "should change value by dragging thumb").toHaveValue("50");
    await expect(lastThumb).toHaveValue("80");

    position = await getRailPosition(rail, 0.9);
    await page.mouse.move(position.x, position.y);
    await expect(firstThumb, "should not exceed last thumb when dragging").toHaveValue("80");
    await expect(lastThumb).toHaveValue("80");
    await page.mouse.up();
  });

  await test.step("Home and End navigation", async () => {
    await firstThumb.press("Home");
    await expect(firstThumb).toHaveValue("0");

    await lastThumb.press("End");
    await expect(lastThumb).toHaveValue("100");
  });
};
