import { expect, test } from "../../playwright/a11y";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import OnyxFormElement from "./OnyxFormElement.vue";
import TestWrapper from "./TestWrapper.ct.vue";

test("should have unique ids", async ({ mount }) => {
  // ARRANGE
  const mounted = await mount(TestWrapper);

  const textboxes = mounted.getByRole("textbox");
  await expect(textboxes).toHaveCount(2);

  const firstId = await textboxes.first().evaluate((el) => el.id);
  const secondId = await textboxes.last().evaluate((el) => el.id);

  expect(firstId, "every form-element should have a unique id").not.toBe(secondId);
});

test("should render success message", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxFormElement, {
    props: {
      label: "Test label",
      successMessages: { shortMessage: "Test short message" },
    },
  });

  const message = component.getByText("Test short message");

  // ASSERT
  await expect(message).toBeVisible();
  await expect(message).toContainText("Test short message");
});

test("should render error message", async ({ mount }) => {
  const component = await mount(
    <OnyxFormElement label="Test Label">
      <OnyxInput label="Label" required />
    </OnyxFormElement>,
  );

  const message = component.getByText("Required");

  // ASSERT
  await expect(message).toBeHidden();

  //ACT
  const input = component.getByLabel("Label");
  await input.click();
  await input.fill("x");
  await input.fill("");
  await input.blur();

  // ASSERT
  await expect(message).toBeVisible();
});

test.describe("withCounter", () => {
  test("should render counter text", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxFormElement style={{ maxWidth: "200px" }} withCounter maxlength={3} label="Test Label">
        content
      </OnyxFormElement>,
    );

    // ASSERT
    await expect(component.getByText("0/3")).toBeVisible();
    await expect(component).toHaveScreenshot("onyx-form-element-counter-text.png");
  });

  test("should render counter text red when too long", async ({ mount }) => {
    // ARRANGE
    const component = await mount(
      <OnyxFormElement
        style={{ maxWidth: "200px" }}
        withCounter
        modelValue={"12345"}
        maxlength={3}
        label="Test Label"
      >
        content
      </OnyxFormElement>,
    );

    // ASSERT
    await expect(component.getByText("5/3")).toBeVisible();
    await expect(component).toHaveScreenshot("onyx-form-element-counter-error-text.png");
  });
});

test("should render info message", async ({ mount }) => {
  const message = { shortMessage: "Test short message" };
  const component = await mount(
    <OnyxFormElement label="Test Label" message={message}>
      <OnyxInput label="Label" />
    </OnyxFormElement>,
  );

  const messageElement = component.getByText("Test short message");

  // ASSERT
  await expect(messageElement).toBeVisible();
});
