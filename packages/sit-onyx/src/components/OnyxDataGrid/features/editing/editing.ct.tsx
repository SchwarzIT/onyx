import { expect, test } from "../../../../playwright/a11y.js";
import TestCaseCt from "./TestCase.ct.vue";

test.describe("DataGrid Editing", () => {
  test("should render data grid and open the link editor popover", async ({ mount }) => {
    // Arrange
    const component = await mount(
      <TestCaseCt
        style={{ paddingBottom: "10rem", width: "24rem" }}
        columns={[
          { key: "id", label: "ID", width: "min-content" },
          { key: "link", label: "link", type: "link" },
        ]}
        data={[
          {
            id: 1,
            link: { link: "https://example.com", label: "link label" },
          },
          {
            id: 2,
            link: "https://example.com/2",
          },
        ]}
      />,
    );

    const websiteCell = component.getByRole("button", { name: "link label" });
    const popover = component
      .getByRole("dialog")
      .getByText("Display labelClear inputLinkClear input");
    const linkInput = component.getByRole("textbox", { name: "Link" });
    const labelInput = component.getByRole("textbox", { name: "Display label" });

    // Assert
    await expect(component).toBeVisible();
    await expect(popover).toBeHidden();

    // Act
    await websiteCell.click();

    // Assert
    await expect(popover).toBeVisible();
    await expect(component).toHaveScreenshot("link-editor-popover.png");

    // Act
    await linkInput.fill("https://new-example.com");
    await labelInput.fill("new label");

    // Assert
    await expect(linkInput).toHaveValue("https://new-example.com");
    await expect(labelInput).toHaveValue("new label");
  });
});
