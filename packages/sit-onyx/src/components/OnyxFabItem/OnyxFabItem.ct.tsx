import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.js";
import OnyxFABItem from "./OnyxFABItem.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Fab item",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <ul role="menu" style={{ display: "contents" }}>
        <OnyxFABItem label="Label" density={column} />
      </ul>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        await useFocusStateHooks({ component, page, state: row });
      },
    },
  });
});

test.describe("Screenshot tests (icon)", () => {
  executeMatrixScreenshotTest({
    name: "Fab item (item)",
    columns: ["default", "link"],
    rows: ["text", "icon", "text-icon"],
    component: (column, row) => (
      <ul role="menu" style={{ display: "contents" }}>
        <OnyxFABItem
          label="Label"
          icon={row.includes("icon") ? mockPlaywrightIcon : undefined}
          hideLabel={!row.includes("text")}
          link={column === "link" ? "#test" : undefined}
        />
      </ul>
    ),
  });
});

test("should render as link", async ({ page, mount }) => {
  // ARRANGE
  const component = await mount(
    <ul role="menu" style={{ display: "contents" }}>
      <OnyxFABItem label="Label" link="#test" />
    </ul>,
  );

  // ACT
  await component.getByRole("menuitem", { name: "Label" }).click();

  // ASSERT
  await expect(page).toHaveURL(/^http:\/\/localhost:\d*\/#test$/);
});
