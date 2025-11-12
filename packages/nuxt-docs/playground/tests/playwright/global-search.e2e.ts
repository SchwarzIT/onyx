import { expect, test } from "@nuxt/test-utils/playwright";

test("should show global search", async ({ page, goto }) => {
  // i18n / language switch is already tested in i18n.e2e.ts

  // ACT
  await goto("/", { waitUntil: "hydration" });

  const globalSearch = page.getByRole("button", { name: "Global search" });

  // ASSERT
  await expect(globalSearch).toBeVisible();

  // ACT
  await globalSearch.click();

  // ASSERT
  const dialog = page.getByRole("dialog", { name: "Global search" });
  await expect(dialog).toBeVisible();
  await expect(page).toHaveScreenshot("global-search.png");

  // ACT
  const input = dialog.getByLabel("Search for content");
  await input.fill("Headline");

  // ASSERT
  await expect(page).toHaveScreenshot("global-search-filled.png");

  // ACT
  await input.fill("Change");

  // ASSERT
  await expect(page).toHaveScreenshot("global-search-system-options.png");

  // ACT
  const languageOption = dialog.getByRole("option", { name: "Change language" });
  await languageOption.click();

  // ASSERT
  const languageDialog = page.getByRole("dialog", { name: "Change language" });
  await expect(languageDialog).toBeVisible();

  // ACT
  await languageDialog.getByRole("button", { name: "Cancel" }).click();

  const colorSchemeOption = dialog.getByRole("option", { name: "Change appearance" });
  await colorSchemeOption.click();

  // ASSERT
  const colorSchemeDialog = page.getByRole("dialog", { name: "Change appearance" });
  await expect(colorSchemeDialog).toBeVisible();

  // ACT
  await colorSchemeDialog.getByRole("button", { name: "Cancel" }).click();
});
