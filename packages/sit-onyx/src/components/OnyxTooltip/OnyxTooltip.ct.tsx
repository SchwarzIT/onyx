import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import OnyxTooltip from "./OnyxTooltip.vue";
import TestWrapper from "./TestWrapper.ct.vue";

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
  const component = await mount(TestWrapper, {
    props: {
      text: "Test tooltip",
      open: "hover",
    },
  });

  const tooltip = component.getByRole("tooltip");

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
  const component = await mount(TestWrapper, {
    props: {
      text: "Test tooltip",
      open: "click",
    },
  });

  const tooltip = component.getByRole("status");

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
          position={row === "bottom" ? "bottom" : "top"}
          icon={row === "icon" ? mockPlaywrightIcon : undefined}
          fitParent={column === "fit-parent"}
          open={true}
          alignment="center"
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
    hooks: {
      // set component size to fully include the tooltip
      beforeEach: async (component, page, column, row) => {
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
    },
  });
});

test.describe("Alignment screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Aligned tooltip",
    columns: ["left", "center", "right"],
    rows: ["top", "bottom"],
    component: (column, row) => {
      return (
        <OnyxTooltip text="Test tooltip" position={row} open={true} alignment={column}>
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
    hooks: {
      // set component size to fully include the tooltip
      beforeEach: async (component, page, column, row) => {
        const tooltipSize = await component
          .getByRole("tooltip")
          .evaluate((element) => [element.clientHeight, element.clientWidth]);

        // set paddings to fit the full tooltip in the screenshot
        await component.evaluate(
          (element, { tooltipSize: [height, width], row }) => {
            const verticalPadding = `${height + 12}px`;

            if (row === "bottom") {
              element.style.paddingBottom = verticalPadding;
              element.style.marginTop = "0px";
            } else element.style.paddingTop = verticalPadding;

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
    },
  });
});

test.describe("Positioning Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Tooltip",
    columns: ["default"],
    rows: [
      "top",
      "top right",
      "right",
      "bottom right",
      "bottom",
      "bottom left",
      "left",
      "top left",
    ],
    component: (column, row) => {
      return (
        <OnyxTooltip
          text={"Test "}
          position={row}
          open={true}
          alignment="center"
          style={{ margin: "2rem 3rem" }}
        >
          <span
            style={{
              fontFamily: "var(--onyx-font-family)",
              color: "var(--onyx-color-text-icons-neutral-intense)",
            }}
          >
            Slot
          </span>
        </OnyxTooltip>
      );
    },
  });
});
