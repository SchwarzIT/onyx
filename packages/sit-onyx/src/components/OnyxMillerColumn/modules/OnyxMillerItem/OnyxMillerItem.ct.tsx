import { expect, test } from "../../../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../../../playwright/screenshots.js";
import OnyxMillerItem from "./OnyxMillerItem.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "MillerItem",
    columns: ["default", "active"],
    rows: ["default", "hover", "focus-visible", "count", "dot", "with-arrow"],
    component: (column, row) => (
      <ul style={{ padding: 0, margin: 0, width: "240px", listStyle: "none" }}>
        <OnyxMillerItem
          label="Miller item"
          active={column === "active"}
          count={row === "count" ? 42 : undefined}
          dot={row === "dot"}
          arrow={row === "with-arrow"}
        />
      </ul>
    ),
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        const button = component.getByRole("button");

        await expect(button).toContainText("Miller item");

        if (row === "hover") {
          await button.hover();
        }

        if (row === "focus-visible") {
          await button.focus();
        }
      },
    },
  });
});

test("should render correctly with label and default state", async ({ mount }) => {
  // ARRANGE
  const label = "Item Label";

  // ACT
  const component = await mount(<OnyxMillerItem label={label} />);
  const button = component.getByRole("button", { name: label });

  // ASSERT
  await expect(button).toBeVisible();
  await expect(button).not.toHaveAttribute("aria-expanded");
  await expect(component.locator(".onyx-miller-item__arrow")).toBeHidden();
  await expect(component.locator(".onyx-miller-item__dot")).toBeHidden();
  await expect(component.locator(".onyx-miller-item__count")).toBeHidden();
});

test("should display count badge when prop is provided", async ({ mount }) => {
  // ARRANGE
  const label = "Category";
  const count = 25;

  // ACT
  const component = await mount(<OnyxMillerItem label={label} count={count} />);
  const countBadge = component.locator(".onyx-miller-item__count");

  // ASSERT
  await expect(countBadge).toBeVisible();
  await expect(countBadge).toHaveText("(25)");
});

test("should render status dot when dot prop is enabled", async ({ mount }) => {
  // ARRANGE
  const label = "Item with dot";
  const dotColor = "var(--onyx-color-base-danger-500)";

  // ACT
  const component = await mount(<OnyxMillerItem label={label} dot dotColor={dotColor} />);

  // ASSERT
  const dot = component.locator(".onyx-miller-item__dot");
  await expect(dot).toBeVisible();
});

test("should apply custom dot color and update dynamically", async ({ mount }) => {
  // ARRANGE
  const initialColor = "rgb(255, 0, 0)";
  const updatedColor = "rgb(122, 0, 120)";

  // ACT
  const component = await mount(
    <OnyxMillerItem label="Item with dot" dot dotColor={initialColor} />,
  );

  // ASSERT
  const dot = component.locator(".onyx-miller-item__dot");
  await expect(dot).toBeVisible();
  await expect(dot).toHaveCSS("background-color", initialColor);

  // ACT
  await component.update(<OnyxMillerItem label="Item with dot" dot dotColor={updatedColor} />);

  // ASSERT
  await expect(dot).toHaveCSS("background-color", updatedColor);
});

test("should allow overriding default content via slot", async ({ mount }) => {
  // ARRANGE
  const label = "Fallback Label";

  // ACT
  const component = await mount(
    <OnyxMillerItem label={label}>
      <span class="custom-slot-content">Custom Content</span>
    </OnyxMillerItem>,
  );

  // ASSERT
  const customContent = component.locator(".custom-slot-content");
  await expect(customContent).toBeVisible();
  await expect(customContent).toHaveText("Custom Content");
});
