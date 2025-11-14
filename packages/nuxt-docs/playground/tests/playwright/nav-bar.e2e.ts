import { expect, test } from "@nuxt/test-utils/playwright";

test("should show nav bar actions", async ({ page, goto }) => {
  // i18n / language switch is already tested in i18n.e2e.ts

  // ACT
  await goto("/", { waitUntil: "hydration" });

  const colorSchemeSwitch = page.getByRole("button", { name: "Change appearance" });

  // ASSERT
  await expect(colorSchemeSwitch).toBeVisible();

  // ACT
  await colorSchemeSwitch.click();

  // ASSERT
  const dialog = page.getByRole("dialog", { name: "Change appearance" });
  await expect(dialog).toBeVisible();
  await expect(page).toHaveScreenshot("color-scheme-switch.png");

  // ACT
  await dialog.getByText("Dark", { exact: true }).click();
  await dialog.getByRole("button", { name: "Apply" }).click();

  // ASSERT
  await expect(page).toHaveScreenshot("color-scheme-switch-dark.png");
});
