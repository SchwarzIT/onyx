import { iconEmojiHappy1, iconEmojiHappy2, iconEmojiSad, iconPlaceholder } from "@sit-onyx/icons";
import { createEmitSpy, expectEmit, useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxEditorToolbarFlyout from "./OnyxEditorToolbarFlyout.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Editor toolbar flyout",
    columns: ["default", "active"],
    rows: ["default", "hover", "focus-visible"],
    component: (column) => (
      <OnyxEditorToolbarFlyout
        style={{ margin: "2rem", marginBottom: "6rem", marginRight: "6rem" }}
        label="Label"
        icon={iconPlaceholder}
        options={[
          { label: "Option 1", icon: iconEmojiSad },
          { label: "Option 2", icon: iconEmojiHappy2, active: column === "active" },
        ]}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const button = component.getByRole("button", { name: "Label" });
        await useFocusStateHooks({ component: button, page, state: row });

        if (row === "hover" || row === "focus-visible") {
          // wait for flyout to be opened
          await expect(component.getByRole("dialog", { name: "Label" })).toBeVisible();
        }

        if (row === "hover") {
          // wait for tooltip to be opened
          await expect(component.getByRole("tooltip")).toBeVisible();
        }
      },
    },
  });
});

// eslint-disable-next-line playwright/expect-expect -- assertion done by "expectEmit"
test("should trigger onClick", async ({ mount }) => {
  const onClick = createEmitSpy();

  // ARRANGE
  const component = await mount(
    <OnyxEditorToolbarFlyout
      label="Label"
      icon={iconPlaceholder}
      options={[
        { label: "Option 1", icon: iconEmojiHappy1 },
        { label: "Option 2", icon: iconEmojiHappy2, onClick },
      ]}
    />,
  );

  // ACT
  await component.hover();
  await component.getByRole("menuitem", { name: "Option 2" }).click();

  // ASSERT
  expectEmit(onClick, 1, []);
});
