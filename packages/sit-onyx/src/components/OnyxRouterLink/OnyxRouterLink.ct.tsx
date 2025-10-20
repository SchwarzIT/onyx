import { expect, test } from "../../playwright/a11y.js";
import TestWrapper from "./TestWrapper.ct.vue";

// we do not want to actually make requests to live external applications so we mock them here
const EXTERNAL_HREF = "https://example.com";
test.beforeEach(async ({ page }) => {
  await page.route(EXTERNAL_HREF, (route) => route.fulfill({ body: "Test page" }));
});

test("should open external link without router", async ({ page, mount }) => {
  // ARRANGE
  const component = await mount(<TestWrapper href={EXTERNAL_HREF}>Test link</TestWrapper>);

  // ACT
  await component.click();

  // ASSERT
  await expect(page).toHaveURL(EXTERNAL_HREF);
});

test("should open external link without router in new tab", async ({ page, mount }) => {
  // ARRANGE
  const component = await mount(
    <TestWrapper href={EXTERNAL_HREF} target="_blank">
      Test link
    </TestWrapper>,
  );

  const newTabPromise = page.waitForEvent("popup");

  // ACT
  await component.click();

  const newTab = await newTabPromise;
  await newTab.waitForLoadState();

  // ASSERT
  await expect(page).toHaveURL("/");
  await expect(newTab).toHaveURL(EXTERNAL_HREF);
});

test("should open internal link with router", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<TestWrapper href="/test-page">Test link</TestWrapper>);

  // ACT
  await component.click();

  // ASSERT
  await expect(component).toContainText(`Used internal router for "/test-page"`);
});

test("should open internal link in new tab without router", async ({ page, mount, context }) => {
  // ARRANGE
  const component = await mount(
    <TestWrapper href="/test-page" target="_blank">
      Test link
    </TestWrapper>,
  );

  await context.route("**/test-page", (route) => route.fulfill({ body: "Test page" }));
  const newTabPromise = page.waitForEvent("popup");

  // ACT
  await component.click();

  const newTab = await newTabPromise;
  await newTab.waitForLoadState();

  // ASSERT
  await expect(page).toHaveURL("/");
  await expect(component).not.toContainText("Used internal router");
  await expect(newTab).toHaveURL(/^http:\/\/localhost:\d*\/test-page$/);
});

test("should open internal anchor link without router", async ({ page, mount }) => {
  // ARRANGE
  const component = await mount(<TestWrapper href="#test-section">Test link</TestWrapper>);

  // ACT
  await component.click();

  // ASSERT
  await expect(component).not.toContainText("Used internal router");
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#test-section$/);
});

for (const modifier of ["Alt", "ControlOrMeta", "Shift"] as const) {
  test(`should not open internal link if clicked with modifier "${modifier}""`, async ({
    page,
    mount,
    browserName,
  }) => {
    // eslint-disable-next-line playwright/no-skipped-test -- Alt does not work in safari
    test.skip(browserName === "webkit" && modifier === "Alt", "Alt does not work in safari");

    // ARRANGE
    const component = await mount(<TestWrapper href="/test-page">Test link</TestWrapper>);

    // ACT
    await component.click({ modifiers: [modifier] });

    // ASSERT
    await expect(page).toHaveURL("/");
    await expect(component).not.toContainText("Used internal router");
  });
}

test("should pass accessibility tests", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <TestWrapper href={EXTERNAL_HREF} target="_blank">
      Test link
    </TestWrapper>,
  );

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
  await expect(component).toHaveRole("link");
  await expect(component).toHaveAccessibleName("Test link (opens in a new tab)");
});

test("should add rel attribute if target is _blank", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <TestWrapper href={EXTERNAL_HREF} target="_blank">
      Test link
    </TestWrapper>,
  );

  // ASSERT
  await expect(component).toHaveAttribute("rel", "noreferrer");
});
