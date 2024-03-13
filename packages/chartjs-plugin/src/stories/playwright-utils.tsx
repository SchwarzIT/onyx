import { expect, type MountResult } from "@playwright/experimental-ct-vue";
import type { Page } from "@playwright/test";

export const switchTheme = (page: Page, theme: string) =>
  page.evaluate((theme) => document.documentElement.classList.add(theme), theme);

export const executeChartScreenshotTest = async (
  page: Page,
  component: MountResult<unknown>,
  screenshotName: string,
) => {
  // hover so that the tooltip is shown for the screenshot
  await component.hover();

  // ASSERT
  await expect(component).toHaveScreenshot(`${screenshotName}-light.png`);

  // ACT
  await switchTheme(page, "dark");

  // ASSERT
  await expect(component).toHaveScreenshot(`${screenshotName}-dark.png`);
};
