import { expect, test } from "@playwright/experimental-ct-vue";
import type { Locator, Page } from "@playwright/test";

export type SliderTestingOptions = {
  /**
   * Playwright page.
   */
  page: Page;
  /**
   * Locator for the slider element(s).
   */
  slider: Locator;
  /**
   * Optional: Locator for the slider container/root.
   */
  container?: Locator;
  /**
   * Expected initial value(s) for the slider.
   */
  initialValues?: number[];
  /**
   * Expected min value.
   */
  min?: number;
  /**
   * Expected max value.
   */
  max?: number;
  /**
   * Expected step value.
   */
  step?: number;
  /**
   * Expected shift step value.
   */
  shiftStep?: number;
};

/**
 * Comprehensive testing for single-thumb slider implementation.
 * Tests basic accessibility, keyboard navigation, and interaction patterns.
 */
export const singleThumbSliderTesting = async ({
  page,
  slider,
  container,
  initialValues = [25],
  min = 0,
  max = 100,
  step = 1,
  shiftStep = 10,
}: SliderTestingOptions) => {
  await test.step("Basic accessibility and initial state", async () => {
    await expect(slider).toBeHidden();
    await expect(slider).toHaveAttribute("role", "slider");
    await expect(slider).toHaveAttribute("aria-valuenow", String(initialValues[0]));
    await expect(slider).toHaveAttribute("aria-valuemin", String(min));
    await expect(slider).toHaveAttribute("aria-valuemax", String(max));
    await expect(slider).toHaveAttribute("aria-orientation", "horizontal");
    await expect(slider).toHaveAttribute("type", "range");
    if (step !== null) {
      await expect(slider).toHaveAttribute("step", String(step));
    }
  });

  await test.step("Keyboard navigation - Arrow keys", async () => {
    await slider.focus();
    await expect(slider).toBeFocused();

    const initialValue = initialValues[0]!;

    await slider.press("ArrowRight");
    await expect(slider).toHaveValue(String(Math.min(initialValue + step, max)));

    await slider.press("ArrowLeft");
    await expect(slider).toHaveValue(String(initialValue));

    await slider.press("ArrowUp");
    await expect(slider).toHaveValue(String(Math.min(initialValue + step, max)));

    await slider.press("ArrowDown");
    await expect(slider).toHaveValue(String(initialValue));
  });

  await test.step("Keyboard navigation - Home and End keys", async () => {
    await slider.focus();

    await slider.press("Home");
    await expect(slider).toHaveValue(String(min));

    await slider.press("End");
    await expect(slider).toHaveValue(String(max));
  });

  await test.step("Keyboard navigation - Page Up/Down keys", async () => {
    await slider.focus();

    await slider.press("Home");

    await slider.press("PageUp");
    const pageUpValue = parseInt(await slider.inputValue());
    expect(pageUpValue).toBeGreaterThan(min);

    await slider.press("PageDown");
    await expect(slider).toHaveValue(String(min));
  });

  await test.step("Shift key modifies step size", async () => {
    await slider.focus();
    await slider.press("Home");

    await slider.press("Shift+ArrowRight");
    await expect(slider).toHaveValue(String(Math.min(min + shiftStep, max)));
  });

  if (container) {
    await test.step("Mouse interaction - Click to set value", async () => {
      const containerBox = await container.boundingBox();
      if (containerBox) {
        // Click at 75% position (should be around 75% of max value)
        const clickX = containerBox.x + containerBox.width * 0.75;
        const clickY = containerBox.y + containerBox.height * 0.5;

        await page.mouse.click(clickX, clickY);

        const clickedValue = parseInt(await slider.inputValue());
        // Should be approximately 75% of the range
        const expectedValue = min + (max - min) * 0.75;
        expect(Math.abs(clickedValue - expectedValue)).toBeLessThanOrEqual(step * 2);
      }
    });

    await test.step("Mouse drag interaction", async () => {
      const containerBox = await container.boundingBox();
      if (containerBox) {
        // Start drag at 25% position
        const startX = containerBox.x + containerBox.width * 0.25;
        const startY = containerBox.y + containerBox.height * 0.5;

        // End drag at 75% position
        const endX = containerBox.x + containerBox.width * 0.75;
        const endY = containerBox.y + containerBox.height * 0.5;

        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(endX, endY);
        await page.mouse.up();

        const draggedValue = parseInt(await slider.inputValue());
        const expectedValue = min + (max - min) * 0.75;
        expect(Math.abs(draggedValue - expectedValue)).toBeLessThanOrEqual(step * 2);
      }
    });
  }

  await test.step("Boundary value constraints", async () => {
    await slider.focus();

    // Test minimum boundary
    await slider.press("Home");
    await slider.press("ArrowLeft"); // Try to go below min
    await expect(slider).toHaveValue(String(min));

    // Test maximum boundary
    await slider.press("End");
    await slider.press("ArrowRight"); // Try to go above max
    await expect(slider).toHaveValue(String(max));
  });
};

/**
 * Comprehensive testing for multi-thumb (range) slider implementation.
 * Tests range-specific behaviors, thumb independence, and collision handling.
 */
export const multiThumbSliderTesting = async ({
  page,
  slider,
  container,
  initialValues = [25, 75],
  min = 0,
  max = 100,
  step = 1,
}: SliderTestingOptions) => {
  await test.step("Basic accessibility for range slider", async () => {
    await expect(slider).toHaveCount(initialValues.length);

    for (let i = 0; i < initialValues.length; i++) {
      const thumb = slider.nth(i);
      await expect(thumb).toBeHidden();
      await expect(thumb).toHaveAttribute("role", "slider");
      await expect(thumb).toHaveAttribute("aria-valuenow", String(initialValues[i]));
      await expect(thumb).toHaveAttribute("aria-valuemin", String(min));
      await expect(thumb).toHaveAttribute("aria-valuemax", String(max));
      await expect(thumb).toHaveAttribute("data-index", String(i));
    }
  });

  await test.step("Independent thumb navigation", async () => {
    const firstThumb = slider.first();
    const lastThumb = slider.last();

    await firstThumb.focus();
    await expect(firstThumb).toBeFocused();

    const initialFirstValue = parseInt(await firstThumb.inputValue());
    await firstThumb.press("ArrowRight");
    await expect(firstThumb).toHaveAttribute(
      "aria-valuenow",
      String(Math.min(initialFirstValue + step, max)),
    );

    await lastThumb.focus();
    await expect(lastThumb).toBeFocused();

    const initialLastValue = parseInt(await lastThumb.inputValue());
    await lastThumb.press("ArrowLeft");
    await expect(lastThumb).toHaveAttribute(
      "aria-valuenow",
      String(Math.max(initialLastValue - step, min)),
    );
  });

  await test.step("Thumb collision and ordering", async () => {
    const firstThumb = slider.first();
    const lastThumb = slider.last();

    await firstThumb.focus();
    await firstThumb.press("End"); // Move first thumb to max

    // Values should maintain order (first <= last)
    const firstValue = parseInt(await firstThumb.inputValue());
    const lastValue = parseInt(await lastThumb.inputValue());
    expect(firstValue).toBeLessThanOrEqual(lastValue);
  });

  await test.step("Tab navigation between thumbs", async () => {
    const firstThumb = slider.first();
    const lastThumb = slider.last();

    await firstThumb.focus();
    await expect(firstThumb).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(lastThumb).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(firstThumb).toBeFocused();
  });

  if (container) {
    await test.step("Click interaction selects closest thumb", async () => {
      const containerBox = await container.boundingBox();
      if (containerBox) {
        const testCases = [
          { clickPercent: 0.0, expectedValue: min },
          { clickPercent: 0.1, expectedValue: 10 },
          { clickPercent: 0.25, expectedValue: 25 },
          { clickPercent: 0.5, expectedValue: 50 },
        ];

        for (const { clickPercent, expectedValue } of testCases) {
          const clickX = containerBox.x + containerBox.width * clickPercent;
          const clickY = containerBox.y + containerBox.height * 0.5;

          await page.mouse.click(clickX, clickY);

          const actualValue = parseInt(await slider.first().inputValue());
          expect(actualValue).toBe(expectedValue);
        }
      }
    });

    await test.step("Drag interaction maintains thumb identity", async () => {
      const firstThumb = slider.first();
      const lastThumb = slider.last();
      const containerBox = await container.boundingBox();

      if (containerBox) {
        // Test case 1: Drag first thumb to a safe position (60%)
        await test.step("Drag to safe position", async () => {
          const targetValue = 60;
          const targetPercent = (targetValue - min) / (max - min);
          const targetX = containerBox.x + containerBox.width * targetPercent;
          const targetY = containerBox.y + containerBox.height * 0.5;

          await page.mouse.click(targetX, targetY);
          await expect(firstThumb).toHaveValue(String(targetValue));
        });

        // Test case 2: Try to drag first thumb past the second thumb
        await test.step("Collision handling", async () => {
          const initialLastValue = parseInt(await lastThumb.inputValue()); // e.g., 75

          // Try to drag first thumb to 95% (past the second thumb)
          const beyondTargetX = containerBox.x + containerBox.width * 0.95;
          const beyondTargetY = containerBox.y + containerBox.height * 0.5;

          const currentFirstPercent = (60 - min) / (max - min);
          const currentFirstX = containerBox.x + containerBox.width * currentFirstPercent;
          const currentFirstY = containerBox.y + containerBox.height * 0.5;

          await page.mouse.move(currentFirstX, currentFirstY);
          await page.mouse.down();
          await page.mouse.move(beyondTargetX, beyondTargetY);
          await page.mouse.up();

          // First thumb should be constrained to not exceed second thumb
          const finalFirstValue = parseInt(await firstThumb.inputValue());
          const finalLastValue = parseInt(await lastThumb.inputValue());

          expect(finalFirstValue).toBeLessThanOrEqual(initialLastValue);
          expect(finalLastValue).toBe(initialLastValue); // Second thumb shouldn't move
        });
      }
    });
  }

  await test.step("Range constraints and validation", async () => {
    const firstThumb = slider.first();
    const lastThumb = slider.last();

    // Ensure thumbs maintain proper ordering
    await firstThumb.focus();
    await firstThumb.press("Home");
    await lastThumb.focus();
    await lastThumb.press("End");

    const minValue = parseInt(await firstThumb.inputValue());
    const maxValue = parseInt(await lastThumb.inputValue());

    expect(minValue).toBeLessThanOrEqual(maxValue);
    expect(minValue).toBeGreaterThanOrEqual(min);
    expect(maxValue).toBeLessThanOrEqual(max);
  });
};

/**
 * Test slider with marks (discrete mode).
 */
export const discreteSliderTesting = async ({ slider }: SliderTestingOptions) => {
  await test.step("Discrete mode with marks", async () => {
    await slider.focus();

    await slider.press("ArrowRight");

    // Value should be one of the predefined mark values (0, 25, 50, 75, 100)
    expect(slider).toHaveAttribute("aria-valuenow", String("75"));
  });

  await test.step("Keyboard navigation snaps to marks", async () => {
    await slider.focus();
    await slider.press("Home");
    await expect(slider).toHaveValue("0");

    await slider.press("End");
    await expect(slider).toHaveValue("100");
  });
};
