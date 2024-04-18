import { expect, test } from "../../playwright-axe";
import OnyxTable from "./OnyxTable.vue";

test("should render", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  await mount(
    <OnyxTable>
      <thead>
        <tr>
          <th>Items</th> <th>Expenditure</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Donuts</td> <td>3,000</td>
        </tr>
        <tr>
          <td>Waffle</td> <td>18,000</td>
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
