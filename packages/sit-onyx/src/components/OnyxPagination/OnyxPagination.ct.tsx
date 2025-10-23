import { adjustSizeToAbsolutePosition } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxPagination from "./OnyxPagination.vue";
import type { PaginationType } from "./types.js";

test.describe("screenshot tests", () => {
  ["select", "inline"].forEach((type) => {
    executeMatrixScreenshotTest({
      name: `Pagination (${type})`,
      columns: DENSITIES,
      rows: [
        "default",
        "skeleton",
        "min",
        "max",
        "large",
        "disabled",
        type === "select" ? "open" : "middle",
      ],
      component: (column, row) => {
        let currentPage = 2;
        let pages = 7;

        if (row === "min") currentPage = 1;
        else if (row === "max") currentPage = pages;
        else if (row === "middle") currentPage = 4;
        else if (row === "large") {
          currentPage = 1_000;
          pages = currentPage;
        }

        return (
          <OnyxPagination
            pages={pages}
            modelValue={currentPage}
            density={column}
            disabled={row === "disabled"}
            skeleton={row === "skeleton"}
            style={{ marginBottom: row === "open" ? "20rem" : undefined }}
            type={type as PaginationType}
          />
        );
      },
      hooks: {
        beforeEach: async (component, page, column, row) => {
          if (row === "open") {
            await component.getByLabel("Page selection").click();
            await adjustSizeToAbsolutePosition(component);
          }
        },
      },
    });
  });
});

test.describe("screenshot tests (buttons)", () => {
  ["select", "inline"].forEach((type) => {
    executeMatrixScreenshotTest({
      name: `Pagination ${type} (buttons)`,
      columns: [
        ...(type === "select" ? ["select"] : ["pageNumber", "activePageNumber"]),
        "previous",
        "next",
      ],
      rows: ["default", "hover", "active", "focus-visible"],
      component: () => <OnyxPagination pages={42} modelValue={2} type={type as PaginationType} />,
      hooks: {
        beforeEach: async (component, page, column, row) => {
          let button = page.getByRole("button", {
            name: column === "previous" ? "previous page" : "next page",
          });

          if (column === "select") button = component.getByLabel("Page selection");
          if (column === "pageNumber") {
            button = component.getByRole("button", { name: "Page 1" });
          }
          if (column === "activePageNumber") {
            button = component.getByRole("button", { name: "Page 2" });
          }

          if (row === "hover") await button.hover();
          if (row === "focus-visible") {
            await page.keyboard.press("Tab");
            button.focus();
          }
          if (row === "active") {
            const box = (await button.boundingBox())!;
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
          }
        },
      },
    });
  });
});

test("should select page (select)", async ({ mount }) => {
  // ARRANGE
  let currentPage = 1;

  const eventHandlers = {
    "update:modelValue": async (newPage: number) => {
      currentPage = newPage;
      await component.update({ props: { modelValue: currentPage }, on: eventHandlers });
    },
  };

  const component = await mount(OnyxPagination, {
    props: {
      pages: 42,
      modelValue: currentPage,
    },
    on: eventHandlers,
  });

  const select = component.getByLabel("Page selection");
  const previousButton = component.getByRole("button", { name: "previous page" });
  const nextButton = component.getByRole("button", { name: "next page" });

  // ASSERT
  await expect(select).toHaveValue("1");
  await expect(
    previousButton,
    "should disable previous button if min page is reached",
  ).toBeDisabled();
  await expect(nextButton).toBeEnabled();

  // ACT
  await select.click();
  await component.getByLabel("Available pages").getByLabel("2", { exact: true }).click();

  // ASSERT
  expect(currentPage).toBe(2);
  await expect(select).toHaveValue("2");

  // ACT
  await nextButton.click();

  // ASSERT
  expect(currentPage).toBe(3);
  await expect(select).toHaveValue("3");

  // ACT
  await previousButton.click();

  // ASSERT
  expect(currentPage).toBe(2);
  await expect(select).toHaveValue("2");

  // ACT
  await select.click();
  await component.getByLabel("Available pages").getByLabel("42", { exact: true }).click();

  // ASSERT
  expect(currentPage).toBe(42);
  await expect(select).toHaveValue("42");
  await expect(nextButton, "should disable next button if last page is reached").toBeDisabled();
  await expect(previousButton).toBeEnabled();
});

test("should select page (inline)", async ({ mount }) => {
  // ARRANGE
  let currentPage = 1;

  const eventHandlers = {
    "update:modelValue": async (newPage: number) => {
      currentPage = newPage;
      await component.update({ props: { modelValue: currentPage }, on: eventHandlers });
    },
  };

  const component = await mount(OnyxPagination, {
    props: {
      pages: 42,
      modelValue: currentPage,
      type: "inline",
    },
    on: eventHandlers,
  });

  const previousButton = component.getByRole("button", { name: "previous page" });
  const nextButton = component.getByRole("button", { name: "next page" });

  // ASSERT
  await expect(
    previousButton,
    "should disable previous button if min page is reached",
  ).toBeDisabled();
  await expect(nextButton).toBeEnabled();

  // ASSERT
  await component.getByRole("button", { name: "Page 2" }).click();
  expect(currentPage).toBe(2);

  // ACT
  await nextButton.click();

  // ASSERT
  expect(currentPage).toBe(3);

  // ACT
  await previousButton.click();

  // ASSERT
  expect(currentPage).toBe(2);

  // ACT
  await component.getByRole("button", { name: "Page 42" }).click();

  // ASSERT
  expect(currentPage).toBe(42);
  await expect(nextButton, "should disable next button if last page is reached").toBeDisabled();
  await expect(previousButton).toBeEnabled();
});

test("should disable controls", async ({ mount }) => {
  const component = await mount(<OnyxPagination modelValue={2} pages={42} disabled />);

  await expect(component.getByLabel("Page selection")).toBeDisabled();
  await expect(component.getByLabel("previous page")).toBeDisabled();
  await expect(component.getByLabel("next page")).toBeDisabled();
});

test("should lazy load options", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxPagination, {
    props: {
      modelValue: 1,
      pages: 100_000,
    },
  });

  const select = component.getByLabel("Page selection");
  const search = component.getByRole("combobox", { name: "Filter the list items" });

  // ACT
  await select.click();

  // ASSERT
  await expect(component.getByRole("option")).toHaveCount(100);

  // ACT
  await component.getByRole("option", { name: "100" }).scrollIntoViewIfNeeded();

  // ASSERT
  await expect(component.getByRole("option")).toHaveCount(200);

  // ACT
  await search.fill("1000");

  // ASSERT
  await expect(component.getByRole("option", { name: "1000", exact: true })).toBeVisible();
  await expect(component.getByRole("option", { name: "21000", exact: true })).toBeVisible();

  // ACT
  await search.fill("");
  await component.update({ props: { pages: 10 } });

  await component.getByRole("option", { name: "10" }).scrollIntoViewIfNeeded();

  // ASSERT
  await expect(component.getByRole("option")).toHaveCount(10);
});
