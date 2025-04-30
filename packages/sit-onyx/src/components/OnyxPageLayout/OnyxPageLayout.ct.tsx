import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { expect, test } from "../../playwright/a11y";
import OnyxPageLayout from "./OnyxPageLayout.vue";

const SIDEBAR_ELEMENT = (
  <aside style={{ width: "10rem", height: "100%", background: "peachpuff" }}></aside>
);
const FOOTER_ELEMENT = <footer style={{ height: "4rem", background: "olivedrab" }}></footer>;

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: `body {
      margin: 0;
      font-family: var(--onyx-font-family);
      color: var(--onyx-color-text-icons-neutral-intense);
     }

     .onyx-page {
        height: 100vh;
        width: 100vw;
     }
     `,
  });
});

test("should render with content only", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxPageLayout>Page content</OnyxPageLayout>);

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render with content and no padding", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxPageLayout noPadding>Page content</OnyxPageLayout>);

  // ASSERT
  await expect(component).toHaveScreenshot("no-padding.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render with sidebar", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxPageLayout>
      Page content
      <template v-slot:sidebar>{SIDEBAR_ELEMENT}</template>
    </OnyxPageLayout>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("sidebar.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render with footer", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxPageLayout>
      Page content
      <template v-slot:footer>{FOOTER_ELEMENT}</template>
    </OnyxPageLayout>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("footer.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render with footer and sidebar", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxPageLayout>
      Page content
      <template v-slot:sidebar>{SIDEBAR_ELEMENT}</template>
      <template v-slot:footer>{FOOTER_ELEMENT}</template>
    </OnyxPageLayout>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("footer-and-sidebar.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render with footer aside sidebar", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxPageLayout footerAlignment="page">
      Page content
      <template v-slot:sidebar>{SIDEBAR_ELEMENT}</template>
      <template v-slot:footer>{FOOTER_ELEMENT}</template>
    </OnyxPageLayout>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("footer-aside-sidebar.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should not have inline margin for onyx grid container when sidebar exists", async ({
  page,
  mount,
}) => {
  await page.setViewportSize({ height: 512, width: ONYX_BREAKPOINTS.xl });

  // ARRANGE
  const component = await mount(
    <OnyxPageLayout class="onyx-grid-max-md onyx-grid-center" footerAlignment="page">
      Page content
      <template v-slot:sidebar>{SIDEBAR_ELEMENT}</template>
      <template v-slot:footer>
        <footer style={{ height: "4rem", background: "olivedrab" }}>
          <div class="onyx-grid-container">Footer</div>
        </footer>
      </template>
    </OnyxPageLayout>,
  );

  // ASSERT
  const pageMarginInline = await component
    .locator(".onyx-page__main > .onyx-grid-container")
    .evaluate((element) => getComputedStyle(element).marginInline);

  const footerMarginInline = await component
    .locator("footer > .onyx-grid-container")
    .evaluate((element) => getComputedStyle(element).marginInline);

  expect(pageMarginInline).toBe("0px");
  expect(footerMarginInline).toBe("0px");
});
