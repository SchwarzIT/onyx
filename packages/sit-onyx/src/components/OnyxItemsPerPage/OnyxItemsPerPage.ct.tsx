import { DENSITIES } from "../../composables/density.js";
import enUs from "../../i18n/locales/en-US.json" with { type: "json" };
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxItemsPerPage from "./OnyxItemsPerPage.vue";

const PER_PAGE_OPTIONS = [5, 10, 20, 30, 40, 75];

test.describe("screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "ItemsPerPage",
    columns: DENSITIES,
    rows: ["default", "custom-label", "hideLabel", "skeleton", "disabled", "open"],
    component: (column, row) => (
      <OnyxItemsPerPage
        modelValue={10}
        density={column}
        options={PER_PAGE_OPTIONS}
        hideLabel={row === "hideLabel"}
        skeleton={row === "skeleton"}
        disabled={row === "disabled"}
        style={{ marginBottom: row === "open" ? "20rem" : undefined }}
      />
    ),
    hooks: {
      beforeEach: async (component, _page, _column, row) => {
        if (row === "open") {
          await component.getByRole("textbox", { name: enUs.itemsPerPage.label }).click();
        }
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "ItemsPerPage (label alignment)",
    columns: ["left", "right"],
    rows: DENSITIES,
    component: (column, row) => (
      <OnyxItemsPerPage
        modelValue={10}
        options={PER_PAGE_OPTIONS}
        density={row}
        labelAlignment={column}
      />
    ),
  });
});

test.describe("screenshot tests (states)", () => {
  executeMatrixScreenshotTest({
    name: "ItemsPerPage (button states)",
    columns: ["select"],
    rows: ["default", "hover", "focus-visible", "active"],
    component: () => <OnyxItemsPerPage options={PER_PAGE_OPTIONS} modelValue={10} />,
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        const button = component.getByRole("textbox", { name: enUs.itemsPerPage.label });

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

test("should select items per page", async ({ mount }) => {
  // ARRANGE
  let modelValue = 10;

  const eventHandlers = {
    "update:modelValue": async (newValue: number) => {
      modelValue = newValue;
      await component.update({ props: { modelValue }, on: eventHandlers });
    },
  };

  const component = await mount(OnyxItemsPerPage, {
    props: {
      modelValue,
      options: [5, 10, 20, 50],
    },
    on: eventHandlers,
  });

  const select = component.getByRole("textbox", { name: enUs.itemsPerPage.label });

  // ASSERT
  await expect(select).toHaveValue("10");

  // ACT
  await select.click();
  await component.getByRole("option", { name: "20", exact: true }).click();

  // ASSERT
  expect(modelValue).toBe(20);
  await expect(select).toHaveValue("20");

  // ACT
  await select.click();
  await component.getByRole("option", { name: "5", exact: true }).click();

  // ASSERT
  expect(modelValue).toBe(5);
  await expect(select).toHaveValue("5");
});

test("should disable select when disabled prop is true", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxItemsPerPage, {
    props: {
      modelValue: 10,
      disabled: true,
      options: PER_PAGE_OPTIONS,
    },
  });

  const select = component.getByRole("textbox", { name: enUs.itemsPerPage.label });

  // ASSERT
  await expect(select).toBeDisabled();
});

test("should support search functionality", async ({ mount }) => {
  // ARRANGE
  let modelValue = 10;

  const eventHandlers = {
    "update:modelValue": async (newValue: number) => {
      modelValue = newValue;
      await component.update({ props: { modelValue }, on: eventHandlers });
    },
  };

  const component = await mount(OnyxItemsPerPage, {
    props: {
      modelValue,
      options: [10, 20, 30, 40, 50, 75],
    },
    on: eventHandlers,
  });

  const select = component.getByRole("textbox", { name: enUs.itemsPerPage.label });

  // ACT
  await select.click();

  const search = component.getByRole("combobox", { name: enUs.select.searchInputLabel });
  await search.fill("75");

  // ASSERT
  await expect(component.getByRole("option", { name: "75", exact: true })).toBeVisible();

  // ACT
  await component.getByRole("option", { name: "75", exact: true }).click();

  // ASSERT
  expect(modelValue).toBe(75);
  await expect(select).toHaveValue("75");
});
