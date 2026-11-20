import { expect, test } from "@nuxt/test-utils/playwright";

test("should open component example in playground with matching code snippet", async ({
  page,
  goto,
}) => {
  await goto("/components/buttons/button", { waitUntil: "hydration" });

  // 1. Open the "Code" tab for the first component example and get its code snippet
  const codeTab = page
    .getByRole("tablist", { name: "Component example" })
    .first()
    .getByRole("tab", { name: "Code" });
  await codeTab.click();

  const codePanel = page.getByRole("tabpanel", { name: "Code" }).locator("pre code");
  await expect(codePanel).toBeVisible();
  const codeSnippet = (await codePanel.innerText()).trim();
  expect(codeSnippet).toBeTruthy();

  // 2. Open the playground link
  const exampleOptions = page.getByRole("button", { name: "Change styles" }).first();
  await exampleOptions.click();

  const playgroundLink = page.getByRole("menuitem", { name: "Open in Playground" });
  await expect(playgroundLink).toBeVisible();

  const popupPromise = page.waitForEvent("popup");
  await playgroundLink.click();
  const playgroundPage = await popupPromise;
  await expect(playgroundPage).toHaveURL(/^https:\/\/playground\.onyx\.schwarz/);

  // 3. Check that the playground includes the same code snippet as the docs
  const editorLines = playgroundPage.locator(".monaco-editor .view-line");
  await expect(editorLines.first()).toBeVisible();

  // Monaco renders each line as a separate `.view-line` div and replaces spaces with non-breaking spaces (\u00a0)
  await expect(async () => {
    const lines = await editorLines.allInnerTexts();
    const editorText = lines.join("\n").replaceAll("\u00a0", " ").trim();
    expect(editorText).toBe(codeSnippet);
  }).toPass();
});
