import { expect, test } from "@playwright/experimental-ct-vue";
import TestInput from "./TestInput.vue";

test("should display label", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<TestInput label="Hello World" />);

  // ASSERT
  await expect(component).toContainText("Hello World");
  await expect(component).toHaveScreenshot("default.png");
});

test("should validate required inputs", async ({ mount }) => {
  // ARRANGE
  const component = await mount(<TestInput label="Demo" required />);
  const input = component.getByLabel('DemoModel value: "",');

  // ACT
  await input.focus();
  await input.blur();

  // ASSERT
  await expect(component).toContainText("Please fill in this field.");
});
