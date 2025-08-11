import { expect, test } from "@nuxt/test-utils/playwright";

test("should update page content when navigating", async ({ page, goto }) => {
  // ACT
  await goto("/", { waitUntil: "hydration" });

  // ASSERT
  await expect(page.getByRole("heading", { level: 1, name: "H1" })).toBeVisible();

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
