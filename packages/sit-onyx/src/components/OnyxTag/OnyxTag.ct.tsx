import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots.js";
import { ONYX_COLORS } from "../../types/colors.js";
import OnyxTag from "./OnyxTag.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Tag",
    columns: DENSITIES,
    rows: ONYX_COLORS,
    component: (column, row) => <OnyxTag label="Tag" density={column} color={row} />,
  });

  executeMatrixScreenshotTest({
    name: "Tag (with icon)",
    columns: DENSITIES,
    rows: ONYX_COLORS,
    component: (column, row) => (
      <OnyxTag label="Tag" density={column} color={row} icon={mockPlaywrightIcon} />
    ),
  });

  const states = ["with interactiveIcon", "hover", "focus"];

  states.forEach((state) => {
    executeMatrixScreenshotTest({
      name: `Tag (${state})`,
      columns: DENSITIES,
      rows: ONYX_COLORS,
      component: (column, row) => (
        <OnyxTag
          label="Tag"
          density={column}
          color={row}
          clickable={
            state === "with interactiveIcon"
              ? { label: "clickable", actionIcon: mockPlaywrightIcon }
              : "clickable"
          }
          style={state === "hover" || state === "focus" ? { margin: "0 2rem 2rem 0" } : {}}
        />
      ),
      hooks: {
        beforeEach: async (component) => {
          const tag = component.getByRole("button", { name: "Tag" });
          if (state === "hover") {
            await tag.hover();
            await new Promise((resolve) => setTimeout(resolve, 200));
          }
          if (state === "focus") await tag.focus();
        },
      },
    });
  });
});

test("should truncate text", async ({ mount }) => {
  const label = "Very long label that should be truncated";

  // ARRANGE
  const component = await mount(<OnyxTag label={label} style="max-width: 8rem;" />);

  // ASSERT
  await expect(component).toContainText(label);

  // ASSERT
  await expect(component).toHaveScreenshot("truncation.png");
});
test("should render non-interactive tag without event", async ({ mount }) => {
  const component = await mount(<OnyxTag label="Tag" />);
  await expect(component).not.toContainClass("onyx-tag--interactive");
});

test("should render interactive tag with clickable prop", async ({ mount }) => {
  const component = await mount(<OnyxTag label="Tag" clickable="clickable" />);
  const interactiveTag = component.getByRole("button", { name: "Tag" });
  await expect(interactiveTag).toContainClass("onyx-tag--interactive");
});
