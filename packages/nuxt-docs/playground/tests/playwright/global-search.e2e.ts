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

  await expect(dialog.getByRole("option", { name: "Unordered list" })).toHaveAttribute(
    "href",
    "/#unordered-list",
  );

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
  await input.clear();
  const colorSchemeOption = dialog.getByRole("option", { name: "Change appearance" });
  await colorSchemeOption.click();

  // ASSERT
  const colorSchemeDialog = page.getByRole("dialog", { name: "Change appearance" });
  await expect(colorSchemeDialog).toBeVisible();

  // ACT
  await colorSchemeDialog.getByRole("button", { name: "Cancel" }).click();

  const languageOption = dialog.getByRole("option", { name: "Change language" });
  await languageOption.click();

  // ASSERT
  const languageDialog = page.getByRole("dialog", { name: "Change language" });
  await expect(languageDialog).toBeVisible();

  // ACT
  await languageDialog.getByText("Deutsch").click();
  await languageDialog.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  await expect(
    page.getByRole("option", { name: "Ungeordnete Liste" }),
    "should use locale path for links",
  ).toHaveAttribute("href", "/de#ungeordnete-liste");
});
