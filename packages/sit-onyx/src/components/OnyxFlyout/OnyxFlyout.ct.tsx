import { expect, test } from "../../playwright/a11y";
import OnyxFlyoutTestCase from "./OnyxFlyoutTestCase.vue";

test.describe("OnyxFlyout", () => {
  test("should open and close on trigger click", async ({ mount }) => {
    const component = await mount(OnyxFlyoutTestCase, {
      props: { label: "Flyout for testing" },
    });

    const flyout = component.getByText("Flyout Content");
    const button = component.getByRole("button", { name: "Open" });

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
        expanded: true,
      },
    });

    const flyout = component.getByText("Flyout Content");
    const changeButton = component.getByRole("button", { name: "Change Expanded" });

    // ASSERT
    await expect(flyout).toBeHidden();

    // ACT
    await changeButton.click();

    // ASSERT
    await expect(flyout).toBeVisible();
  });
});
