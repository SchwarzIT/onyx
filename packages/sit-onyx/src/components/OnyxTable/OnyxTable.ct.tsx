import { expect, test } from "../../playwright/a11y";
import OnyxTable from "./OnyxTable.vue";

for (const state of ["default", "striped", "grid", "striped-grid"]) {
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

  test(`should render ${state}`, async ({ mount, makeAxeBuilder }) => {
    // ARRANGE
    const component = await mount(
      <OnyxTable striped={state.includes("striped")} grid={state.includes("grid")}>
        <thead>
          <tr>
            <th>Fruit</th> <th>Price (€/kg)</th> <th>Inventory (kg)</th>
          </tr>
        </thead>
        {tableBody}
      </OnyxTable>,
    );

    // ASSERT
    await expect(component).toHaveScreenshot(`${state}.png`);

    // ACT
    const accessibilityScanResults = await makeAxeBuilder()
      // TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
      .disableRules(["color-contrast"])
      .analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test(`should render ${state} without header`, async ({ mount, makeAxeBuilder }) => {
    // ARRANGE
    const component = await mount(
      <OnyxTable striped={state.includes("striped")} grid={state.includes("grid")}>
        {tableBody}
      </OnyxTable>,
    );

    // ASSERT
    await expect(component).toHaveScreenshot(`${state}-without-header.png`);

    // ACT
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    // ASSERT
    expect(accessibilityScanResults.violations).toEqual([]);
  });
}
