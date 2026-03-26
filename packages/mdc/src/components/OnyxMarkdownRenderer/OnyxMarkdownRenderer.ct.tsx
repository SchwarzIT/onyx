import { expect, test } from "@playwright/experimental-ct-vue";
import OnyxMarkdownRenderer from "./OnyxMarkdownRenderer.vue";

test("should render link", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxMarkdownRenderer
      markdown={`
[Internal link](#test)

[External link](https://example.com)
`}
    />,
  );

  const internalLink = component.getByRole("link", { name: "Internal link" });
  const externalLink = component.getByRole("link", { name: "External link" });

  // ASSERT
  await expect(internalLink).toContainClass("onyx-link");
  await expect(internalLink).toHaveAttribute("href", "#test");
  await expect(internalLink).toHaveAttribute("target", "_self");

  await expect(externalLink).toContainClass("onyx-link");
  await expect(externalLink).toHaveAttribute("href", "https://example.com");
  await expect(externalLink).toHaveAttribute("target", "_blank");

  await expect(component).toHaveScreenshot("link.png");
});

test("should render hard break", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxMarkdownRenderer
      markdown={`
A
<br />
B
`}
    />,
  );

  const br = component.locator("br");

  // ASSERT
  await expect(br).toBeAttached();
  await expect(br).toBeHidden();
});

test("should render code", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxMarkdownRenderer markdown={"This is an `console.log('inline code')` snippet"} />,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("code.png");
});

test("should render details / summary", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxMarkdownRenderer
      markdown={`
<details>
Details content
</details>

<details>
<summary>Custom summary headline</summary>

Details content
</details>
`}
    />,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("details-summary.png");

  // ACT
  await component.getByRole("button", { name: "Click to toggle content" }).click();

  // ASSERT
  await expect(component.getByText("Details content").first()).toBeVisible();
  await expect(component).toHaveScreenshot("details-summary-open.png");
});

test("should render headlines", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxMarkdownRenderer
      markdown={`
# Headline 1
## Headline 2
### Headline 3
#### Headline 4
##### Headline 5
###### Headline 6
`}
    />,
  );

  // ASSERT
  for (let i = 0; i < 6; i++) {
    const level = i + 1;
    const headline = component.getByRole("heading", { level, name: `Headline ${level}` });
    await expect(headline).toContainClass(`onyx-headline--h${level}`);

    const copyLink = headline.getByRole("link", { name: "Copy link to headline" });
    await expect(copyLink).toBeAttached();
    await expect(copyLink).toHaveAttribute("href", `#headline-${level}`);
  }

  await expect(component).toHaveScreenshot("headlines.png");
});

test("should render hr", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<OnyxMarkdownRenderer markdown={`---`} />);
  const hr = component.getByRole("separator");

  // ASSERT
  await expect(hr).toContainClass("onyx-separator");
  await expect(component).toHaveScreenshot("hr.png");
});

test("should render ol", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxMarkdownRenderer
      markdown={`
1. Option A
2. Option B
3. Option C
`}
    />,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("ol.png");
});

test("should render p", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxMarkdownRenderer
      markdown={`
Hello World

New line
`}
    />,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("p.png");
});

test("should render pre", async ({ mount, page, context }) => {
  // ARRANGE
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);

  const component = await mount(
    <OnyxMarkdownRenderer
      markdown={`
\`\`\`ts
console.log("Hello World");
\`\`\`

\`\`\`ts [example-file.ts]
console.log("Hello World");
\`\`\`
`}
    />,
  );

  const copyButton = component.getByRole("button", { name: "Copy code" }).first();

  // ASSERT
  await expect(component).toHaveScreenshot("pre.png");

  // ACT
  await copyButton.click();

  // ASSERT
  const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboardContent).toBe('console.log("Hello World");\n');
});

test("should render table", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxMarkdownRenderer
      markdown={`
| Left aligned | Centered | Right aligned |
| ------------ | :------: | ------------: |
| foo          |    1     |         Hello |
| bar          |    2     |           out |
| baz          |    3     |         there |
`}
    />,
  );

  const table = component.getByRole("table");

  // ASSERT
  await expect(table).toContainClass("onyx-table");
  await expect(component).toHaveScreenshot("table.png");
});

test("should render ul", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxMarkdownRenderer
      markdown={`
- Option A
- Option B
- Option C
`}
    />,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("ul.png");
});
