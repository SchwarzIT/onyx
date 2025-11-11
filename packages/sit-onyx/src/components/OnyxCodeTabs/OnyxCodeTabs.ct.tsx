import { iconBrowserTerminal } from "@sit-onyx/icons";
import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxCodeTab from "../OnyxCodeTab/OnyxCodeTab.vue";
import OnyxCodeTabs from "./OnyxCodeTabs.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Code tabs",
    columns: ["default", "copy", "single"],
    rows: ["default", "hover", "active", "focus-visible"],
    component: (column) => (
      <OnyxCodeTabs modelValue="tab-1">
        <OnyxCodeTab
          value="tab-1"
          code={`console.log("test")\nconst message = "Test"`}
          language="ts"
        />
        {column !== "single" && (
          <OnyxCodeTab
            value="tab-2"
            code="console.log('test')"
            language="ts"
            icon={iconBrowserTerminal}
            label="With icon"
          />
        )}
      </OnyxCodeTabs>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const element =
          column === "copy"
            ? component.getByRole("button", { name: "Copy code" })
            : component.getByRole("tab", { name: "Code" });

        if (column === "copy" && row === "focus-visible") {
          await page.keyboard.press("Tab");
        }

        await useFocusStateHooks({ component: element, page, state: row });
      },
    },
  });
});

test.describe("Screenshot tests (skeleton)", () => {
  executeMatrixScreenshotTest({
    name: "Code tabs (skeleton)",
    columns: ["default"],
    rows: ["default"],
    component: () => (
      <OnyxCodeTabs modelValue="tab-1" skeleton>
        <OnyxCodeTab value="tab-1" code="" language="ts" />
        <OnyxCodeTab value="tab-2" code="" language="ts" />
        <OnyxCodeTab value="tab-2" code="" language="ts" />
      </OnyxCodeTabs>
    ),
  });
});

test("should copy code", async ({ mount, page, context, browserName }) => {
  // eslint-disable-next-line playwright/no-skipped-test -- clipboard permission granting is only supported in chromium
  test.skip(
    browserName !== "chromium",
    "clipboard permission granting is only supported in chromium",
  );

  // ARRANGE
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.clock.install({ time: new Date(2025, 10, 2) });
  await page.clock.pauseAt(new Date(2025, 10, 3));

  const code = "console.log('test')";

  const component = await mount(
    <OnyxCodeTabs modelValue="tab-1">
      <OnyxCodeTab value="tab-1" code={code} />
    </OnyxCodeTabs>,
  );

  const copyButton = component.getByRole("button", { name: "Copy code" });

  // ACT
  await copyButton.click();

  // ASSERT
  const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboardContent).toBe(code);
  await expect(copyButton).toBeHidden();
  await expect(component).toContainText("Copied!");

  // ACT
  await page.clock.fastForward(3_000);

  // ASSERT
  await expect(copyButton).toBeVisible();
  await expect(component).not.toContainText("Copied!");
});

test("should show error when copy fails", async ({ mount, page, context, browserName }) => {
  // eslint-disable-next-line playwright/no-skipped-test -- clipboard permission granting is only supported in chromium
  test.skip(
    browserName !== "chromium",
    "clipboard permission granting is only supported in chromium",
  );

  // ARRANGE
  await page.clock.install({ time: new Date(2025, 10, 2) });
  await page.clock.pauseAt(new Date(2025, 10, 3));

  await context.grantPermissions([]);

  const component = await mount(
    <OnyxCodeTabs modelValue="tab-1">
      <OnyxCodeTab value="tab-1" code="console.log('test')" />
    </OnyxCodeTabs>,
  );

  const copyButton = component.getByRole("button", { name: "Copy code" });

  // ACT
  await copyButton.click();

  // ASSERT
  await expect(copyButton).toBeHidden();
  await expect(component).toContainText("Failed!");

  // ACT
  await page.clock.fastForward(3_000);

  // ASSERT
  await expect(copyButton).toBeVisible();
  await expect(component).not.toContainText("Failed!");
});
