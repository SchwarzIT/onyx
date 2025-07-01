import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y";
import AsyncTestCase from "./AsyncTestCase.ct.vue";
import TestCase from "./TestCase.ct.vue";

const getTestData = (length: number) =>
  Array.from({ length }, (_, index) => ({ id: index + 1, a: `A ${index + 1}` }));

const expectRowCount = async (dataGrid: Locator, count: number, message?: string) => {
  await expect(dataGrid.getByRole("row"), message).toHaveCount(count + 1); // +1 = header row
};

test("should paginate rows", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(TestCase, {
    props: {
      data: getTestData(128),
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

// eslint-disable-next-line playwright/expect-expect -- expects are done in external functions
test("should handle lazy loading", async ({ mount }) => {
  // ARRANGE
  const component = await mount(TestCase, {
    props: {
      style: { maxHeight: "24rem" },
      data: getTestData(52),
      paginationOptions: {
        type: "lazy",
      },
    },
  });

  // ASSERT
  await expectRowCount(component, 25);

  // ACT
  await scrollToRow(component, 24);

  // ASSERT
  await expectRowCount(component, 25, "scrolling to 2nth last row should not trigger lazy loading");

  // ACT
  await scrollToRow(component, 25);

  // ASSERT
  await expectRowCount(component, 50, "scrolling to last row should trigger lazy loading");

  // ACT
  await scrollToRow(component, 50);

  // ASSERT
  await expectRowCount(component, 52, "scrolling to last row should trigger lazy loading");

  // ACT
  await scrollToRow(component, 52);

  // ASSERT
  await expectRowCount(component, 52, "should disable lazy loading when last page is reached");
});

test("should handle lazy loading (async)", async ({ mount }) => {
  // ARRANGE
  const component = await mount(AsyncTestCase, {
    props: {
      style: { maxHeight: "24rem" },
      data: getTestData(25),
      paginationOptions: {
        type: "lazy",
      },
    },
  });

  const loadingIndicator = component.locator(".onyx-loading-dots");

  // ASSERT
  await expect(component.getByRole("row", { name: "A 25" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 26" })).toBeHidden();

  // ACT
  await scrollToRow(component, 24);

  // ASSERT
  await expect(component.getByRole("row", { name: "A 25" })).toBeVisible();
  await expect(
    component.getByRole("row", { name: "A 26" }),
    "scrolling to 2nth last row should not trigger lazy loading",
  ).toBeHidden();

  // ACT
  await scrollToRow(component, 25);
  await component.update({ props: { loading: true } });

  // ASSERT
  await expect(loadingIndicator).toBeVisible();
  await loadingIndicator.scrollIntoViewIfNeeded();
  await expect(component).toHaveScreenshot("lazy-loading.png");

  // ACT
  await component.update({ props: { loading: false, data: getTestData(50) } });

  // ASSERT
  await expect(loadingIndicator).toBeHidden();
  await expect(component.getByRole("row", { name: "A 25" })).toBeVisible();
  await expect(
    component.getByRole("row", { name: "A 50" }),
    "scrolling to last row should trigger lazy loading",
  ).toBeVisible();

  // ACT
  await scrollToRow(component, 50);
  await component.update({ props: { data: getTestData(52) } });

  // ASSERT
  await expect(component.getByRole("row", { name: "A 25" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 50" })).toBeVisible();
  await expect(
    component.getByRole("row", { name: "A 52" }),
    "scrolling to last row should trigger lazy loading",
  ).toBeVisible();
});

test("should handle button loading", async ({ mount }) => {
  // ARRANGE
  const component = await mount(TestCase, {
    props: {
      style: { maxHeight: "24rem" },
      data: getTestData(52),
      paginationOptions: {
        type: "button",
      },
    },
  });

  const button = component.getByRole("button", { name: "Load more" });

  // ACT
  await button.scrollIntoViewIfNeeded();

  // ASSERT
  await expect(component.getByRole("row", { name: "A 25" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 26" })).toBeHidden();

  // ACT
  await button.click();

  // ASSERT
  await expect(component.getByRole("row", { name: "A 25" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 50" })).toBeVisible();

  // ACT
  await button.click();

  // ASSERT
  await expect(component.getByRole("row", { name: "A 25" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 50" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 52" })).toBeVisible();
  await expect(button, "should hide button when last page is reached").toBeHidden();
});

test("should handle button loading (async)", async ({ page, mount }) => {
  // ARRANGE
  const component = await mount(AsyncTestCase, {
    props: {
      style: { maxHeight: "24rem" },
      data: getTestData(25),
      paginationOptions: {
        type: "button",
      },
    },
  });

  const button = component.getByRole("button", { name: "Load more" });
  const loadingIndicator = component.locator(".onyx-loading-dots");

  // ACT
  await button.scrollIntoViewIfNeeded();

  // ASSERT
  await expect(component).toHaveScreenshot("button.png");
  await expect(component.getByRole("row", { name: "A 25" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 26" })).toBeHidden();

  // ACT
  await button.click();
  await component.update({ props: { loading: true } });

  // ASSERT
  await expect(loadingIndicator).toBeVisible();
  await page.getByRole("document").hover(); // reset mouse hover
  await expect(component).toHaveScreenshot("button-loading.png");

  // ACT
  await component.update({ props: { loading: false, data: getTestData(50) } });

  // ASSERT
  await expect(loadingIndicator).toBeHidden();
  await expect(component.getByRole("row", { name: "A 25" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 50" })).toBeVisible();

  // ACT
  await button.click();
  await component.update({ props: { loading: true } });

  // ASSERT
  await expect(
    loadingIndicator,
    "should show loading indicator if last page is reached",
  ).toBeVisible();

  // ACT
  await component.update({ props: { data: getTestData(52), loading: false } });

  // ASSERT
  await expect(component.getByRole("row", { name: "A 25" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 50" })).toBeVisible();
  await expect(component.getByRole("row", { name: "A 52" })).toBeVisible();
  await expect(button, "should hide button when last page is reached").toBeHidden();
  await expect(loadingIndicator).toBeHidden();
});

test("should work correctly when filtering is enabled", async ({ mount }) => {
  // ARRANGE
  const component = await mount(TestCase, {
    props: {
      data: getTestData(128),
      enabledFeatures: ["filtering"],
    },
  });

  const pagination = component.getByLabel("Pagination");

  // ASSERT
  await expect(pagination).toContainText("of 6 pages");

  // ACT
  await component
    .getByRole("columnheader", { name: "a Toggle column actions" })
    .getByLabel("Toggle column actions")
    .click();

  await component.getByRole("textbox", { name: "Search column a" }).fill("A 1");
  await component.press("Enter");

  // ASSERT
  await expect(pagination).toContainText("of 2 pages");
});

// TODO: CHECK
test("should work correctly when selection is enabled", async ({ mount }) => {
  // ARRANGE
  const component = await mount(TestCase, {
    props: {
      data: getTestData(4),
      enabledFeatures: ["selection"],
      paginationOptions: {
        type: "button",
        pageSize: 2,
      },
    },
  });

  const checkAll = component.getByRole("checkbox", { name: "Select all rows" });

  // ACT
  await component.getByRole("checkbox", { name: "Add row with ID '1' to the selection" }).click();
  await component.getByRole("checkbox", { name: "Add row with ID '2' to the selection" }).click();

  // ASSERT
  await expect(
    checkAll,
    "should consider all rows as checked correctly when button pagination row exists",
  ).toHaveJSProperty("indeterminate", true);

  await expect(checkAll).not.toBeChecked();

  // ACT
  await component.getByRole("button", { name: "Load more" }).click();
  await component.getByRole("checkbox", { name: "Add row with ID '3' to the selection" }).click();
  await component.getByRole("checkbox", { name: "Add row with ID '4' to the selection" }).click();

  // ASSERT
  await expect(checkAll).toBeChecked();
});

function scrollToRow(component: Locator, number: number) {
  return component.evaluate((element, index) => {
    Array.from(element.querySelectorAll("tr"))
      .at(index)
      ?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, number);
}
