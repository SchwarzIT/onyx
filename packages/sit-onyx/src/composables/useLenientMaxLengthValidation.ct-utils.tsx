import type OnyxInput from "../components/OnyxInput/OnyxInput.vue";
import type OnyxTextarea from "../components/OnyxTextarea/OnyxTextarea.vue";
import { expect, test } from "../playwright/a11y.js";

export const testMaxLengthBehavior = (FormElement: typeof OnyxInput | typeof OnyxTextarea) => {
  test.describe(`maxlength behavior`, () => {
    test("should cut maxlength when strict is true", async ({ mount }) => {
      const component = await mount(
        <FormElement label="Label" maxlength={{ strict: true, max: 5 }} />,
      );

      const input = component.getByLabel("Label");
      const errorMessageElement = component.locator(".onyx-form-element__error-message");

      // ASSERT
      await expect(errorMessageElement).toBeHidden();

      //ACT
      await input.fill("12345678");
      await input.blur();

      // ASSERT
      await expect(errorMessageElement).toBeHidden();
      await expect(input).toHaveValue("12345");
      await expect(input.evaluate((i: HTMLInputElement) => i.validity.valid)).resolves.toBe(true);
    });

    test("should handle maxlength leniently by default", async ({ mount }) => {
      const component = await mount(<FormElement label="Label" maxlength={5} />);

      const input = component.getByLabel("Label");
      const errorMessageElement = component.locator(".onyx-form-element__error-message");

      // ASSERT
      await expect(errorMessageElement).toBeHidden();

      //ACT
      await input.fill("12345");
      await input.blur();

      // ASSERT
      await expect(errorMessageElement).toBeHidden();
      await expect(input.evaluate((i: HTMLInputElement) => i.validity.valid)).resolves.toBe(true);

      //ACT
      await input.fill("12345678");
      await input.blur();

      // ASSERT
      await expect(input).toHaveValue("12345678");
      await expect(errorMessageElement).toBeVisible();
      await expect(input.evaluate((i: HTMLInputElement) => i.validity.valid)).resolves.toBe(false);
    });
  });
};
