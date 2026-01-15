import { test } from "@playwright/experimental-ct-vue";
import { toggleButtonTesting } from "./createToggleButton.testing.js";
import TestToggleButton from "./TestToggleButton.vue";

test("toggleButton", async ({ mount, page }) => {
  await mount(<TestToggleButton />);

  await toggleButtonTesting({
    button: page.getByRole("button"),
    labelText: "Mute",
    initiallyPressed: false,
  });
});
