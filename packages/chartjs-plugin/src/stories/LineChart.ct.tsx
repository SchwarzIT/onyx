import { expect, test } from "@playwright/experimental-ct-vue";
import type { Page } from "@playwright/test";
import LineChart from "./LineChart.vue";

const switchTheme = async (page: Page, theme: string) => {
  await page.evaluate((theme) => document.documentElement.classList.add(theme), theme);
};

test(`should render in light and dark theme`, async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(LineChart);

  // hover so that the tooltip is shown for the screenshot
  await component.hover();

  // ASSERT
  await expect(component).toHaveScreenshot("default-light.png");

  // ACT
  await switchTheme(page, "dark");

  // ASSERT
  await expect(component).toHaveScreenshot("default-dark.png");
});

test(`should render with custom color`, async ({ mount }) => {
  // ARRANGE
  const component = await mount(LineChart, { props: { color: "info" } });

  // ASSERT
  await expect(component).toHaveScreenshot("custom-color.png");
});
