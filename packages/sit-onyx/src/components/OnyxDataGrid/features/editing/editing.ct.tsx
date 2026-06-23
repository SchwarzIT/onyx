import { expect, test } from "../../../../playwright/a11y.js";
import TestCaseCt from "./TestCase.ct.vue";

test.describe("DataGrid Editing", () => {
  test("should render data grid and open the link editor popover", async ({ mount }) => {
    // Arrange
    const component = await mount(
      <TestCaseCt
        style={{ paddingBottom: "15rem", width: "24rem" }}
        columns={[
          { key: "id", label: "ID", width: "min-content" },
          { key: "link", label: "link", type: "link" },
        ]}
        data={[
          {
            id: 1,
            link: { href: "https://example.com", label: "link label" },
          },
          {
            id: 2,
            link: "https://example.com/2",
          },
        ]}
      />,
    );

    const firstRow = component.getByRole("row").nth(1);
    const editButton = firstRow.getByRole("button", { name: "Edit link" });
    const dialog = component.getByRole("dialog", { name: "Edit link" });
    const linkInput = dialog.getByLabel("Link");
    const labelInput = dialog.getByLabel("Text");
    const applyButton = dialog.getByRole("button", { name: "Apply" });

    // ASSERT
    await expect(firstRow).toContainText("-");
    await expect(component).toBeVisible();
    await expect(dialog).toBeHidden();

    // ACT
    await editButton.click();

    // ASSERT
    await expect(dialog).toBeVisible();
    await expect(component).toHaveScreenshot("link-editor-popover.png");

    // ACT
    await linkInput.fill("https://example.com");
    await labelInput.fill("new label");
    await applyButton.click();

    // ASSERT
    await expect(firstRow).toContainText("new label");

    // ACT
    await editButton.click();
    await labelInput.clear();
    await applyButton.click();

    // ASSERT
    await expect(firstRow).not.toContainText("new label");
    await expect(firstRow).toContainText("https://example.com");

    // ACT
    await editButton.click();
    await linkInput.clear();
    await applyButton.click();

    // ASSERT
    await expect(firstRow).not.toContainText("new label");
    await expect(firstRow).not.toContainText("https://example.com");
    await expect(firstRow).toContainText("-");
  });
});
