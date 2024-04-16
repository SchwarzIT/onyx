import { expect, test } from "../../playwright-axe";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { mockPlaywrightIcon } from "../../utils/playwright";
import OnyxTooltip from "./OnyxTooltip.vue";

test("should trigger with boolean", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxTooltip, {
    props: {
      text: "Test tooltip",
      open: false,
    },
  });

  const tooltip = component.getByRole("tooltip");

  // ASSERT
  await expect(tooltip).toBeHidden();

  // ACT
  await component.update({ props: { open: true } });

  // ASSERT
  await expect(tooltip).toBeVisible();
});

test("should trigger with hover", async ({ mount, page }) => {
  // ARRANGE
  let component = await mount(OnyxTooltip, {
    props: {
      text: "Test tooltip",
    },
    slots: {
      default: "Slot content",
    },
  });

  let tooltip = component.getByRole("tooltip");

  // ASSERT
  await expect(tooltip).toBeHidden();

  // ACT
  await component.hover();

  // ASSERT
  await expect(tooltip).toBeHidden(); // should use debounce to show tooltip only after a short delay
  await expect(tooltip).toBeVisible();

  await page.mouse.move(0, 0);
  await expect(tooltip).toBeVisible(); // should use debounce to hide tooltip only after a short delay
  await expect(tooltip).toBeHidden();

  // ACT
  await component.unmount();
  component = await mount(
    <OnyxTooltip text="Test tooltip">
      <span tabindex="0">Slot content</span>
    </OnyxTooltip>,
  );
  tooltip = component.getByRole("tooltip");

  await page.keyboard.press("Tab");

  // ASSERT
  await expect(tooltip).toBeVisible();

  // ACT
  await page.keyboard.press("Escape");

  // ASSERT
  await expect(tooltip).toBeHidden();
});

test("should trigger with click", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(OnyxTooltip, {
    props: {
      text: "Test tooltip",
      open: "click",
    },
    slots: {
      default: "Slot content",
    },
  });

  const tooltip = component.getByRole("tooltip");

  // ASSERT
  await expect(tooltip).toBeHidden();

  // ACT
  await component.click();

  // ASSERT
  await expect(tooltip).toBeVisible();

  // ACT
  await page.keyboard.press("Escape");

  // ASSERT
  await expect(tooltip).toBeHidden();
});

test("should render custom tooltip content", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxTooltip, {
    props: {
      text: "Test tooltip",
      open: true,
    },
  });

  const tooltip = component.getByRole("tooltip");

  // ASSERT
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toContainText("Test tooltip");

  // ACT
  await component.update({
    slots: {
      tooltip: "Custom slot content",
    },
  });

  await expect(tooltip).not.toContainText("Test tooltip");
  await expect(tooltip).toContainText("Custom slot content");
});

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Tooltip",
    columns: ["default", "fit-parent", "long-text"],
    rows: ["default", "bottom", "icon", "danger"],
    component: (column, row) => {
      return (
        <OnyxTooltip
          text={column === "long-text" ? "Lorem ipsum dolor sit amet ".repeat(3) : "Test tooltip"}
          color={row === "danger" ? "danger" : undefined}
          position={row === "bottom" ? "bottom" : undefined}
          icon={row === "icon" ? mockPlaywrightIcon : undefined}
          fitParent={column === "fit-parent"}
          open={true}
        >
          <span
            style={{
              fontFamily: "var(--onyx-font-family)",
              color: "var(--onyx-color-text-icons-neutral-intense)",
            }}
          >
            Here goes the slot content
          </span>
        </OnyxTooltip>
      );
    },
    // set component size to fully include the tooltip
    beforeScreenshot: async (component, page, column, row) => {
      const tooltipSize = await component
        .getByRole("tooltip")
        .evaluate((element) => [element.clientHeight, element.clientWidth]);

      // set paddings to fit the full tooltip in the screenshot
      await component.evaluate(
        (element, { tooltipSize: [height, width], row }) => {
          const verticalPadding = `${height + 12}px`;

          if (row === "bottom") element.style.paddingBottom = verticalPadding;
          else element.style.paddingTop = verticalPadding;

          const widthDiff = width - element.clientWidth;
          if (widthDiff > 0) {
            const padding = `${widthDiff / 2 + 20}px`;
            element.style.paddingLeft = padding;
            element.style.paddingRight = padding;
          }
        },
        { tooltipSize, row },
      );
    },
  });
});
