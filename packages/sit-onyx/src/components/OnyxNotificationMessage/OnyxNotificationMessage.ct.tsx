import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxNotificationMessage from "./OnyxNotificationMessage.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Notification message",
    columns: ["default", "hover", "focus-visible"],
    rows: ["default", "icon", "buttons", "icon+buttons"],
    component: (column, row) => (
      <OnyxNotificationMessage
        headline="Example headline"
        duration={0}
        icon={row.includes("icon") ? mockPlaywrightIcon : undefined}
      >
        Example description
        {row.includes("buttons") && (
          <template v-slot:buttons>
            <OnyxButton label="Button" color="neutral" />
            <OnyxButton label="Button" />
          </template>
        )}
      </OnyxNotificationMessage>
    ),
    hooks: {
      beforeEach: async (component, page, column) => {
        if (column === "hover") await component.hover();
        if (column === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test.describe("Screenshot tests (other)", () => {
  executeMatrixScreenshotTest({
    name: "Notification message (other)",
    columns: ["default"],
    rows: ["truncation", "close-focus"],
    component: (column, row) => (
      <OnyxNotificationMessage
        headline={"Example headline ".repeat(row === "truncation" ? 4 : 1)}
        duration={0}
      >
        {"Example description ".repeat(row === "truncation" ? 8 : 1)}
      </OnyxNotificationMessage>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "close-focus") {
          await page.keyboard.press("Tab");
          await page.keyboard.press("Tab");
        }
      },
    },
  });
});

test("should show close button", async ({ page, mount }) => {
  // ARRANGE
  let closeEventCount = 0;

  const component = await mount(
    <OnyxNotificationMessage
      headline="Example headline"
      duration={0}
      onClose={() => closeEventCount++}
    >
      Example description
    </OnyxNotificationMessage>,
  );

  const closeButton = component.getByRole("button", { name: "Close" });

  // ASSERT
  await expect(closeButton, "should hide close button by default").toBeHidden();

  // ACT
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");

  // ASSERT
  await expect(closeButton, "should show close button when focussing via keyboard").toBeVisible();
  await expect(() => expect(closeEventCount).toBe(1)).toPass();

  // ACT
  await page.getByRole("document").click(); // reset focus

  // ASSERT
  await expect(closeButton).toBeHidden();

  // ACT
  await component.hover();

  // ASSERT
  await expect(closeButton, "should show close button on hover").toBeVisible();

  // ACT
  await closeButton.click();

  // ASSERT
  await expect(() => expect(closeEventCount).toBe(2)).toPass();
});

test("should close after duration has been elapsed", async ({ page, mount }) => {
  // ARRANGE
  let closeEventCount = 0;
  const mockDate = new Date();

  await page.clock.install({ time: mockDate });

  await mount(
    <OnyxNotificationMessage
      headline="Example headline"
      duration={1000}
      onClose={() => closeEventCount++}
    >
      Example description
    </OnyxNotificationMessage>,
  );

  // ASSERT
  await expect(() => expect(closeEventCount).toBe(0)).toPass();

  // ACT
  await page.clock.runFor(1_000);

  await expect(() => expect(closeEventCount).toBe(1)).toPass();
});
