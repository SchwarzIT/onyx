import { expect, test } from "@playwright/test";
import { DefaultTheme } from "../node_modules/vitepress/types/default-theme";
import { CONFIG } from "../src/.vitepress/config";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/onyx/);
});

/**
 * maps links listed in the vitepress config to their respective absolute url
 */
const mapToLinks = (
  navItem: DefaultTheme.NavItem | DefaultTheme.SidebarItem,
  baseParm?: string,
): string[] => {
  const base = baseParm ?? (navItem as DefaultTheme.SidebarItem).base ?? "";
  const links: string[] = [];
  if ("link" in navItem && navItem.link && navItem.link.startsWith("/")) {
    links.push(`${base}${navItem.link}`);
  }
  if ("items" in navItem && navItem.items) {
    navItem.items.forEach((item) => links.push(...mapToLinks(item, navItem["base"])));
  }
  return links;
};

const navItems = CONFIG.themeConfig.nav;
const sidebarItems = Object.values(CONFIG.themeConfig.sidebar).flat(1);

const items = [...navItems, ...sidebarItems].map((item) => mapToLinks(item)).flat(1);
const uniqueItems = new Set(items);

Array.from(uniqueItems).forEach((path) => {
  test(`screenshot content of ${path}`, async ({ page }) => {
    const name = path
      .replace(/^\//, "")
      .replace(/\.html$/, "")
      .replace(/[_/ ]/g, "_");
    await page.goto(path);
    const main = page.getByRole("main");
    await expect(main).toHaveScreenshot(`${name}.png`);
  });
});
