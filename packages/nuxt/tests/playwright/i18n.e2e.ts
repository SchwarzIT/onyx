import { expect, test } from "@nuxt/test-utils/playwright";
import { fileURLToPath } from "node:url";

test.use({
  nuxt: {
    rootDir: fileURLToPath(new URL("../fixtures/i18n", import.meta.url)),
  },
});

test("provides the translations from onyx", async ({ page, goto }) => {
  await goto("/en-US/optional", { waitUntil: "hydration" });
  const html = await page.content();
  expect(html, "should use onyx translations").toContain("Optional: (optional)");
});

test("overwrites individual translations from onyx with project specific ones", async ({
  page,
  goto,
}) => {
  await goto("/en-US/overwrite", { waitUntil: "hydration" });
  let html = await page.content();
  expect(html).toContain("Overwrite: Go back");

  await goto("/de-DE/overwrite", { waitUntil: "hydration" });
  html = await page.content();
  // A translation from onyx was provided for this key but the one in the project has a higher priority
  expect(html).toContain("Overwrite: Überschriebene Übersetzung");
});

test("adds a project specific language", async ({ page, goto }) => {
  await goto("/tlh/optional", { waitUntil: "hydration" });
  const html = await page.content();
  expect(html).toContain("Optional: (qayl)");
});

test("extends an existing onyx translation to define a project specific one", async ({
  page,
  goto,
}) => {
  await goto("/int/test", { waitUntil: "hydration" });
  let html = await page.content();
  expect(html).toContain("Test: Test Int");

  await goto("/int/optional", { waitUntil: "hydration" });
  html = await page.content();
  expect(html).toContain("Optional: (optional)");
});
