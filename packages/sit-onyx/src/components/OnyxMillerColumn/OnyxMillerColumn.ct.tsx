import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxMillerColumn from "./OnyxMillerColumn.vue";
import OnyxMillerItem from "./modules/OnyxMillerItem/OnyxMillerItem.vue";
import OnyxMillerPane from "./modules/OnyxMillerPane/OnyxMillerPane.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Miller Column (densities)",
    columns: DENSITIES,
    rows: ["default", "hover", "active", "focus-visible"],
    hooks: {
      beforeEach: async (component, page, column, row) => {
        const itemButton = component.getByRole("button", { name: "Sweets" });

        if (row === "hover") {
          await itemButton.hover();
        }
        if (row === "focus-visible") {
          await page.keyboard.press("Tab");
        }
        if (row === "active") {
          await itemButton.hover();
          await page.mouse.down();
        }
      },
    },
    component: (column) => (
      <OnyxMillerColumn density={column} itemsInView={2} columnHeight="14rem">
        <OnyxMillerPane label="Category">
          <OnyxMillerItem
            label="Sweets"
            active
            arrow
            count={42}
            dot
            dotColor="var(--onyx-color-base-danger-500)"
          />
          <OnyxMillerItem label="Vegetables" arrow />
        </OnyxMillerPane>

        <OnyxMillerPane label="Product Group">
          <OnyxMillerItem label="Chocolate" active />
          <OnyxMillerItem>Cookies</OnyxMillerItem>
        </OnyxMillerPane>
      </OnyxMillerColumn>
    ),
  });
});

test("scrolls horizontally when panes exceed available viewport width", async ({ mount, page }) => {
  // ARRANGE
  await page.setViewportSize({ width: 500, height: 600 });

  const component = await mount(
    <OnyxMillerColumn>
      <OnyxMillerPane label="Category">
        <OnyxMillerItem label="Sweets" active arrow count={42} />
        <OnyxMillerItem label="Fruit" arrow />
      </OnyxMillerPane>
      <OnyxMillerPane label="Sub-Category">
        <OnyxMillerItem label="Chocolate" active arrow />
      </OnyxMillerPane>
      <OnyxMillerPane label="Product">
        <OnyxMillerItem label="Milka" />
      </OnyxMillerPane>
      <OnyxMillerPane label="Size">
        <OnyxMillerItem label="Small" active arrow count={33} />
        <OnyxMillerItem label="Large" arrow />
      </OnyxMillerPane>
      <OnyxMillerPane label="Quality">
        <OnyxMillerItem label="Excellent" active arrow />
        <OnyxMillerItem label="Mid" active arrow />
      </OnyxMillerPane>
    </OnyxMillerColumn>,
  );

  const nav = component.locator(".onyx-miller-column__nav");
  const lastPane = component.locator(".onyx-miller-pane").last();

  // ACT
  await lastPane.scrollIntoViewIfNeeded();
  const scrollLeft = await nav.evaluate((el) => el.scrollLeft);

  // ASSERT
  await expect(lastPane).toBeInViewport();
  expect(scrollLeft).toBeGreaterThan(0);
});

test("scrolls vertically inside panes when items overflow", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxMillerColumn columnHeight="10rem">
      <OnyxMillerPane label="Size">
        <OnyxMillerItem label="Category" />
        {Array.from({ length: 30 }).map((_, i) => (
          <OnyxMillerItem label={`Item ${i + 1}`} key={i} />
        ))}
      </OnyxMillerPane>
    </OnyxMillerColumn>,
  );

  const listBox = component.locator(".onyx-miller-pane__list-box");
  const lastItem = component.locator(".onyx-miller-item").last();

  // ACT
  await lastItem.scrollIntoViewIfNeeded();
  const scrollTop = await listBox.evaluate((el) => el.scrollTop);

  // ASSERT
  await expect(lastItem).toBeInViewport();
  expect(scrollTop).toBeGreaterThan(0);
});

test("maintains exact height matching columnHeight prop regardless of content", async ({
  mount,
}) => {
  // ARRANGE
  const targetHeight = 350;

  const componentOverflow = await mount(
    <OnyxMillerColumn columnHeight={`${targetHeight}px`}>
      <div>
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i}>Line {i}</p>
        ))}
      </div>
    </OnyxMillerColumn>,
  );

  // ACT
  const boxOverflow = await componentOverflow.boundingBox();

  // ASSERT
  expect(boxOverflow?.height).toBe(targetHeight);

  // ARRANGE
  const componentUnderflow = await mount(
    <OnyxMillerColumn columnHeight={`${targetHeight}px`}>
      <div>Single line content</div>
    </OnyxMillerColumn>,
  );

  // ACT
  const boxUnderflow = await componentUnderflow.boundingBox();

  // ASSERT
  expect(boxUnderflow?.height).toBe(targetHeight);
});
