import { iconPlaceholder } from "@sit-onyx/icons";
import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.jsx";
import OnyxTreeViewItem from "../OnyxTreeViewItem/OnyxTreeViewItem.vue";
import OnyxTreeView from "./OnyxTreeView.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Tree view",
    columns: DENSITIES,
    rows: ["default", "hover", "focus-visible", "open"],
    component: (column, row) => (
      <OnyxTreeView label="Test label" density={column}>
        <OnyxTreeViewItem label="Child 1" icon={iconPlaceholder} open={row === "open"}>
          <OnyxTreeViewItem label="Child 1.1" icon={iconPlaceholder} open={row === "open"}>
            <OnyxTreeViewItem label="Child 1.2" icon={iconPlaceholder} />
            <OnyxTreeViewItem label="Child 1.1.1" icon={iconPlaceholder} open={row === "open"}>
              <OnyxTreeViewItem label="Child 1.1.1.1" icon={iconPlaceholder} />
            </OnyxTreeViewItem>
          </OnyxTreeViewItem>
        </OnyxTreeViewItem>
        <OnyxTreeViewItem label="Child 2" icon={iconPlaceholder} />
      </OnyxTreeView>
    ),
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const child1 = component.getByRole("treeitem", { name: "Child 1" });
        await useFocusStateHooks({ component: child1, page, state: row });
      },
    },
  });
});

test("should toggle children", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxTreeView label="Test label">
      <OnyxTreeViewItem label="Child 1" icon={iconPlaceholder}>
        <OnyxTreeViewItem label="Child 1.1" icon={iconPlaceholder}>
          <OnyxTreeViewItem label="Child 1.2" icon={iconPlaceholder} />
          <OnyxTreeViewItem label="Child 1.1.1" icon={iconPlaceholder}>
            <OnyxTreeViewItem label="Child 1.1.1.1" icon={iconPlaceholder} />
          </OnyxTreeViewItem>
        </OnyxTreeViewItem>
      </OnyxTreeViewItem>
    </OnyxTreeView>,
  );

  const child1 = component.getByRole("treeitem", { name: "Child 1", exact: true });
  const child11 = component.getByRole("treeitem", { name: "Child 1.1", exact: true });
  const child111 = component.getByRole("treeitem", { name: "Child 1.1.1", exact: true });

  // ASSERT
  await expect(child11).toBeHidden();

  // ACT
  await child1.click();

  // ASSERT
  await expect(child11).toBeVisible();
  await expect(child111).toBeHidden();

  // ACT
  await child11.click();

  // ASSERT
  await expect(child111).toBeVisible();

  // ACT
  await child11.click();

  // ASSERT
  await expect(child111).toBeHidden();
});

test("should support accessible keyboard navigation", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxTreeView label="Test label">
      <OnyxTreeViewItem label="Child 1" icon={iconPlaceholder}>
        <OnyxTreeViewItem label="Child 1.1" icon={iconPlaceholder}>
          <OnyxTreeViewItem label="Child 1.2" icon={iconPlaceholder} />
        </OnyxTreeViewItem>
      </OnyxTreeViewItem>
      <OnyxTreeViewItem label="Child 2" icon={iconPlaceholder} />
    </OnyxTreeView>,
  );

  const child1 = component.getByRole("treeitem", { name: "Child 1", exact: true });
  const child11 = component.getByRole("treeitem", { name: "Child 1.1", exact: true });
  const child2 = component.getByRole("treeitem", { name: "Child 2", exact: true });

  // ACT
  await child1.focus();

  // ASSERT
  await expect(child1).toBeFocused();

  // ACT
  await child1.press("ArrowDown");

  // ASSERT
  await expect(child2).toBeFocused();

  // ACT
  await child2.press("ArrowUp");

  // ASSERT
  await expect(child1).toBeFocused();

  // ACT
  await child1.press("ArrowRight");

  // ASSERT
  await expect(child11).toBeVisible();

  // ACT
  await child1.press("ArrowRight");

  // ASSERT
  await expect(child11).toBeFocused();

  // ACT
  await child11.press("ArrowLeft");

  // ASSERT
  await expect(child1).toBeFocused();

  // ACT
  await child1.press("ArrowLeft");

  // ASSERT
  await expect(child11).toBeHidden();

  // ACT
  await child1.press("End");

  // ASSERT
  await expect(child2).toBeFocused();

  // ACT
  await child2.press("Home");

  // ASSERT
  await expect(child1).toBeFocused();
});
