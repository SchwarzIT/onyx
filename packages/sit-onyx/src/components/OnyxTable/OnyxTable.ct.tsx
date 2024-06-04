import { DENSITIES } from "../../composables/density";
import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
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
    rows: ["default", "striped", "grid", "striped-grid"],
    // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
    disabledAccessibilityRules: ["color-contrast"],
    component: (column, row) => (
      <OnyxTable striped={row.includes("striped")} grid={row.includes("grid")}>
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
          maxWidth: column !== "default" ? "15rem" : "fit-content",
          maxHeight: row !== "default" ? "12rem" : "fit-content",
        }}
      >
        <thead>
          <tr>
            <th>Fruit</th>
            <th>Price (€/kg)</th>
            <th>Inventory (kg)</th>
            <th>Rating</th>
          </tr>
        </thead>{" "}
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
