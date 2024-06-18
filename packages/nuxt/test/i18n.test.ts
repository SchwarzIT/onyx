import { $fetch, setup } from "@nuxt/test-utils/e2e";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("i18n", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("./fixtures/i18n", import.meta.url)),
  });

  it("provides the translations from onyx", async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch("/en-US/optional");

    // The onyx translation should be used
    expect(html).toContain("Optional: (optional)");
  });

  it("overwrites individual translations from onyx with project specific ones", async () => {
    const enHtml = await $fetch("/en-US/overwrite");
    expect(enHtml).toContain("Overwrite: Go back");

    const deHtml = await $fetch("/de-DE/overwrite");

    // A translation from onyx was provided for this key but the one in the project has a higher priority
    expect(deHtml).toContain("Overwrite: Überschriebene Übersetzung");
  });

  it("adds a project specific language", async () => {
    const html = await $fetch("/tlh/optional");
    expect(html).toContain("Optional: (qayl)");
  });

  it("extends an existing onyx translation to define a project specific one", async () => {
    const testHtml = await $fetch("/int/test");
    expect(testHtml).toContain("Test: Test Int");
    const optionalHtml = await $fetch("/int/optional");
    expect(optionalHtml).toContain("Optional: (optional)");
  });
});
