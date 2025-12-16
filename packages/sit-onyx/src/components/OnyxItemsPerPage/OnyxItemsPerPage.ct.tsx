import { useFocusStateHooks } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxItemsPerPage from "./OnyxItemsPerPage.vue";

const PER_PAGE_OPTIONS = [10, 20, 30, 40, 50];

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Items per page",
    columns: DENSITIES,
    rows: ["default", "disabled", "skeleton", "open"],
    component: (column, row) => (
      <OnyxItemsPerPage
        modelValue={10}
        density={column}
        options={PER_PAGE_OPTIONS}
        skeleton={row === "skeleton"}
        disabled={row === "disabled"}
        style={{ marginBottom: row === "open" ? "20rem" : undefined }}
      />
    ),
    hooks: {
      beforeEach: async (component, _page, _column, row) => {
        if (row === "open") {
          await component.getByRole("combobox", { name: "Items per page" }).click();
        }
      },
    },
  });
});

test.describe("Screenshot tests (label alignment)", () => {
  executeMatrixScreenshotTest({
    name: "Items per page (label alignment)",
    columns: ["default"],
    rows: ["right", "left", "hidden"],
    component: (column, row) => (
      <OnyxItemsPerPage
        modelValue={10}
        options={PER_PAGE_OPTIONS}
        labelAlignment={row !== "hidden" ? row : undefined}
        hideLabel={row === "hidden"}
      />
    ),
  });
});

test.describe("Screenshot tests (states)", () => {
  executeMatrixScreenshotTest({
    name: "Items per page (states)",
    columns: ["default"],
    rows: ["default", "hover", "focus-visible", "active"],
    component: () => <OnyxItemsPerPage options={PER_PAGE_OPTIONS} modelValue={10} />,
    hooks: {
      beforeEach: async (component, page, _column, row) => {
        const button = component.getByRole("combobox", { name: "Items per page" });
        await useFocusStateHooks({ component: button, page, state: row });
      },
    },
  });
});

test.describe("Screenshot tests (truncation)", () => {
  executeMatrixScreenshotTest({
    name: "Items per page (truncation)",
    columns: ["default"],
    rows: ["default"],
    component: () => (
      <div style={{ width: "10rem" }}>
        <OnyxItemsPerPage options={PER_PAGE_OPTIONS} modelValue={10} />
      </div>
    ),
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
      options: PER_PAGE_OPTIONS,
    },
    on: eventHandlers,
  });

  const select = component.getByRole("combobox", { name: "Items per page" });

  // ASSERT
  await expect(select).toHaveValue("10");

  // ACT
  await select.click();
  await component.getByRole("option", { name: "20", exact: true }).click();

  // ASSERT
  expect(modelValue).toBe(20);
  await expect(select).toHaveValue("20");
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

  const select = component.getByRole("combobox", { name: "Items per page" });

  // ASSERT
  await expect(select).toBeDisabled();
});
