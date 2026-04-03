import { expect, test } from "../playwright/a11y.js";
import TestCase from "./useOpenDirection.ct.vue";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 1000 });
});

test.describe("vertical without overflow parent", () => {
  test("should open bottom when there is more space below", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<TestCase style={{ height: "50px", marginTop: "100px" }} />);

    // ASSERT
    // Free space below: 1000 - 150 = 850
    // Free space above: 100 - 0 = 100
    // Should open bottom since 850 > 100
    await expect(component).toContainText("bottom");
  });

  test("should open top when there is more space above", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<TestCase style={{ height: "50px", marginTop: "800px" }} />);

    // ASSERT
    // Free space below: 1000 - 850 = 150
    // Free space above: 800 - 0 = 800
    // Should open top since 800 > 150
    await expect(component).toContainText("top");
  });

  test("should update direction when called multiple times", async ({ mount }) => {
    // ARRANGE
    const component = await mount(<TestCase style={{ height: "50px", marginTop: "100px" }} />);

    // ASSERT
    await expect(component).toContainText("bottom");

    // ACT
    await component.evaluate((element) => (element.style.marginTop = "800px"));
    await component.getByRole("button", { name: "Update direction" }).click();

    // ASSERT
    await expect(component).toContainText("top");
  });

  test("should correctly consider scrolling", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <div style={{ marginBlock: "2000px" }}>
        <TestCase style={{ height: "50px" }} />
      </div>,
    );

    const updateButton = component.getByRole("button", { name: "Update direction" });

    // ACT (scroll element to the top of the visual viewport)
    await component.evaluate(() => document.documentElement.scrollTo({ top: 2000 }));
    await updateButton.click();

    // ASSERT
    await expect(component).toContainText("bottom");

    // ACT
    await component.evaluate(() => document.documentElement.scrollTo({ top: 1200 }));
    await updateButton.click();

    // ASSERT
    await expect(component).toContainText("top");
  });
});

test.describe("vertical with overflow parent", () => {
  test("should open bottom when there is more space below", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <div
        style={{
          height: "450px",
          marginTop: "50px",
          overflow: "hidden",
        }}
      >
        <TestCase style={{ height: "50px", marginTop: "150px" }} />
      </div>,
    );

    // ASSERT
    // Free space below (within parent): 500 - 200 = 300
    // Free space above (within parent): 150 - 50 = 100
    // Should open bottom since 300 > 100
    await expect(component).toContainText("bottom");
  });

  test("should open top when there is more space above", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <div
        style={{
          height: "450px",
          marginTop: "50px",
          overflow: "hidden",
        }}
      >
        <TestCase style={{ height: "50px", marginTop: "400px" }} />
      </div>,
    );

    // ASSERT
    // Free space below (within parent): 500 - 450 = 50
    // Free space above (within parent): 400 - 50 = 350
    // Should open top since 350 > 50
    await expect(component).toContainText("top");
  });
});

test.describe("horizontal without overflow parent", () => {
  test("should open right when there is more space to the right", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <TestCase horizontal style={{ width: "50px", marginLeft: "100px" }} />,
    );

    // ASSERT
    // Free space right: 1000 - 150 = 850
    // Free space left: 100 - 0 = 100
    // Should open right since 850 > 100
    await expect(component).toContainText("right");
  });

  test("should open left when there is more space to the left", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <TestCase horizontal style={{ width: "50px", marginLeft: "800px" }} />,
    );

    // ASSERT
    // Free space right: 1000 - 850 = 150
    // Free space left: 800 - 0 = 800
    // Should open left since 800 > 150
    await expect(component).toContainText("left");
  });
});

test.describe("horizontal with overflow parent", () => {
  test("should open right when there is more space to the right", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <div
        style={{
          width: "450px",
          marginLeft: "50px",
          overflow: "hidden",
        }}
      >
        <TestCase horizontal style={{ width: "50px", marginLeft: "150px" }} />
      </div>,
    );

    // ASSERT
    // Free space right (within parent): 500 - 250 = 250
    // Free space left (within parent): 200 - 50 = 150
    // Should open right since 250 > 150
    await expect(component).toContainText("right");
  });

  test("should open left when there is more space to the left", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <div
        style={{
          width: "450px",
          marginLeft: "50px",
          overflow: "hidden",
        }}
      >
        <TestCase horizontal style={{ width: "50px", marginLeft: "400px" }} />
      </div>,
    );

    // ASSERT
    // Free space right (within parent): 500 - 500 = 0
    // Free space left (within parent): 450 - 50 = 400
    // Should open left since 400 > 0
    await expect(component).toContainText("left");
  });
});
