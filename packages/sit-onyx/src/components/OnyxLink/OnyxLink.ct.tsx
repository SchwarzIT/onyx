import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxLink from "./OnyxLink.vue";

// we do not want to actually make requests to live external applications so we mock them here
const EXTERNAL_HREF = "https://example.com";

test.beforeEach(async ({ page }) => {
  await page.route(EXTERNAL_HREF, (route) => route.fulfill({ body: "Test page" }));
});

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Link",
    columns: ["default", "external"],
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxLink
        href={column === "external" ? EXTERNAL_HREF : "#"}
        style={{ fontFamily: "var(--onyx-font-family-paragraph)" }}
      >
        Click me
      </OnyxLink>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await expect(component).toContainText("Click me");
        if (row === "hover") await component.hover();
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});
