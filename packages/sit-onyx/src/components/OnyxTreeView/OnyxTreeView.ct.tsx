import { iconPlaceholder } from "@sit-onyx/icons";
import { expect, test } from "../../playwright/a11y.js";
import OnyxTreeViewItem from "../OnyxTreeViewItem/OnyxTreeViewItem.vue";
import OnyxTreeView from "./OnyxTreeView.vue";

test("should trigger with hover", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxTreeView label="treeView">
      <OnyxTreeViewItem label="Child 1" icon={iconPlaceholder}>
        <OnyxTreeViewItem label="Child 1.1" icon={iconPlaceholder}>
          <OnyxTreeViewItem label="Child 1.2" icon={iconPlaceholder} />
          <OnyxTreeViewItem label="Child 1.1.1" icon={iconPlaceholder}>
            <OnyxTreeViewItem label="Child 1.1.1.1" icon={iconPlaceholder}></OnyxTreeViewItem>
          </OnyxTreeViewItem>
        </OnyxTreeViewItem>
      </OnyxTreeViewItem>
      <OnyxTreeViewItem label="Child 2" icon={iconPlaceholder} />
    </OnyxTreeView>,
  );

  const child1 = component.getByRole("treeitem", { name: "Child 1" });
  const child11 = component.getByRole("treeitem", { name: "Child 1.1" });
  const child111 = component.getByRole("treeitem", { name: "Child 1.1.1" });

  // ASSERT
  await expect(component).toHaveScreenshot("treeView.png");
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
  await child111.click();

  // ASSERT
  await expect(component).toHaveScreenshot("treeView-expanded.png");
});

test("should support accessible keyboard navigation", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxTreeView label="treeView">
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
