import type AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../playwright/a11y.js";
import TestCase from "./TestCase.ct.vue";

async function checkAccessibility(axeBuilder: AxeBuilder) {
  const accessibilityScanResults = await axeBuilder.analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
}

test("should render groups and options", async ({ page, mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(TestCase);
  const input = component.getByLabel("Search for content");
  const axeBuilder = makeAxeBuilder();

  // ASSERT
  await checkAccessibility(axeBuilder);
  await expect(page).toHaveScreenshot("default.png");

  // ACT
  await input.fill("Example search value");
  await component.update({ props: { loading: true } });

  // ASSERT
  await checkAccessibility(axeBuilder);
  await expect(page).toHaveScreenshot("loading.png");

  // ACT
  await component.update({ props: { loading: false, groupCount: 1 } });

  // ASSERT
  await checkAccessibility(axeBuilder);
  await expect(page).toHaveScreenshot("single-group.png");

  // ACT
  await component.update({ props: { loading: false, groupCount: 1, showEndOfList: true } });

  // ASSERT
  await checkAccessibility(axeBuilder);
  await expect(page).toHaveScreenshot("end-of-list.png");

  // ACT
  await component.update({ props: { loading: false, groupCount: 3, showEndOfList: false } });

  // ASSERT
  await checkAccessibility(axeBuilder);
  await expect(page).toHaveScreenshot("multiple-groups.png");

  // ACT
  await component.update({ props: { groupCount: 8 } });

  // ASSERT
  await checkAccessibility(axeBuilder);
  await component.getByRole("option").last().scrollIntoViewIfNeeded();
  await expect(page).toHaveScreenshot("max-height.png");

  // ACT
  await component.update({ props: { longContent: true } });
  await page.setViewportSize({ width: 400, height: 600 });
  await component.getByRole("option").last().scrollIntoViewIfNeeded();

  // ASSERT
  await expect(page).toHaveScreenshot("responsive.png");
});

test("should support keyboard navigation", async ({ page, mount }) => {
  // ARRANGE
  const component = await mount(TestCase, { props: { groupCount: 2 } });
  const input = component.getByLabel("Search for content");

  const expectSelectedOption = async (name: string) => {
    await expect(component.getByRole("option", { name })).toHaveAttribute("aria-selected", "true");
  };

  const navigate = async (key: string) => {
    await page.keyboard.press(key);
    await expect(input, "should keep input focus when navigating via keyboard").toBeFocused();
  };

  // ASSERT
  await expect(input, "should autofocus search input").toBeFocused();

  // ACT + ASSERT
  await navigate("ArrowDown");
  await expectSelectedOption("Result 1.1");
  await expect(page).toHaveScreenshot("active-option.png");

  // ACT + ASSERT
  await navigate("ArrowDown");
  await expectSelectedOption("Result 1.2");

  // ACT + ASSERT
  await navigate("ArrowDown");
  await expectSelectedOption("Result 2.1");

  // ACT + ASSERT
  await navigate("ArrowUp");
  await expectSelectedOption("Result 1.2");

  // ACT + ASSERT
  await navigate("End");
  await expectSelectedOption("Show all results");

  // ACT + ASSERT
  await navigate("Home");
  await expectSelectedOption("Result 1.1");

  // ACT + ASSERT
  await navigate("ArrowUp");
  await expectSelectedOption("Show all results");

  // ACT + ASSERT
  await navigate("ArrowDown");
  await expectSelectedOption("Result 1.1");

  // ACT + ASSERT
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/#1-1/);
});
