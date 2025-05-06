import { expect, test } from "../../playwright/a11y";
import OnyxAppLayout from "./OnyxAppLayout.vue";

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: `body {
      margin: 0;
      background: lightgrey;
    }`,
  });
});

test("should render with nav", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxAppLayout>
      <template v-slot:navBar>
        <header style={{ height: "4rem", background: "peachpuff" }}></header>
      </template>
    </OnyxAppLayout>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render with left nav", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxAppLayout navBarAlignment="left">
      <template v-slot:navBar>
        <aside style={{ height: "100%", width: "4rem", background: "peachpuff" }}></aside>
      </template>
    </OnyxAppLayout>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("nav-left.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
