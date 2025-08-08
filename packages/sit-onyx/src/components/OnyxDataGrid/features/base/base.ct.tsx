import type { Locator } from "@playwright/test";
import { expect, test } from "../../../../playwright/a11y.js";
import TestWrapper from "./TestWrapper.ct.vue";

const getTestData = (length: number) =>
  Array.from({ length }, (_, index) => {
    const id = index + 1;
    return { id, a: `A${id}`, b: `B${id}` };
  });

const expectRowCount = async (dataGrid: Locator, count: number, message?: string) => {
  await expect(dataGrid.getByRole("row"), message).toHaveCount(count + 1); // +1 = header row
};

test("should show headline", async ({ mount }) => {
  // ARRANGE
  const component = await mount(TestWrapper, {
    props: {
      columns: ["a", "b"],
      data: getTestData(4),
    },
  });

  // ASSERT
  await expect(component.getByRole("heading")).toBeHidden();

  // ACT
  await component.update({ props: { headline: "Example headline" } });

  // ASSERT
  await expect(
    component.getByRole("heading", { name: "Example headline", level: 3 }),
    "should render simple string headline",
  ).toBeVisible();

  await expect(component).toHaveScreenshot("headline.png");

  // ACT
  await component.update({
    props: {
      headline: {
        text: "Advanced headline",
        rowCount: true,
        is: "h2",
        showAs: "h3",
      },
    },
  });

  // ASSERT
  await expect(
    component.getByRole("heading", { name: "Advanced headline (4)", level: 2 }),
    "should render custom headline",
  ).toBeVisible();

  await expect(component).toHaveScreenshot("advanced.png");

  // ACT
  await component.update({
    props: {
      headline: {
        text: "Advanced headline",
        rowCount: 42,
      },
    },
  });

  // ASSERT
  await expect(
    component.getByRole("heading", { name: "Advanced headline (42)", level: 3 }),
    "should show custom rowCount",
  ).toBeVisible();
});

test("should headline row count correctly when used with pagination and filtering", async ({
  mount,
  page,
}) => {
  // ARRANGE
  const component = await mount(TestWrapper, {
    props: {
      columns: ["a", "b"],
      data: getTestData(128),
      headline: {
        text: "Example headline",
        rowCount: true,
      },
      enabledFeatures: ["pagination", "filtering"],
    },
  });

  // ASSERT
  await expect(
    component.getByRole("heading", { name: "Example headline (128)", level: 3 }),
    "should show total row count when pagination is enabled",
  ).toBeVisible();

  // ACT
  await component
    .getByRole("columnheader", { name: "a Toggle column actions" })
    .getByLabel("Toggle column actions")
    .click();

  await component.getByRole("textbox", { name: "Search column a" }).fill("A4");
  await component.press("Enter");
  await page.getByRole("document").hover({ position: { x: 0, y: 0 } }); // reset hover

  // ASSERT
  await expect(
    component.getByRole("heading", { name: "Example headline (128)", level: 3 }),
    "should show total row count when filter is active",
  ).toBeVisible();

  await expect(component).toHaveScreenshot("headline-filtered.png");
});

test("should show skeleton", async ({ mount }) => {
  // ARRANGE
  const component = await mount(TestWrapper, {
    props: {
      columns: ["a", "b"],
      data: [],
      skeleton: true,
    },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("skeleton.png");
  await expectRowCount(component, 5, "should show 5 skeleton rows if no data exists");

  // ACT
  await component.update({ props: { data: getTestData(8) } });

  // ASSERT
  await expectRowCount(
    component,
    8,
    "skeleton row count should match actual data count if it exists",
  );
});

test("should render boolean column type", async ({ mount }) => {
  // ARRANGE
  const component = await mount(TestWrapper, {
    props: {
      style: "width: 12rem",
      columns: [{ key: "a", label: "Column A", type: "boolean" }],
      data: [
        { id: 1, a: true },
        { id: 1, a: false },
      ],
    },
  });

  // ASSERT
  await expect(component).toHaveScreenshot("boolean.png");

  await expect(
    component.getByRole("cell").first(),
    "should include visually hidden label",
  ).toHaveText("Yes");

  await expect(
    component.getByRole("cell").nth(1),
    "should include visually hidden label",
  ).toHaveText("No");
});
