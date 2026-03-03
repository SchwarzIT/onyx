import { expect, test } from "@nuxt/test-utils/playwright";
import { ONYX_BREAKPOINTS, OnyxBreakpoint } from "sit-onyx";

test("should show landing page", async ({ page, goto }) => {
  test.slow();

  // ACT
  await goto("/", { waitUntil: "hydration" });

  for (const breakpoint in ONYX_BREAKPOINTS) {
    await page.setViewportSize({
      height: 1080,
      width: ONYX_BREAKPOINTS[breakpoint as OnyxBreakpoint],
    });

    // ASSERT
    await expect(page).toHaveScreenshot(`landing-page-${breakpoint}.png`);
  }
});
