import { $fetch, setup } from "@nuxt/test-utils/e2e";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

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

    // global styles should be imported
    expect(html).toContain(
      `@layer onyx.utility{body{background-color:var(--onyx-color-base-background-tinted)`,
    );
  });

  it("imports the stylesheet matching the configured theme", async () => {
    const html = await $fetch("/");
    expect(html).toContain(".onyx-theme-lidl");
  });
});
