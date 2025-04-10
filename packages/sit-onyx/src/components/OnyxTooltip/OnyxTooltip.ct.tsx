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
        <div
          class="container"
          style={{
            marginTop: row !== "bottom" ? "5rem" : undefined,
            marginBottom: row === "bottom" ? "5rem" : undefined,
            marginLeft: column === "long-text" ? "5rem" : undefined,
            marginRight: column === "long-text" ? "5rem" : undefined,
          }}
        >
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
        </div>
      );
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
        <div
          class="container"
          style={{
            marginTop: row === "top" ? "2rem" : undefined,
            marginBottom: row === "bottom" ? "2rem" : undefined,
          }}
        >
          <OnyxTooltip
            text="Test tooltip"
            position={row}
            open={true}
            alignment={column}
            style={{ marginTop: "1rem" }}
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
        </div>
      );
    },
  });
});

test.describe("Positioning Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Positioned Tooltip",
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
