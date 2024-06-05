import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils/e2e";

describe("auto imports", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
  });

  it("renders the page containing an auto imported onyx component and it's styles", async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch("/");

    // There should be a style definition for the onyx css variable if the styles were added globally
    expect(html).toContain("--onyx-font-family");

    // The rendered page should contain a h1 with the onyx classes if the component was auto imported correctly
    expect(html).toContain('<h1 class="onyx-headline onyx-headline--h1">');
  });
});
