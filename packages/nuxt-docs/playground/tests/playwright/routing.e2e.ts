import { expect, test } from "@nuxt/test-utils/playwright";

test("should update page content when navigating", async ({ page, goto }) => {
  // ACT
  await goto("/", { waitUntil: "hydration" });

  // ASSERT
  await expect(page.getByRole("heading", { level: 1, name: "Home" })).toBeVisible();

  // ACT
  await page.getByRole("menuitem", { name: "Foo" }).click();

  // ASSERT
  await expect(page).toHaveURL(/\/foo/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Foo" }),
    "should show new page content when navigating",
  ).toBeVisible();

  // ACT
  await page.getByRole("menuitem", { name: "Does not exist" }).click();

  // ASSERT
  await expect(page).toHaveURL(/\/does-not-exist/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
    "should show error page when dynamically navigating to a non-existing page",
  ).toBeVisible();
});

test("should correctly show custom sidebar roots", async ({ page, goto }) => {
  const backButton = page.getByRole("link", { name: "Back" });

  // ACT
  await goto("/", { waitUntil: "hydration" });

  // ASSERT
  await expect(backButton, "should hide back button in first layer").toBeHidden();
  await expect(page.getByRole("link", { name: "Deeply nested 2" })).toBeHidden();

  // ACT
  await page.getByRole("link", { name: "Deeply nested", exact: true }).click();

  // ASSERT
  await expect(page).toHaveScreenshot("deeply-nested.png");
  await expect(page.getByRole("link", { name: "Deeply nested 2" })).toBeVisible();
  await expect(page).toHaveURL(/\/nested\/deeply-nested/);
  await expect(backButton, "should show back button in nested root").toBeVisible();

  // ACT
  await backButton.click();
  await expect(page).toHaveURL(/\/$/);

  // ASSERT
  await expect(backButton).toBeHidden();
});
