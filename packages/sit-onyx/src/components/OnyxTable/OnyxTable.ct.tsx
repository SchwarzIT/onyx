import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest, mockPlaywrightIcon } from "../../playwright/screenshots";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxEmpty from "../OnyxEmpty/OnyxEmpty.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxPagination from "../OnyxPagination/OnyxPagination.vue";
import OnyxTable from "./OnyxTable.vue";

const tableHead = (
  <template v-slot:head>
    <tr>
      <th>Fruit</th>
      <th>Price (€/kg)</th>
      <th>Inventory (kg)</th>
    </tr>
  </template>
);

const tableBody = [
  <tr>
    <td>Strawberry</td> <td>4.50</td> <td>200</td>
  </tr>,
  <tr>
    <td>Apple</td> <td>1.99</td> <td>3000</td>
  </tr>,
  <tr>
    <td>Banana</td> <td>3.75</td> <td>18000</td>
  </tr>,
];

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Table",
    columns: ["with-header", "without-header"],
    rows: ["default", "striped", "vertical-borders", "striped-vertical-borders"],
    component: (column, row) => (
      <OnyxTable
        striped={row.includes("striped")}
        withVerticalBorders={row.includes("vertical-borders")}
      >
        {column === "with-header" ? tableHead : undefined}
        {tableBody}
      </OnyxTable>
    ),
  });
});

test.describe("Screenshot tests (densities)", () => {
  executeMatrixScreenshotTest({
    name: "Table (densities)",
    columns: DENSITIES,
    rows: ["default", "focus-visible", "columnGroups"],
    component: (column, row) => (
      <OnyxTable
        density={column}
        withVerticalBorders={row === "columnGroups"}
        columnGroups={
          row === "columnGroups"
            ? [
                { key: "1", span: 2, header: "Group 1" },
                { key: "", span: 1 },
              ]
            : undefined
        }
      >
        {tableHead}
        {tableBody}
      </OnyxTable>
    ),
    hooks: {
      beforeEach: async (_component, page, _column, row) => {
        if (row === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test.describe("Screenshot tests (hover styles)", () => {
  executeMatrixScreenshotTest({
    name: "Table (hover styles)",
    columns: ["default", "striped"],
    rows: ["row-hover", "column-hover"],
    component: (column) => (
      <OnyxTable striped={column === "striped"}>
        {tableHead}
        {tableBody}
      </OnyxTable>
    ),
    hooks: {
      beforeEach: async (component, _, __, row) => {
        if (row === "row-hover") await component.getByText("Apple").hover();
        if (row === "column-hover") await component.getByText("Fruit").hover();
      },
    },
  });
});

test.describe("Screenshot tests (scrolling)", () => {
  executeMatrixScreenshotTest({
    name: "Table (scrolling)",
    columns: ["default", "horizontal-scroll"],
    rows: ["default", "vertical-scroll"],
    component: (column, row) => (
      <OnyxTable
        style={{
          maxWidth: column !== "default" ? "16rem" : "fit-content",
          maxHeight: row !== "default" ? "12rem" : "fit-content",
        }}
      >
        <template v-slot:head>
          <tr>
            <th>Fruit</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Rating</th>
          </tr>
        </template>

        <tr>
          <td>Strawberry</td> <td>4.50</td> <td>200</td> <td>5</td>
        </tr>
        <tr>
          <td>Apple</td> <td>1.99</td> <td>3000</td> <td>4</td>
        </tr>
        <tr>
          <td>Banana</td> <td>3.75</td> <td>18000</td> <td>3</td>
        </tr>
        <tr>
          <td>Pinia</td> <td>7.00</td> <td>250</td> <td>5</td>
        </tr>
        <tr>
          <td>Jackfruit</td> <td>3.50</td> <td>1000</td> <td>2</td>
        </tr>
      </OnyxTable>
    ),

    hooks: {
      beforeEach: async (component, _, column, row) => {
        if (column === "horizontal-scroll") await component.getByText("Apple").hover();
        if (row === "vertical-scroll") await component.getByText("Price").hover();
      },
    },
  });
});

test.describe("Screenshot tests (hover)", () => {
  executeMatrixScreenshotTest({
    name: "Table (empty variations)",
    columns: ["default", "no-header"],
    rows: ["default", "custom-empty"],
    component: (column, row) => (
      <OnyxTable style="width: 20rem;">
        {column === "default" ? tableHead : undefined}
        {row === "custom-empty" ? (
          <template v-slot:empty>
            <OnyxEmpty>Custom empty</OnyxEmpty>
          </template>
        ) : undefined}
      </OnyxTable>
    ),
  });

  executeMatrixScreenshotTest({
    name: "Table (empty blocks hover)",
    columns: ["row-hover", "column-hover"],
    rows: ["default", "empty-body"],
    component: (_column, row) => (
      <OnyxTable>
        {tableHead}
        {row === "default" ? tableBody : undefined}
      </OnyxTable>
    ),
    hooks: {
      beforeEach: async (_component, page, column, row) => {
        if (column === "row-hover") {
          // this is needed to demonstrate that a row hover has no effect when empty.
          await page.mouse.move(32, 132);
        }
        if (column === "column-hover" && ["default", "empty-body"].includes(row)) {
          // this is needed to demonstrate that a column hover has no effect when empty.
          // selecting the header label does not work because we prevent pointer-events.
          await page.mouse.move(32, 32);
        }
      },
    },
  });
});

test.describe("Screenshot tests (slots)", () => {
  executeMatrixScreenshotTest({
    name: "Table (slots)",
    columns: ["default", "long-content", "small"],
    rows: [
      "headline",
      "actions",
      "bottomLeft",
      "pagination",
      "headline-actions",
      "bottomLeft-pagination",
    ],
    component: (column, row) => (
      <OnyxTable style={{ width: column === "small" ? "18rem" : "28rem" }}>
        {tableHead}
        {tableBody}

        {row.includes("headline") && (
          <template v-slot:headline>
            <OnyxHeadline is="h3">
              {"Headline ".repeat(column === "long-content" ? 8 : 1)}
            </OnyxHeadline>
          </template>
        )}

        {row.includes("actions") && (
          <template v-slot:actions>
            <OnyxIconButton icon={mockPlaywrightIcon} label="Icon 1" />
            <OnyxIconButton icon={mockPlaywrightIcon} label="Icon 2" />
          </template>
        )}

        {row.includes("bottomLeft") && (
          <template v-slot:bottomLeft>
            {"Test slot content ".repeat(column === "long-content" ? 4 : 1)}
          </template>
        )}

        {row.includes("pagination") && (
          <template v-slot:pagination>
            <OnyxPagination modelValue={1} pages={42} />
          </template>
        )}
      </OnyxTable>
    ),
  });
});

test("should focus components with active column hover effect", async ({ page, mount }) => {
  let buttonClickCount = 0;

  const component = await mount(
    <OnyxTable>
      <template v-slot:head>
        <tr>
          <th>
            <OnyxButton label="Header button" onClick={() => buttonClickCount++} />
          </th>
          <th>Column 2</th>
        </tr>
      </template>

      <tr>
        <td>
          <OnyxButton label="Row button" onClick={() => buttonClickCount++} />
        </td>
        <td>Test 2</td>
      </tr>
      <tr>
        <td>Test 3</td>
        <td>Test 4</td>
      </tr>
    </OnyxTable>,
  );

  await component.getByRole("button", { name: "Header button" }).click();
  expect(buttonClickCount).toBe(1);

  // simulate moving the mouse down on the column hover effect to test that it will be hidden when moving
  // outside of the table header
  let box = (await component.getByRole("button", { name: "Header button" }).boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

  box = (await component.getByRole("button", { name: "Row button" }).boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

  await page.mouse.down();
  await page.mouse.up();

  expect(buttonClickCount).toBe(2);
});
