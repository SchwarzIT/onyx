import { adjustSizeToAbsolutePosition } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxPagination from "./OnyxPagination.vue";

test.describe("screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Pagination",
    columns: DENSITIES,
    rows: ["default", "skeleton", "min", "max", "large", "disabled", "open"],
    component: (column, row) => {
      let currentPage = 2;
      let pages = 6;

      if (row === "min") currentPage = 1;
      else if (row === "max") currentPage = pages;
      else if (row === "large") {
        currentPage = 10000;
        pages = currentPage;
      }

      return (
        <OnyxPagination
          pages={pages}
          modelValue={currentPage}
          density={column}
          disabled={row === "disabled"}
          skeleton={row === "skeleton"}
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

test.describe("screenshot tests (buttons)", () => {
  executeMatrixScreenshotTest({
    name: "Pagination (buttons)",
    columns: ["select", "previous", "next"],
    rows: ["default", "hover", "active", "focus-visible"],
    component: () => <OnyxPagination pages={42} modelValue={2} />,
    hooks: {
      beforeEach: async (component, page, column, row) => {
        let button = page.getByRole("button", {
          name: column === "previous" ? "previous page" : "next page",
        });

        if (column === "select") button = component.getByLabel("Page selection");

        if (row === "hover") await button.hover();
        if (row === "focus-visible") {
          // await page.keyboard.press("Tab");
          await component.getByLabel("Page selection").focus();
          if (column !== "select") await page.keyboard.press("Tab");
          if (column === "next") await page.keyboard.press("Tab");
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

test("should select page", async ({ mount }) => {
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

test("should disable controls", async ({ mount }) => {
  const component = await mount(<OnyxPagination modelValue={2} pages={42} disabled />);

  await expect(component.getByLabel("Page selection")).toBeDisabled();
  await expect(component.getByLabel("previous page")).toBeDisabled();
  await expect(component.getByLabel("next page")).toBeDisabled();
});
