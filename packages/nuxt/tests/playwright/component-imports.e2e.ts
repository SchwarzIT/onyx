import { expect, test } from "@nuxt/test-utils/playwright";
import { fileURLToPath } from "node:url";

test.use({
  nuxt: {
    rootDir: fileURLToPath(new URL("../fixtures/basic", import.meta.url)),
  },
});

test("renders the page containing an auto imported onyx component and it's styles", async ({
  page,
  goto,
}) => {
  await goto("/", { waitUntil: "hydration" });

  // The rendered page should contain a h1 with the onyx classes if the component was auto imported correctly
  const headline = page.getByRole("heading", { level: 1, name: "Hello onyx" });
  await expect(headline).toBeVisible();
  await expect(headline).toContainClass("onyx-component onyx-headline onyx-headline--h1");

  // global styles should be imported
  const body = page.locator("body");
  const styles = await body.evaluate((el) => {
    const style = getComputedStyle(el);
    return {
      fontFamily: style.fontFamily,
      "--onyx-font-family": style.getPropertyValue("--onyx-font-family").replace(",", ", "),
    };
  });
  expect(styles.fontFamily).toBe(styles["--onyx-font-family"]);
});
