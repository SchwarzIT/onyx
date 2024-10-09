import type { Locator, Page } from "@playwright/test";
import { h, type Component } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import { expect, test } from "../../playwright/a11y";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxCheckbox from "../OnyxCheckbox/OnyxCheckbox.vue";
import OnyxCheckboxGroup from "../OnyxCheckboxGroup/OnyxCheckboxGroup.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import OnyxRadioGroup from "../OnyxRadioGroup/OnyxRadioGroup.vue";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import type { SelectOption } from "../OnyxSelect/types";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import OnyxSwitch from "../OnyxSwitch/OnyxSwitch.vue";
import OnyxTextarea from "../OnyxTextarea/OnyxTextarea.vue";
import OnyxForm from "./OnyxForm.vue";

const inferProps = <TComp extends Component, TProps extends ComponentProps<TComp>>(
  component: TComp,
  props: TProps,
  delegate?: Locator,
) => ({ component, props, delegate });

const expectForAll = async (
  allFormElements: ReturnType<typeof inferProps>[],
  page: Page,
  expectation: (locator: Locator, label: string) => Promise<unknown>,
) => {
  for (const { props, delegate } of allFormElements) {
    const getInputByLabel = page.getByLabel(props.label, { exact: true });
    // eslint-disable-next-line playwright/no-conditional-in-test
    const element = delegate || getInputByLabel;
    expect(element).toBeDefined();
    await expectation(element, props.label);
  }
};

test("OnyxForm should inject disabled state", async ({ mount, page }) => {
  const options: SelectOption[] = [
    {
      label: "option 1",
      value: "option 1",
    },
  ];
  const allFormElements = [
    inferProps(OnyxInput, { label: "OnyxInput" }),
    inferProps(OnyxSelect, { label: "OnyxSelect", listLabel: "Select options", options }),
    inferProps(OnyxStepper, { label: "OnyxStepper" }),
    inferProps(OnyxTextarea, { label: "OnyxTextarea" }),
    inferProps(
      OnyxRadioGroup,
      { label: "OnyxRadioGroup", options },
      page.getByLabel("OnyxRadioGroup").getByText("option 1"),
    ),
    inferProps(
      OnyxCheckboxGroup,
      { label: "OnyxCheckboxGroup", options },
      page.getByLabel("OnyxCheckboxGroup").getByText("option 1"),
    ),
    inferProps(OnyxCheckbox, { label: "OnyxCheckbox", value: "" }),
    inferProps(OnyxSwitch, { label: "OnyxSwitch" }),
    inferProps(OnyxButton, { label: "OnyxButton" }, page.getByText("OnyxButton", { exact: true })),
  ];

  // ARRANGE
  await mount(
    <OnyxForm>
      {allFormElements.map(({ component, props }) => h(component as Component, props))}
    </OnyxForm>,
  );

  // ASSERT
  await expectForAll(allFormElements, page, (element) =>
    Promise.all([expect(element).toBeEnabled(), expect(element).toBeEditable()]),
  );

  // ARRANGE
  await mount(
    <OnyxForm disabled>
      {allFormElements.map(({ component, props }) => h(component as Component, props))}
    </OnyxForm>,
  );

  // ASSERT
  await expectForAll(allFormElements, page, (element) => expect(element).toBeDisabled());
});

test("OnyxForm should showError mode", async ({ mount, page }) => {
  const customError = "CUSTOM_ERROR" as const;
  const options: SelectOption[] = [
    {
      label: "option 1",
      value: "option 1",
    },
  ];
  const allFormElements = [
    inferProps(OnyxInput, { label: "OnyxInput", customError }),
    inferProps(OnyxSelect, {
      label: "OnyxSelect",
      listLabel: "Select options",
      options,
      customError,
    }),
    inferProps(OnyxStepper, { label: "OnyxStepper", customError }),
    inferProps(OnyxTextarea, { label: "OnyxTextarea", customError }),
    inferProps(
      OnyxRadioGroup,
      { label: "OnyxRadioGroup", options, customError },
      page.getByLabel("OnyxRadioGroup").getByLabel("option 1"),
    ),
    inferProps(OnyxCheckbox, { label: "OnyxCheckbox", value: "", customError }),
    inferProps(OnyxSwitch, { label: "OnyxSwitch", customError }),
  ];

  // ARRANGE
  await mount(
    <OnyxForm>
      {allFormElements.map(({ component, props }) => h(component as Component, props))}
    </OnyxForm>,
  );

  // ASSERT
  await expectForAll(allFormElements, page, (element, label) =>
    element
      .evaluate((elem: HTMLInputElement) => elem.validity?.customError === true)
      .then((result) => expect(result, `expect native input of ${label} to be invalid`).toBe(true)),
  );

  await expect(
    page.getByText(customError),
    "expect no error message to be shown initially",
  ).toBeHidden();
});
