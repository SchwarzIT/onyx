import { expect, test } from "../../playwright/a11y.js";
import OnyxErrorTooltip from "./OnyxErrorTooltip.vue";

test("should render without error-tooltip", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxErrorTooltip>
      <button>Dummy button</button>
    </OnyxErrorTooltip>,
  );

  // ACT
  await component.getByRole("button").hover();
  // ASSERT
  await expect(component.getByRole("tooltip")).toBeHidden();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render error-tooltip on hover", async ({ mount, makeAxeBuilder }) => {
  const errorMessages = { shortMessage: "Dummy error", longMessage: "Further information" };
  // ARRANGE
  const component = await mount(
    <OnyxErrorTooltip style="padding-top: 3rem;" errorMessages={errorMessages}>
      <button>Dummy button</button>
    </OnyxErrorTooltip>,
  );

  // ACT
  await component.getByRole("button").hover();
  // ASSERT
  await expect(component.getByRole("tooltip")).toHaveCount(1);
  await expect(
    component.getByRole("tooltip", {
      name: `${errorMessages.shortMessage}: ${errorMessages.longMessage}`,
    }),
  ).toBeVisible();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render error-tooltip on focus", async ({ mount, makeAxeBuilder }) => {
  const errorMessages = { shortMessage: "Dummy error", longMessage: "Further information" };
  // ARRANGE
  const component = await mount(
    <OnyxErrorTooltip style="padding-top: 3rem;" errorMessages={errorMessages}>
      <button>Dummy button</button>
    </OnyxErrorTooltip>,
  );

  // ACT
  await component.getByRole("button").focus();
  // ASSERT
  await expect(component.getByRole("tooltip")).toHaveCount(1);
  await expect(
    component.getByRole("tooltip", {
      name: `${errorMessages.shortMessage}: ${errorMessages.longMessage}`,
    }),
  ).toBeVisible();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render without error-tooltip when disabled", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <OnyxErrorTooltip
      errorMessages={{ shortMessage: "Dummy error", longMessage: "Further information" }}
      disabled
    >
      <button disabled>Dummy button</button>
    </OnyxErrorTooltip>,
  );

  // ACT
  await component.getByRole("button").hover();
  // ASSERT
  await expect(component.getByRole("tooltip")).toBeHidden();

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
