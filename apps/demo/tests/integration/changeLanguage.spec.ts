import { expect, test } from '@playwright/test';

test('should change the language from en to de', async ({ page }) => {
  await page.goto('/');

  const topBar = page.getByTestId('top-bar');
  await expect(topBar).toContainText('Home');

  const languageDropdown = topBar.getByTestId('language-dropdown');
  await expect(languageDropdown).toBeVisible();

  await languageDropdown.click();
  await languageDropdown.locator('scu-link').filter({ hasText: 'Deutsch' }).locator('a').click();

  await expect(topBar).not.toContainText('Home');
  await expect(topBar).toContainText('Startseite');
});
