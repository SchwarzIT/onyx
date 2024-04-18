import { expect, test } from "../../playwright-axe";
import OnyxTable from "./OnyxTable.vue";

test("should render", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  await mount(
    <OnyxTable>
      <thead>
        <tr>
          <th>Fruit</th> <th>Price (€/kg)</th> <th>Inventory (kg)</th>
        </tr>
      </thead>
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
    </OnyxTable>,
  );

  // ASSERT
  // TODO: Enable the screenshot as soon as we have styles.
  // await expect(component).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
