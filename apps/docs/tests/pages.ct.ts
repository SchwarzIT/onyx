import { expect, test } from "@playwright/test";
import { join } from "node:path";
import type { DefaultTheme } from "../node_modules/vitepress/types/default-theme";
import { CONFIG } from "../src/.vitepress/config";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/onyx/);
});

const BLACKLIST_PATHS = [/changelog/i, /icons/i, /flags/i, /about/i];

/**
 * maps links listed in the vitepress config to their respective absolute url
 */
const mapToLinks = (
  navItem: DefaultTheme.NavItem | DefaultTheme.SidebarItem | DefaultTheme.SidebarMulti[string],
  baseParm?: string,
): string[] => {
  const base = baseParm ?? (navItem as DefaultTheme.SidebarItem).base ?? "";
  const links: string[] = [];
  if ("link" in navItem && navItem.link && navItem.link.startsWith("/")) {
    links.push(`${base}${navItem.link}`);
  }
  if ("items" in navItem && Array.isArray(navItem.items)) {
    navItem.items.forEach((item) =>
      links.push(...mapToLinks(item, "base" in navItem ? navItem.base : base)),
    );
  }
  return links;
};

const navItems = CONFIG.themeConfig.nav;
const sidebarItems = Object.values(CONFIG.themeConfig.sidebar).flat(1);

const items = [...navItems, ...sidebarItems].map((item) => mapToLinks(item)).flat(1);
const uniqueItems = new Set(items);
const pathsToTest = Array.from(uniqueItems).filter(
  (p) => !BLACKLIST_PATHS.some((bl) => p.match(bl)),
);

pathsToTest.forEach((path) => {
  test(`screenshot content of ${path}`, async ({ page }) => {
    const name = path
      .replace(/^\//, "")
      .replace(/\.html$/, "")
      .replace(/[_/ ]/g, "_");
    await page.goto(path);
    const main = page.getByRole("main");

    await expect(main, `should capture screenshot of ${path}`).toHaveScreenshot(`${name}.png`, {
      stylePath: join(import.meta.dirname, "hide-non-main.css"),
    });
  });
});
