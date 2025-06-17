import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y";
import TestCase from "./TestCase.vue";

const getTestData = (length: number) =>
  Array.from({ length }, (_, index) => ({ id: index + 1, a: `A ${index + 1}` }));

const expectRowCount = async (dataGrid: Locator, count: number) => {
  await expect(dataGrid.getByRole("row")).toHaveCount(count + 1); // +1 = header row
};

test("should paginate rows", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(TestCase, {
    props: {
      data: getTestData(128),
      columns: ["a"],
    },
  });

  const pagination = component.getByLabel("Pagination");
  const paginationSelect = pagination.getByRole("textbox", { name: "Page selection" });
  const nextButton = pagination.getByRole("button", { name: "next page" });
  const previousButton = pagination.getByRole("button", { name: "previous page" });

  // ASSERT
  await expectRowCount(component, 25);
  await expect(component.getByRole("row", { name: "A 1", exact: true })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 25" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 26" })).toBeHidden();
  await expect(pagination).toContainText("of 6 pages");
  await expect(paginationSelect).toHaveValue("1");
  await expect(previousButton).toBeDisabled();

  // ACT
  await nextButton.click();

  // ASSERT
  await expectRowCount(component, 25);
  await expect(component.getByRole("row", { name: "A 25" })).toBeHidden();
  await expect(component.getByRole("row", { name: "A 26" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 50" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 51" })).toBeHidden();
  await expect(pagination).toContainText("of 6 pages");
  await expect(paginationSelect).toHaveValue("2");

  // ACT
  await paginationSelect.click();
  await page.getByRole("dialog", { name: "Available pages" }).getByText("6").click();

  // ASSERT
  await expectRowCount(component, 3);
  await expect(component.getByRole("row", { name: "A 126" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 128" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 129" })).toBeHidden();
  await expect(pagination).toContainText("of 6 pages");
  await expect(paginationSelect).toHaveValue("6");
  await expect(nextButton).toBeDisabled();

  // ACT
  await previousButton.click();

  // ASSERT
  await expectRowCount(component, 25);
  await expect(component.getByRole("row", { name: "A 100" })).toBeHidden();
  await expect(component.getByRole("row", { name: "A 101" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 125" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 126" })).toBeHidden();
  await expect(pagination).toContainText("of 6 pages");
  await expect(paginationSelect).toHaveValue("5");

  // ACT
  await component.update({ props: { data: getTestData(75) } });

  // ASSERT
  await expectRowCount(component, 25);
  await expect(component.getByRole("row", { name: "A 50" })).toBeHidden();
  await expect(component.getByRole("row", { name: "A 51" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 75" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 76" })).toBeHidden();
  await expect(pagination).toContainText("of 3 pages");
  await expect(
    paginationSelect,
    "should update current page when data is updated with less pages than previous selected page",
  ).toHaveValue("3");
});

test("should hide pagination when empty or only one page exists", async ({ mount }) => {
  // ARRANGE
  const component = await mount(TestCase, {
    props: {
      data: [],
      columns: ["a"],
    },
  });

  const pagination = component.getByLabel("Pagination");

  // ASSERT
  await expect(component).toHaveScreenshot("empty.png");
  await expect(component).toContainText("This table is empty.");
  await expect(pagination).toBeHidden();

  // ACT
  await component.update({ props: { skeleton: true } });

  // ASSERT
  await expect(component).toHaveScreenshot("empty-skeleton.png");
  await expect(pagination).toBeHidden();
  await expectRowCount(component, 5);
  await expect(
    component.locator(".onyx-pagination-skeleton"),
    "should show skeleton when data is empty",
  ).toBeVisible();

  // ACT
  await component.update({ props: { data: getTestData(25), skeleton: false } });

  // ASSERT
  await expect(component).toHaveScreenshot("one-page.png");
  await expectRowCount(component, 25);
  await expect(pagination).toBeHidden();

  // ACT
  await component.update({ props: { skeleton: true } });

  // ASSERT
  await expect(component).toHaveScreenshot("one-page-skeleton.png");
  await expect(pagination).toBeHidden();
  await expectRowCount(component, 25);
  await expect(
    component.locator(".onyx-pagination-skeleton"),
    "should show skeleton when only one page exists",
  ).toBeVisible();

  // ACT
  await component.update({ props: { data: getTestData(26), skeleton: false } });

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");
  await expectRowCount(component, 25);
  await expect(pagination).toBeVisible();
});
