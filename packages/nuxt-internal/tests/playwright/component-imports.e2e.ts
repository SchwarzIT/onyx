import { fileURLToPath } from "node:url";
import { expect, test } from "@nuxt/test-utils/playwright";

test.use({
  nuxt: {
    rootDir: fileURLToPath(new URL("../fixtures/basic", import.meta.url)),
  },
});

test("example test", async ({ page, goto }) => {
  await goto("/", { waitUntil: "hydration" });

  // The rendered page should contain a h1 with the onyx classes if the component was auto imported correctly
  const headline = page.getByRole("heading", { level: 1, name: "Hello onyx" });
  await expect(headline).toBeVisible();
});
