import { OnyxAvatar } from "../..";
import { expect, test } from "../../playwright/a11y";
import { AVATAR_TYPES } from "../OnyxAvatar/types";
import OnyxAvatarStack from "./OnyxAvatarStack.vue";

test("should render", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxAvatarStack>
      {Array.from({ length: 10 }, (_, index) => {
        const label = `John Doe ${index + 1}`;
        const type = AVATAR_TYPES[index % AVATAR_TYPES.length];
        return <OnyxAvatar label={label} type={type} key={index} />;
      })}
    </OnyxAvatarStack>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");
});

test("should wrap when exceeding the width", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxAvatarStack style={{ width: "24rem" }}>
      {Array.from({ length: 24 }, (_, index) => {
        const label = `John Doe ${index + 1}`;
        const type = AVATAR_TYPES[index % AVATAR_TYPES.length];
        return <OnyxAvatar label={label} type={type} key={index} />;
      })}
    </OnyxAvatarStack>,
  );

  // ASSERT
  await expect(component).toHaveScreenshot("default.png");
});
