import { expect, test } from "@nuxt/test-utils/playwright";
import { ONYX_BREAKPOINTS } from "sit-onyx";

test("should render table of contents", async ({ page, goto }) => {
  // ARRANGE
  await goto("/", { waitUntil: "hydration" });

  const sidebar = page.getByLabel("Navigation", { exact: true });
  const sidebarBox = (await sidebar.boundingBox())!;
  const height = 512;
  const width = sidebarBox.width + ONYX_BREAKPOINTS.md;

  await page.setViewportSize({ height, width: width + 1 });
  const toc = page.getByRole("navigation", { name: "Table of contents" });

  // ASSERT
  await expect(toc).toBeVisible();
  await expect(page).toHaveScreenshot("toc.png");

  const orderedListLink = toc.getByRole("link", { name: "Ordered list", exact: true });
  await expect(orderedListLink).toHaveAttribute("href", "#ordered-list");

  // ACT
  await orderedListLink.click();

  // ASSERT
  await expect(page).toHaveURL("#ordered-list");
  await expect(page.getByRole("heading", { name: "Ordered list", exact: true })).toBeInViewport();
  await expect(page).toHaveScreenshot("toc-scrolled.png");

  // ACT
  await page.setViewportSize({ height, width });

  // ASSERT
  await expect(toc).toBeHidden();
  await expect(page).toHaveScreenshot("toc-hidden.png");
});
