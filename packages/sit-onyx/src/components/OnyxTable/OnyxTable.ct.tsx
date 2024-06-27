import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxTable from "./OnyxTable.vue";

const tableHead = (
  <thead>
    <tr>
      <th>Fruit</th>
      <th>Price (€/kg)</th>
      <th>Inventory (kg)</th>
    </tr>
  </thead>
);

const tableBody = (
  <tbody>
    <tr>
      <td>Strawberry</td> <td>4.50</td> <td>200</td>
    </tr>
    <tr>
      <td>Apple</td> <td>1.99</td> <td>3000</td>
    </tr>
    <tr>
      <td>Banana</td> <td>3.75</td> <td>18000</td>
    </tr>
  </tbody>
);

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Table",
    columns: ["with-header", "without-header"],
    rows: ["default", "striped", "vertical-borders", "striped-vertical-borders"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
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

  executeMatrixScreenshotTest({
    name: "Table (densities)",
    columns: DENSITIES,
    rows: ["default"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column) => (
      <OnyxTable density={column}>
        {tableHead}
        {tableBody}
      </OnyxTable>
    ),
  });

  executeMatrixScreenshotTest({
    name: "Table (hover styles)",
    columns: ["default", "striped"],
    rows: ["row-hover", "column-hover"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column) => (
      <OnyxTable striped={column === "striped"}>
        {tableHead}
        {tableBody}
      </OnyxTable>
    ),
    beforeScreenshot: async (component, _, __, row) => {
      if (row === "row-hover") await component.getByText("Apple").hover();
      if (row === "column-hover") await component.getByText("Fruit").hover();
    },
  });

  executeMatrixScreenshotTest({
    name: "Table (scrolling)",
    columns: ["default", "horizontal-scroll"],
    rows: ["default", "vertical-scroll"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => (
      <OnyxTable
        style={{
          maxWidth: column !== "default" ? "16rem" : "fit-content",
          maxHeight: row !== "default" ? "12rem" : "fit-content",
        }}
      >
        <thead>
          <tr>
            <th>Fruit</th>
            <th>Price</th>
            <th>Inventory</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </OnyxTable>
    ),

    beforeScreenshot: async (component, _, column, row) => {
      if (column === "horizontal-scroll") await component.getByText("Apple").hover();
      if (row === "vertical-scroll") await component.getByText("Price").hover();
    },
  });
});

test("should focus components with active column hover effect", async ({ page, mount }) => {
  let buttonClickCount = 0;

  const component = await mount(
    <OnyxTable>
      <thead>
        <tr>
          <th>
            <OnyxButton label="Header button" onClick={() => buttonClickCount++} />
          </th>
          <th>Column 2</th>
        </tr>
      </thead>
      <tbody>
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
      </tbody>
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
