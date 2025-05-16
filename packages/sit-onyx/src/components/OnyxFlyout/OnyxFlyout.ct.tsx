import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxFlyoutTestCase from "./OnyxFlyoutTestCase.vue";

test.describe("OnyxFlyout", () => {
  test("should open and close on trigger click", async ({ mount }) => {
    const component = await mount(OnyxFlyoutTestCase, {
      props: { label: "Flyout for testing" },
    });

    const flyout = component.getByText("Flyout Content");
    const button = component.getByRole("button", { name: "button" });

    // ASSERT
    await expect(flyout).toBeHidden();

    // ACT
    button.click();

    // ASSERT
    await expect(flyout).toBeVisible();

    // ACT
    button.click();

    // ASSERT
    await expect(flyout).toBeHidden();
  });

  test("should show when expanded is set to true and hide when false", async ({ mount }) => {
    const component = await mount(OnyxFlyoutTestCase, {
      props: {
        label: "Flyout for testing",
        open: true,
        showExpandedButton: true,
      },
    });

    const flyout = component.getByText("Flyout Content");
    const changeButton = component.getByRole("button", { name: "changeExpandedButton" });

    // ASSERT
    await expect(flyout).toBeVisible();
    // ACT
    await changeButton.click();
    // ASSERT
    await expect(flyout).toBeHidden();
  });
});
test.describe("OnyxFlyout Screenshot Tests", () => {
  test.describe("Alignment screenshot tests", () => {
    executeMatrixScreenshotTest({
      name: "Aligned Flyout",
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
            <OnyxFlyoutTestCase label="test" open={true} alignment={column} position={row} />
          </div>
        );
      },
    });
  });

  test.describe("Positioning Screenshot tests", () => {
    executeMatrixScreenshotTest({
      name: "Positioned Flyout",
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
            <OnyxFlyoutTestCase
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
