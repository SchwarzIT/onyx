import { expect, test } from "../../../playwright/a11y";
import { ONYX_BREAKPOINTS } from "../../../types";
import ComponentShowcase from "./ComponentShowcase.vue";

test.beforeEach(async ({ page }) => {
  await page.route("/onyx-logo.svg", (route) => {
    return route.fulfill({
      contentType: "image/svg+xml",
      body: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
  <path d="M19.0332 11.0183C19.0332 19.811 17.3139 22 9.49571 22C1.67756 22 0 19.811 0 11.0183C0 2.18903 1.68278 0 9.50094 0C17.3191 0 19.0385 2.18903 19.0385 11.0183H19.0332ZM4.72957 11.0183C4.72957 16.53 5.31488 17.8936 9.50094 17.8936C13.6818 17.8936 14.2671 16.5248 14.2671 11.0183C14.2671 5.46996 13.6818 4.10116 9.50094 4.10116C5.32011 4.10116 4.72957 5.46996 4.72957 11.0183Z" fill="#00C3CD"/>
  <path d="M18.981 13.3536C19.0176 12.6274 19.0385 11.8594 19.0385 11.0183C19.0385 2.18903 17.3191 0 9.50097 0C9.41735 0 7.84432 -1.2456e-07 6.66846 0.135835C5.84274 1.38447 5.29923 5.54833 4.97522 7.05296C5.04838 6.59843 5.28878 5.93493 5.45601 5.63192C5.82184 4.96319 6.31831 4.6445 6.92453 4.4303C7.94884 4.06459 9.09857 4.10639 9.50097 4.10639C13.6818 4.10639 14.2671 5.47518 14.2671 11.0235" fill="url(#paint0_linear_1722_32851)"/>
  <defs>
    <linearGradient id="paint0_linear_1722_32851" x1="6.6371" y1="0.167181" x2="19.4003" y2="12.9344" gradientUnits="userSpaceOnUse">
      <stop offset="0.14" stop-color="#008CA0"/>
      <stop offset="0.77" stop-color="#00C3CD"/>
    </linearGradient>
  </defs>
</svg>`,
    });
  });
});

for (const [name, width] of Object.entries(ONYX_BREAKPOINTS)) {
  test(`should render (${name} breakpoint)`, async ({ mount, makeAxeBuilder }) => {
    const component = await mount(<ComponentShowcase style={{ width: `${width}px` }} />);

    // ASSERT
    await expect(component).toHaveScreenshot(`default-${name}.png`);

    // ACT
    const accessibilityScanResults = await makeAxeBuilder()
      // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
      .disableRules(["color-contrast"])
      .analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}
