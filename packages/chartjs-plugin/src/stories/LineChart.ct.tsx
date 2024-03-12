import { expect, test } from "@playwright/experimental-ct-vue";
import type { Page } from "@playwright/test";
import LineChart from "./LineChart.vue";

const THEMES = ["light", "dark"] as const;

const switchTheme = async (page: Page, theme: string) => {
  await page.evaluate((theme) => document.documentElement.classList.add(theme), theme);
};

THEMES.forEach((theme) => {
  test(`should render in ${theme} theme`, async ({ mount, page }) => {
    // ARRANGE
    const component = await mount(LineChart);

    // ACT
    await switchTheme(page, theme);

    // hover so that the tooltip is shown for the screenshot
    await component.hover();

    // ASSERT
    await expect(component).toHaveScreenshot(`default-${theme}.png`);
  });
});

THEMES.forEach((theme) => {
  test(`should render with custom color (${theme})`, async ({ mount, page }) => {
    // ARRANGE
    const component = await mount(LineChart, { props: { color: "info" } });

    // ACT
    await switchTheme(page, theme);

    // ASSERT
    await expect(component).toHaveScreenshot(`default-${theme}.png`);
  });
});
