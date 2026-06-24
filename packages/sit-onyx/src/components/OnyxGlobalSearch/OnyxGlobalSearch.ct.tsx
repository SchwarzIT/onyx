import type { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "../../playwright/a11y.js";
import TestCase from "./TestCase.ct.vue";

async function checkAccessibility(axeBuilder: AxeBuilder) {
  const accessibilityScanResults = await axeBuilder.analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
}

const EXTERNAL_HREF = "https://onyx-global-search.example.com";

test.beforeEach(async ({ context }) => {
  await context.route(EXTERNAL_HREF, (route) => route.fulfill({ body: "Test page" }));
});

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
  await input.focus();

  // ASSERT
  await checkAccessibility(axeBuilder);
  await expect(page).toHaveScreenshot("single-group.png");

  // ACT
  await component.update({ props: { loading: false, groupCount: 3 } });

  // ASSERT
  await checkAccessibility(axeBuilder);
  await page.setViewportSize({ width: 1280, height: 3000 });
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

test("should support mouse", async ({ page, mount, context }) => {
  // ARRANGE
  const component = await mount(TestCase, { props: { groupCount: 2 } });
  const input = component.getByLabel("Search for content");

  // ASSERT
  await expect(input, "should autofocus search input").toBeFocused();

  // ACT + ASSERT
  await component.getByLabel("Result 1.1").click();
  await expect(page).toHaveURL(/\/#1-1/);

  // ARRANGE
  let count = 0;
  context.on("request", () => count++);
  const newTabPromise = page.waitForEvent("popup");

  // ACT
  await component.getByLabel("Result 1.2").click();
  const newTab = await newTabPromise;

  // ASSERT
  await expect(newTab).toHaveURL(EXTERNAL_HREF);
  await newTab.close();
  expect(count, "should only open a single tab").toBe(1);
});

test("should support keyboard navigation", async ({ page, mount, context }) => {
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

  // ARRANGE
  let count = 0;
  context.on("request", () => count++);
  const newTabPromise = page.waitForEvent("popup");

  // ACT
  await navigate("ArrowDown");
  await page.keyboard.press("Enter");

  // ASSERT
  const newTab = await newTabPromise;
  await expect(newTab).toHaveURL(EXTERNAL_HREF);
  await newTab.close();
  expect(count, "should only open a single tab").toBe(1);
});
