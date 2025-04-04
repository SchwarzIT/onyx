import { expect, test } from "@nuxt/test-utils/playwright";
import { ONYX_BREAKPOINTS } from "sit-onyx";

test("should render prose components with onyx", async ({ page, goto }) => {
  await page.setViewportSize({ width: ONYX_BREAKPOINTS.md, height: 1024 });

  // ACT
  await goto("/some-not-existing-page", { waitUntil: "hydration" });

  // ASSERT
  await expect(page).toHaveScreenshot("error.png");
  await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();

  // ACT
  await page.evaluate(() => document.body.classList.add("dark"));
  await expect(page).toHaveScreenshot("error-dark.png");
  await page.evaluate(() => document.body.classList.remove("dark"));

  // ACT
  page.getByRole("button", { name: "Technical error details" }).click();
  await page.getByRole("document").hover(); // reset hover
  await expect(page).toHaveScreenshot("error-details.png");

  // ASSERT
  const details = page.getByRole("region", { name: "Technical error details" });
  await expect(details).toContainText(`"url": "/some-not-existing-page"`);
  await expect(details).toContainText(`"statusCode": 404`);
  await expect(details).toContainText(`"message": "Page not found"`);

  // ACT
  page.getByRole("button", { name: "Back to home" }).click();

  // ASSERT
  await expect(page, "should have back button that navigates to home page").toHaveURL("/");
});
