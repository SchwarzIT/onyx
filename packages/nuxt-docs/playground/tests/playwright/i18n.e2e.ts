import { expect, test } from "@nuxt/test-utils/playwright";

test("should show language select in nav bar", async ({ page, goto }) => {
  // ACT
  await goto("/foo", { waitUntil: "hydration" });

  const languageSwitch = page.getByRole("button", { name: "EN" });
  const fooMenuItem = page.getByRole("menuitem", { name: "Foo" });

  // ASSERT
  await expect(languageSwitch).toBeVisible();
  await expect(fooMenuItem).toHaveAttribute("href", "/foo");

  // ACT
  await languageSwitch.click();

  // ASSERT
  const dialog = page.getByRole("dialog", { name: "Change language" });

  // ACT
  await dialog.getByText("Deutsch").click();
  await dialog.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  await expect(page).toHaveURL(/\/de\/foo/);
  await expect(languageSwitch).toBeHidden();
  await expect(page.getByRole("button", { name: "DE" })).toBeVisible();
  await expect(fooMenuItem, "should localize nav item links").toHaveAttribute("href", "/de/foo");
});
