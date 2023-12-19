import { expect, test } from "@playwright/experimental-ct-vue";
import TestInput from "./TestInput.vue";

test("should display label", async ({ mount }) => {
  const component = await mount(<TestInput label="Hello World" />);
  await expect(component).toContainText("Hello World");
});
