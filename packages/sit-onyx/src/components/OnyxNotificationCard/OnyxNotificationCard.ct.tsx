import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxNotificationCard from "./OnyxNotificationCard.vue";

const MOCK_DATE = new Date(2025, 3, 2, 13, 45);

test.beforeEach(async ({ page }) => {
  await page.clock.install({ time: MOCK_DATE });
  await page.clock.setFixedTime(MOCK_DATE);

  await page.addStyleTag({
    content: "body { background-color: var(--onyx-color-base-background-tinted); }",
  });
});

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Notification card",
    columns: DENSITIES,
    rows: ["default", "unread", "actions", "separator", "icon", "skeleton"],
    component: (column, row) => {
      const card = (
        <OnyxNotificationCard
          headline="Example notification"
          createdAt={MOCK_DATE}
          unread={row === "unread"}
          density={column}
          style={{ width: "24rem" }}
          icon={row === "icon" ? mockPlaywrightIcon : undefined}
          skeleton={row === "skeleton"}
        >
          Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate.
          {row === "actions" && (
            <template v-slot:actions>
              <OnyxButton label="Button" color="neutral" />
              <OnyxButton label="Button" />
            </template>
          )}
        </OnyxNotificationCard>
      );

      return (
        <div style={{ display: "contents" }}>
          {card}
          {row === "separator" && card}
        </div>
      );
    },
  });
});

test.describe("Screenshot tests (header actions)", () => {
  executeMatrixScreenshotTest({
    name: "Notification card (header actions)",
    columns: ["default", "unread"],
    rows: ["default", "hover", "open"],
    component: (column) => {
      return (
        <OnyxNotificationCard
          headline="Example notification"
          createdAt={MOCK_DATE}
          unread={column === "unread"}
          style={{ width: "24rem" }}
        >
          Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate.
          <template v-slot:headerActions>
            <OnyxMenuItem>Action 1</OnyxMenuItem>
            <OnyxMenuItem>Action 2</OnyxMenuItem>
          </template>
        </OnyxNotificationCard>
      );
    },
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "hover" || row == "open") {
          await component.hover();
        }
        if (row == "open") {
          await component.getByLabel("Toggle actions").click();
        }
      },
    },
  });
});

test("should display elapsed time correctly", async ({ page, mount }) => {
  // ARRANGE
  await page.clock.install({ time: MOCK_DATE });

  const component = await mount(OnyxNotificationCard, {
    props: {
      headline: "Example notification",
      createdAt: MOCK_DATE,
    },
  });

  // key = expected label, value = time to elapse in seconds
  const TEST_CASES = {
    Now: 0,
    "1 minute ago": 60,
    "2 minutes ago": 60 * 2,
    "1 hour ago": 60 * 60,
    "2 hours ago": 60 * 60 * 2,
    yesterday: 60 * 60 * 24,
    "2 days ago": 60 * 60 * 24 * 2,
    "last week": 60 * 60 * 24 * 7,
    "2 weeks ago": 60 * 60 * 24 * 14,
    "last month": 60 * 60 * 24 * 30,
    "2 months ago": 60 * 60 * 24 * 60,
    "last year": 60 * 60 * 24 * 365,
    "2 years ago": 60 * 60 * 24 * 365 * 2,
  };

  for (const [label, duration] of Object.entries(TEST_CASES)) {
    // ACT
    await page.clock.pauseAt(MOCK_DATE.getTime() + 1000 * (duration + 1));

    // ASSERT
    await expect(component).toContainText(label);
  }
});

test("should show header actions on hover", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(
    <OnyxNotificationCard
      headline="Example headline"
      createdAt={MOCK_DATE}
      style={{ margin: "3rem" }}
    >
      <template v-slot:headerActions>
        <OnyxMenuItem>Action 1</OnyxMenuItem>
        <OnyxMenuItem>Action 2</OnyxMenuItem>
      </template>
    </OnyxNotificationCard>,
  );

  const flyoutTrigger = component.getByLabel("Toggle actions");
  const flyoutMenu = component.getByLabel("More actions");

  // ACT
  await component.hover();

  // ASSERT
  await expect(flyoutTrigger, "should show flyout system button on hover").toBeVisible();
  await expect(flyoutMenu, "should not show menu on hover").toBeHidden();

  // ACT
  await flyoutTrigger.click();

  // ASSERT
  await expect(flyoutMenu.getByRole("menuitem", { name: "Action 1" })).toBeVisible();
  await expect(flyoutMenu.getByRole("menuitem", { name: "Action 2" })).toBeVisible();

  // ACT (reset mouse)
  await page.getByRole("document").click();
  await page.getByRole("document").hover({ position: { x: 0, y: 0 } });

  // ASSERT
  await expect(flyoutMenu).toBeHidden();

  // ACT
  await component.press("Tab");

  // ASSERT
  await expect(flyoutTrigger, "should focus trigger with keyboard").toBeFocused();
  await expect(flyoutMenu, "should show menu on keyboard focus").toBeVisible();
});
