import { expect, test } from "@playwright/test";
import { PKG_METADATA_URL } from "../src/composables/versions.js";

test("should persist onyx version in URL", async ({ page }) => {
  // ARRANGE
  const MOCK_URL = PKG_METADATA_URL("sit-onyx");

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
  await expect(onyxVersionSelect).toHaveAttribute("placeholder", "1.0.0-mock.1");
  await expect(page).toHaveURL(new RegExp(".*?onyxVersion=1.0.0-mock.1"));

  // ACT
  await onyxVersionSelect.click();
  await page.getByLabel("Select sit-onyx version").getByLabel("1.0.0-mock.2").click();

  // ASSERT
  await expect(onyxVersionSelect).toHaveValue("1.0.0-mock.2");
  await expect(page).toHaveURL(new RegExp(".*?onyxVersion=1.0.0-mock.2"));

  // ASSERT
  await expect(onyxVersionSelect).toHaveValue("1.0.0-mock.2");
});
