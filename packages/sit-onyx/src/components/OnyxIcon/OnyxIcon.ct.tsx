import happyIcon from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import { expect, test } from "../../playwright-axe";
import { ONYX_COLORS } from "../../types/colors";
import OnyxIcon from "./OnyxIcon.vue";
import { ICON_SIZES } from "./types";

test("should render different sizes", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <div>
      {ICON_SIZES.map((size) => (
        <OnyxIcon icon={happyIcon} size={size} key={size} />
      ))}
    </div>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});

test("should render different colors", async ({ mount, makeAxeBuilder }) => {
  // ARRANGE
  const component = await mount(
    <div>
      {ONYX_COLORS.map((color) => (
        <OnyxIcon size="2xl" icon={happyIcon} color={color} key={color} />
      ))}
    </div>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("colors.png");

  // ACT
  const accessibilityScanResults = await makeAxeBuilder().analyze();

  // ASSERT
  expect(accessibilityScanResults.violations).toEqual([]);
});
