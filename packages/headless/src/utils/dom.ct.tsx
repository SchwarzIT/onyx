import { expect, test } from "@playwright/experimental-ct-vue";
import FocusVisibleTest from "./FocusVisibleTest.vue";
import TouchEventTest from "./TouchEventTest.vue";

test("isFocusVisible should detect keyboard focus", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(<FocusVisibleTest />);
  const button = component.getByRole("button");

  // ASSERT - Initially not focused
  await expect(button).toContainText("Is focused: false");

  // ACT - Focus using keyboard (Tab key)
  await page.keyboard.press("Tab");

  // ASSERT - Should detect keyboard focus as focus-visible
  await expect(button).toContainText("Is focused: true");
  await expect(button).toBeFocused();

  // ACT - Remove focus
  await page.keyboard.press("Tab");

  // ASSERT - Should no longer be focused
  await expect(button).toContainText("Is focused: false");
});

test("isFocusVisible should not detect mouse focus", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<FocusVisibleTest />);
  const button = component.getByRole("button");

  // ASSERT - Initially not focused
  await expect(button).toContainText("Is focused: false");

  // ACT - Focus using mouse click
  await button.click();

  // ASSERT - In modern browsers with :focus-visible support, mouse focus should not trigger focus-visible
  await expect(button).toBeFocused();

  // ASSERT - Should not be focused
  await expect(button).toContainText("Is focused: false");
});

test.describe("touch-only", () => {
  // ARRANGE: enable touch emulation only for tests in this block
  test.use({ hasTouch: true, viewport: { width: 390, height: 844 } });

  test("isTouchEvent should detect touch events", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<TouchEventTest />);
    const button = component.getByRole("button");

    // ASSERT
    await expect(button).toContainText("Last event: none, Is touch: false");

    // ACT: trigger a regular mouse click
    await button.click();

    // ASSERT: click must not be detected as touch
    await expect(button).toContainText("Last event: click, Is touch: false");

    // ACT: perform a tap
    await button.tap();

    // ASSERT (final): last event should be a touch event; allow either start or end
    await expect(button).toContainText(/Last event: (touchstart|touchend), Is touch: true/);
  });
});

test("isTouchEvent should handle pointer events", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(<TouchEventTest />);
  const button = component.getByRole("button");

  // ASSERT - Initially no event
  await expect(button).toContainText("Last event: none, Is touch: false");

  // ACT - Simulate pointer event with mouse
  await page.mouse.move(0, 0);
  await button.hover();
  await page.mouse.down();
  await page.mouse.up();

  // ASSERT - Mouse pointer events should not be detected as touch events
  // (The exact event type may vary, but it should not be a touch event)
  const buttonText = await button.textContent();
  expect(buttonText).toContain("Is touch: false");
});
