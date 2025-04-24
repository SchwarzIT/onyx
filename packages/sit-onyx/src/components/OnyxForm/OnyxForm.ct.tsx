import type { Locator } from "@playwright/test";
import { h, type Component } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import { expect, test } from "../../playwright/a11y";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxCheckbox from "../OnyxCheckbox/OnyxCheckbox.vue";
import OnyxCheckboxGroup from "../OnyxCheckboxGroup/OnyxCheckboxGroup.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import OnyxRadioButton from "../OnyxRadioButton/OnyxRadioButton.vue";
import OnyxRadioGroup from "../OnyxRadioGroup/OnyxRadioGroup.vue";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import type { SelectOption } from "../OnyxSelect/types";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import OnyxSwitch from "../OnyxSwitch/OnyxSwitch.vue";
import OnyxTextarea from "../OnyxTextarea/OnyxTextarea.vue";
import FormElementTestWrapper from "./FormElementTestWrapper.vue";
import OnyxForm from "./OnyxForm.vue";

const inferProps = <TComp extends Component, TProps extends ComponentProps<TComp>>(
  component: TComp,
  props: TProps,
  delegate?: Locator,
) => ({ component, props, delegate });

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

  const expectForAll = async (expectation: (locator: Locator) => Promise<unknown>) => {
    for (const { props, delegate } of allFormElements) {
      const getInputByLabel = page.getByLabel(props.label, { exact: true });
      // eslint-disable-next-line playwright/no-conditional-in-test -- its easier to have some simple dynamic checks in the test
      const element = delegate || getInputByLabel;
      expect(element).toBeDefined();
      await expectation(element);
    }
  };

  // ARRANGE
  await mount(
    <OnyxForm>
      {allFormElements.map(({ component, props }) => h(component as Component, props))}
    </OnyxForm>,
  );

  // ASSERT
  await expectForAll(async (element) => {
    return Promise.all([expect(element).toBeEnabled(), expect(element).toBeEditable()]);
  });

  // ARRANGE
  await mount(
    <OnyxForm disabled>
      {allFormElements.map(({ component, props }) => h(component as Component, props))}
    </OnyxForm>,
  );

  // ASSERT
  await expectForAll((element) => expect(element).toBeDisabled());
});

test("FormElementTestWrapper", async ({ mount, page }) => {
  const allFormComponents = Object.entries({
    OnyxInput,
    OnyxStepper,
    OnyxTextarea,
    OnyxCheckbox,
    OnyxRadioButton,
    OnyxSwitch,
    OnyxSelect,
  });

  // ARRANGE
  const jsx = allFormComponents.map(([name, c]) => (
    <FormElementTestWrapper name={name} is={c}></FormElementTestWrapper>
  ));

  await mount(<div>{jsx}</div>);

  for (const [name] of allFormComponents) {
    await page
      .getByRole("button", { name: `form-element-test-wrapper-focus-button-${name}` })
      .click();
    await expect(page.getByLabel(`form-element-test-wrapper-label-${name}`)).toBeFocused();
  }
});
