import { expect, test } from "@nuxt/test-utils/playwright";

test("should render prose components with onyx", async ({ page, goto }) => {
  await goto("/", { waitUntil: "hydration" });

  await expect(page).toHaveScreenshot("prose.png");

  // HEADLINES
  for (const headlineLevel of [1, 2, 3, 4, 5, 6] as const) {
    const headline = page.getByRole("heading", { level: headlineLevel });

    await expect(
      headline,
      `should replace h${headlineLevel} heading with <OnyxHeadline>`,
    ).toContainClass("onyx-headline");

    await expect(
      headline.getByRole("link", { name: "Copy link to headline" }),
      `should generate hash for h${headlineLevel} headline`,
    ).toBeAttached();
  }

  // LINK
  const link = page.getByRole("link", { name: "This is a link" });
  await expect(link, "should replace links with <OnyxLink>").toContainClass("onyx-link");

  // IMAGE
  const image = page.getByRole("img", { name: "Image alt" });
  await expect(image, "should replace images with <NuxtImg>").toHaveAttribute("data-nuxt-img", "");

  // TABLE
  const table = page.getByRole("table");
  await expect(table, "should replace tables with <OnyxTable>").toContainClass("onyx-table");
});
