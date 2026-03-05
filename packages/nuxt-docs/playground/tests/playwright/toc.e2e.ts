import { expect, test } from "@nuxt/test-utils/playwright";
import { ONYX_BREAKPOINTS } from "sit-onyx";

test("should render table of contents", async ({ page, goto }) => {
  // ARRANGE
  await goto("/", { waitUntil: "hydration" });

  // disable smooth scrolling to prevent flaky (screenshot) tests
  await page.addStyleTag({
    content: ".onyx-page__main { scroll-behavior: auto; }",
  });

  const sidebar = page.getByLabel("Navigation", { exact: true });
  const sidebarBox = (await sidebar.boundingBox())!;
  const height = 512;
  const width = sidebarBox.width + ONYX_BREAKPOINTS.md;

  await page.setViewportSize({ height, width: width + 1 });
  const toc = page.getByRole("navigation", { name: "Table of contents" });

  // ASSERT
  await expect(toc).toBeVisible();
  await expect(page).toHaveScreenshot("toc.png");

  const tocLink = toc.getByRole("link", { name: "Headline 2" });
  await expect(tocLink).toHaveAttribute("href", "#headline-2");

  // ACT
  await tocLink.click();

  // ASSERT
  await expect(page).toHaveURL("#headline-2");
  await expect(page.getByRole("heading", { name: "Headline 2" })).toBeInViewport();
  await expect(page).toHaveScreenshot("toc-scrolled.png");

  // ACT
  await page.setViewportSize({ height, width });

  // ASSERT
  await expect(toc).toBeHidden();
  await expect(page).toHaveScreenshot("toc-hidden.png");
});
