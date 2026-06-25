import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
import { expect, test } from "../../../../playwright/a11y.js";
import TestCase from "./TestCase.ct.vue";

test("should make row clickable", async ({ mount }) => {
  // ARRANGE
  const clickSpy = createEmitSpy<typeof TestCase, "onRowClick">();
  const component = await mount(TestCase, {
    props: {
      onRowClick: clickSpy,
    },
  });

  // ACT
  const firstRow = component.getByRole("row").nth(1);
  await firstRow.click();

  // ASSERT
  await expectEmit(clickSpy, 1, [expect.objectContaining({ id: 1, name: "Alice" })]);

  // ACT
  await firstRow.selectText();
  await firstRow.click();

  // ASSERT (should not emit click if selection exist)
  await expectEmit(clickSpy, 1);

  // ACT
  await component.update({ props: { ignoreSelection: true } });
  await firstRow.selectText();
  await firstRow.click();

  // ASSERT (should still emit click if selection exist when "ignoreSelection" is enabled)
  await expectEmit(clickSpy, 2, [expect.objectContaining({ id: 1, name: "Alice" })]);

  // ACT
  await component.update({ props: { ignoreSelection: false, enabled: false } });
  await firstRow.click();

  // ASSERT (should not emit click when feature is disabled)
  await expectEmit(clickSpy, 2);

  // ACT
  await component.update({
    props: {
      enabled: true,
      disabledRows: [1],
    },
  });
  await firstRow.click();

  // ASSERT (should not emit click for first row)
  await expectEmit(clickSpy, 2);

  // ACT
  const secondRow = component.getByRole("row").nth(2);
  await secondRow.click();

  // ASSERT (should not emit click for first row)
  await expectEmit(clickSpy, 3, [expect.objectContaining({ id: 2, name: "Charlie" })]);
});
