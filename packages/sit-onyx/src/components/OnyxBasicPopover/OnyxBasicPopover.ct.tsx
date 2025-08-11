import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.jsx";
import OnyxBasicPopoverTestCase from "./OnyxBasicPopoverTestCase.vue";

test.describe("OnyxBasicPopover", () => {
  test("should open and close on trigger click", async ({ mount }) => {
    const component = await mount(OnyxBasicPopoverTestCase, {
      props: { label: "Popover for testing" },
    });

    const popover = component.getByText("Popover Content");
    const button = component.getByRole("button", { name: "button" });

    // ASSERT
    await expect(popover).toBeHidden();

    // ACT
    button.click();

    // ASSERT
    await expect(popover).toBeVisible();

    // ACT
    button.click();

    // ASSERT
    await expect(popover).toBeHidden();
  });

  test("should show when expanded is set to true and hide when false", async ({ mount }) => {
    const component = await mount(OnyxBasicPopoverTestCase, {
      props: {
        label: "Popover for testing",
        open: true,
        showExpandedButton: true,
      },
    });

    const popover = component.getByText("Popover Content");
    const changeButton = component.getByRole("button", { name: "changeExpandedButton" });

    // ASSERT
    await expect(popover).toBeVisible();
    // ACT
    await changeButton.click();
    // ASSERT
    await expect(popover).toBeHidden();
  });
});
test.describe("OnyxBasicPopover  Screenshot Tests", () => {
  test.describe("Alignment screenshot tests", () => {
    executeMatrixScreenshotTest({
      name: "Aligned Popover",
      columns: ["left", "center", "right"],
      rows: ["top", "bottom"],
      component: (column, row) => {
        return (
          <div
            class="container"
            style={{
              margin: "0 1rem",
              marginTop: row === "top" ? "2rem" : undefined,
              marginBottom: row === "bottom" ? "2rem" : undefined,
            }}
          >
            <OnyxBasicPopoverTestCase label="test" open={true} alignment={column} position={row} />
          </div>
        );
      },
    });
  });

  test.describe("Positioning Screenshot tests", () => {
    executeMatrixScreenshotTest({
      name: "Positioned Popover",
      columns: ["default", "disabled"],
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
          <div class="container" style={{ margin: "2rem 6rem" }}>
            <OnyxBasicPopoverTestCase
              label="test"
              open={true}
              position={row}
              alignment="center"
              disabled={column === "disabled"}
            />
          </div>
        );
      },
    });
  });
});
