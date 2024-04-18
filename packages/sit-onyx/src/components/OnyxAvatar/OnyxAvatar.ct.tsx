import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { ICON_SIZES } from "../OnyxIcon/types";
import OnyxAvatar from "./OnyxAvatar.vue";
import { AVATAR_TYPES } from "./types";

test.describe("Screenshot tests", () => {
  const [_, ...AVATAR_SIZES] = ICON_SIZES;

  executeMatrixScreenshotTest({
    name: "Avatar",
    columns: AVATAR_TYPES,
    rows: AVATAR_SIZES,
    component: (column, row) => <OnyxAvatar label="John Doe" type={column} size={row} />,
  });
});

test("should contain correct initials", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxAvatar, {
    props: {
      label: "A B C D",
    },
  });

  // ASSERT
  await expect(component).toContainText("AB");

  // ACT
  await component.update({ props: { label: "abcd" } });

  // ASSERT
  await expect(component).toContainText("AB");
});
