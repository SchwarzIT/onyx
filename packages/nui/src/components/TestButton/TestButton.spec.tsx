import { expect, test } from "@playwright/experimental-ct-vue";
import TestButton from "./TestButton.vue";

test("should display label", async ({ mount }) => {
  const component = await mount(<TestButton label="Hello World" />);
  await expect(component).toContainText("Hello World");
});
