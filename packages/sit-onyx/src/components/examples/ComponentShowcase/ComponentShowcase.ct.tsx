import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import path from "path";
import { expect, test } from "../../../playwright/a11y.js";
import { MOCK_PLAYWRIGHT_LOGO } from "../../../playwright/screenshots.js";
import ComponentShowcase from "./ComponentShowcase.vue";

test.beforeEach(async ({ page }) => {
  await page.route("https://www.github.com/*.png", (route) =>
    route.fulfill({
      contentType: "image/png",
      path: path.join(import.meta.dirname, "sherlock.png"),
    }),
  );
  await page.route("/onyx-logo.svg", (route) =>
    route.fulfill({ contentType: "image/svg+xml", body: MOCK_PLAYWRIGHT_LOGO }),
  );
});

for (const [name, width] of Object.entries(ONYX_BREAKPOINTS)) {
  test(`should render (${name} breakpoint)`, async ({ mount, makeAxeBuilder }) => {
    const component = await mount(<ComponentShowcase style={{ width: `${width}px` }} />);

    // ASSERT
    await expect(component).toHaveScreenshot(`default-${name}.png`);

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}
