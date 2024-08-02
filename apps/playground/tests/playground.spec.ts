import { expect, test } from "@playwright/test";

test("should persist onyx version in URL", async ({ page }) => {
  // ARRANGE
  const MOCK_URL = "https://data.jsdelivr.com/v1/package/npm/sit-onyx";

  await page.route(MOCK_URL, (route) => {
    return route.fulfill({
      json: {
        versions: ["1.0.0-mock.1", "1.0.0-mock.2"],
      },
    });
  });

  // ACT
  await page.goto("/");

  // ASSERT
  const onyxVersionSelect = page.getByLabel("onyx version").first();
  await expect(onyxVersionSelect).toHaveValue("1.0.0-mock.1");
  await expect(page).toHaveURL(new RegExp(".*?onyxVersion=1.0.0-mock.1"));

  // ACT
  await onyxVersionSelect.click();
  await page.getByLabel("Select sit-onyx version").getByLabel("1.0.0-mock.2").click();

  // ASSERT
  await expect(onyxVersionSelect).toHaveValue("1.0.0-mock.2");
  await expect(page).toHaveURL(new RegExp(".*?onyxVersion=1.0.0-mock.2"));

  // ACT (should keep onyx version after reload)
  await page.reload();

  // ASSERT
  await expect(onyxVersionSelect).toHaveValue("1.0.0-mock.2");
});
