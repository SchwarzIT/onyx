import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxHeadline from "./OnyxHeadline.vue";
import { HEADLINE_TYPES } from "./types";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Headline",
    columns: ["default", "skeleton"],
    rows: HEADLINE_TYPES,
    component: (column, row) => (
      <OnyxHeadline is={row} skeleton={column === "skeleton"}>
        Hello World
      </OnyxHeadline>
    ),
  });
});

test.describe("Screenshot tests (visual size)", () => {
  executeMatrixScreenshotTest({
    name: "Headline (visual sizes)",
    columns: ["h1", "h2", "h3", "h4"],
    rows: HEADLINE_TYPES,
    component: (column, row) => (
      <OnyxHeadline is={row} visualSize={column}>
        Hello World
      </OnyxHeadline>
    ),
  });
});

test.describe("Screenshot tests (hash)", () => {
  executeMatrixScreenshotTest({
    name: "Headline (hash)",
    columns: HEADLINE_TYPES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxHeadline is={column} hash="example" style={{ marginLeft: "1rem" }}>
        Hello World
      </OnyxHeadline>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test("should copy hash", async ({ mount, page, context, browserName }) => {
  // eslint-disable-next-line playwright/no-skipped-test
  test.skip(
    browserName !== "chromium",
    "clipboard permission granting is only supported in chromium",
  );

  await context.grantPermissions(["clipboard-read", "clipboard-write"]);

  // ARRANGE
  const component = await mount(
    <OnyxHeadline is="h1" hash="example-hash" style={{ marginLeft: "1rem" }}>
      Example
    </OnyxHeadline>,
  );

  // ACT
  await component.getByRole("link", { name: "Example" }).click();

  // ASSERT
  const expectedUrl = "http://localhost:3100/#example-hash";
  await expect(page).toHaveURL(expectedUrl);

  const copiedValue = await page.evaluate(() => navigator.clipboard.readText());
  expect(copiedValue).toEqual(expectedUrl);
});
