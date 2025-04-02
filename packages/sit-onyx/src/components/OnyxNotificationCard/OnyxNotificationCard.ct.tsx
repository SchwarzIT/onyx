import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
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
    rows: ["default", "unread", "actions", "separator"],
    component: (column, row) => {
      const card = (
        <OnyxNotificationCard
          headline="Example notification"
          createdAt={MOCK_DATE}
          unread={row === "unread"}
          density={column}
          style={{ width: "24rem" }}
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
    Now: 59,
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
    await page.clock.pauseAt(new Date(MOCK_DATE).getTime() + 1000 * duration);

    // ASSERT
    await expect(component).toContainText(label);
  }
});
