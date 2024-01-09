import { expect, test } from "@playwright/experimental-ct-vue";
import TestInput from "./TestInput.vue";

test("should display label", async ({ mount }) => {
  const component = await mount(<TestInput label="Hello World" />);
  await expect(component).toContainText("Hello World");
  await expect(component).toHaveScreenshot("default.png");
});

test("should validate required inputs", async ({ mount }) => {
  const component = await mount(<TestInput label="Demo" required />);
  const input = component.getByLabel('DemoModel value: "",');
  await input.focus();
  await input.blur();
  await expect(component).toContainText("Please fill in this field.");
});
