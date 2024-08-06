import { expect, test } from "../../playwright/a11y";
import OnyxErrorTooltip from "./OnyxErrorTooltip.vue";

test("should render without error-tooltip", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(<OnyxErrorTooltip>Dummy content</OnyxErrorTooltip>);

  // ACT
  await component.getByText("Dummy content").hover();
  // ASSERT
  await expect(component.getByRole("tooltip")).toHaveCount(0);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render with error-tooltip", async ({ mount, makeAxeBuilder }) => {
  const errorMessages = { shortMessage: "Dummy error", longMessage: "Further information" };
  // ARRANGE
  const component = await mount(
    <OnyxErrorTooltip errorMessages={errorMessages}>Dummy content</OnyxErrorTooltip>,
  );
  // add space for tooltip
  await component.evaluate((element) => {
    element.style.paddingTop = "3rem";
  });

  // ACT
  await component.getByText("Dummy content").hover();
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
      Dummy content
    </OnyxErrorTooltip>,
  );

  // ACT
  await component.getByText("Dummy content").hover();
  // ASSERT
  await expect(component.getByRole("tooltip")).toHaveCount(0);

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();
  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
