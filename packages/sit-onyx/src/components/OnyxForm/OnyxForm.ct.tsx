import type { Locator, Page } from "@playwright/test";
import { h, type Component } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import { expect, test } from "../../playwright/a11y.js";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxCheckbox from "../OnyxCheckbox/OnyxCheckbox.vue";
import OnyxCheckboxGroup from "../OnyxCheckboxGroup/OnyxCheckboxGroup.vue";
import OnyxDatePicker from "../OnyxDatePicker/OnyxDatePicker.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import OnyxRadioButton from "../OnyxRadioButton/OnyxRadioButton.vue";
import OnyxRadioGroup from "../OnyxRadioGroup/OnyxRadioGroup.vue";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import type { SelectOption } from "../OnyxSelect/types.js";
import OnyxSlider from "../OnyxSlider/OnyxSlider.vue";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import OnyxSwitch from "../OnyxSwitch/OnyxSwitch.vue";
import OnyxTextarea from "../OnyxTextarea/OnyxTextarea.vue";
import OnyxTimePicker from "../OnyxTimePicker/OnyxTimePicker.vue";
import FormElementTestWrapper from "./FormElementTestWrapper.vue";
import OnyxForm from "./OnyxForm.vue";

const inferProps = <TComp extends Component, TProps extends ComponentProps<TComp>>(
  component: TComp,
  props: TProps,
  delegate?: (page: Page) => Locator,
) => ({ component, props, delegate });

const SINGLE_OPTION: SelectOption[] = [
  {
    label: "option 1",
    value: "option 1",
  },
];

const ALL_FORM_ELEMENTS = {
  OnyxInput: inferProps(OnyxInput, { label: "OnyxInput" }),
  OnyxSelect: inferProps(OnyxSelect, {
    label: "OnyxSelect",
    listLabel: "Select options",
    options: SINGLE_OPTION,
  }),
  OnyxStepper: inferProps(OnyxStepper, { label: "OnyxStepper" }),
  OnyxSlider: inferProps(OnyxSlider, { label: "OnyxSlider", modelValue: 0 }),
  OnyxDatePicker: inferProps(OnyxDatePicker, { label: "OnyxDatePicker", modelValue: "2011-10-31" }),
  OnyxTimePicker: inferProps(OnyxTimePicker, { label: "OnyxTimePicker", modelValue: "14:30:00" }),
  OnyxTextarea: inferProps(OnyxTextarea, { label: "OnyxTextarea" }),
  OnyxRadioGroup: inferProps(
    OnyxRadioGroup,
    { label: "OnyxRadioGroup", options: SINGLE_OPTION },
    (page) => page.getByLabel("OnyxRadioGroup").getByText("option 1"),
  ),
  OnyxCheckboxGroup: inferProps(
    OnyxCheckboxGroup,
    { label: "OnyxCheckboxGroup", options: SINGLE_OPTION },
    (page) => page.getByLabel("OnyxCheckboxGroup").getByText("option 1"),
  ),
  OnyxCheckbox: inferProps(OnyxCheckbox, { label: "OnyxCheckbox", value: "" }),
  OnyxSwitch: inferProps(OnyxSwitch, { label: "OnyxSwitch" }),
  OnyxButton: inferProps(OnyxButton, { label: "OnyxButton" }, (page) =>
    page.getByText("OnyxButton", { exact: true }),
  ),
};

const expectForAll = async (
  targets: Record<string, { props: { label: string }; delegate?: (page: Page) => Locator }>,
  page: Page,
  expectation: (locator: Locator) => Promise<unknown>,
) => {
  for (const { props, delegate } of Object.values(targets)) {
    const getInputByLabel = page.getByLabel(props.label, { exact: true });
    const element = delegate?.(page) || getInputByLabel;
    expect(element).toBeDefined();
    await expectation(element);
  }
};

const FORM_ELEMENTS_WITH_MESSAGE_AREA = {
  OnyxInput: ALL_FORM_ELEMENTS["OnyxInput"],
  OnyxSelect: ALL_FORM_ELEMENTS["OnyxSelect"],
  OnyxStepper: ALL_FORM_ELEMENTS["OnyxStepper"],
  OnyxSlider: ALL_FORM_ELEMENTS["OnyxSlider"],
  OnyxDatePicker: ALL_FORM_ELEMENTS["OnyxDatePicker"],
  OnyxTimePicker: ALL_FORM_ELEMENTS["OnyxTimePicker"],
  OnyxTextarea: ALL_FORM_ELEMENTS["OnyxTextarea"],
};

test("OnyxForm should inject show-error state", async ({ mount, page }) => {
  const ERROR_MESSAGE = "errrrrrrrrrror";

  // ARRANGE
  await mount(
    <OnyxForm showError>
      {Object.values(FORM_ELEMENTS_WITH_MESSAGE_AREA).map(({ component, props }) =>
        h(component as Component, {
          ...props,
          error: ERROR_MESSAGE,
          class: "data-test-root",
        }),
      )}
    </OnyxForm>,
  );

  // ASSERT
  await expectForAll(FORM_ELEMENTS_WITH_MESSAGE_AREA, page, async (element: Locator) => {
    const root = page.locator(".data-test-root").filter({ has: element });
    return expect(root).toContainText(ERROR_MESSAGE);
  });
});

test("OnyxForm should inject disabled state", async ({ mount, page }) => {
  // ARRANGE
  await mount(
    <OnyxForm>
      {Object.values(ALL_FORM_ELEMENTS).map(({ component, props }) =>
        h(component as Component, props),
      )}
    </OnyxForm>,
  );

  // ASSERT
  await expectForAll(ALL_FORM_ELEMENTS, page, async (element) => {
    if ((await element.textContent())?.includes("OnyxButton")) {
      // eslint-disable-next-line playwright/no-conditional-expect -- its easier to have some simple dynamic checks in the test
      return expect(element).toBeEnabled();
    }
    return Promise.all([expect(element).toBeEnabled(), expect(element).toBeEditable()]);
  });

  // ARRANGE
  await mount(
    <OnyxForm disabled>
      {Object.values(ALL_FORM_ELEMENTS).map(({ component, props }) =>
        h(component as Component, props),
      )}
    </OnyxForm>,
  );

  // ASSERT
  await expectForAll(ALL_FORM_ELEMENTS, page, (element) => expect(element).toBeDisabled());
});

test("OnyxForm should inject reservedMessage", async ({ mount, page }) => {
  const style = { display: "flex", "flex-direction": "column", "max-width": "10rem" } as const;

  // ARRANGE
  await mount(
    <OnyxForm reserveMessageSpace style={style}>
      {Object.values(ALL_FORM_ELEMENTS).map(({ component, props }) =>
        h(component as Component, props),
      )}
    </OnyxForm>,
  );

  // ASSERT
  await expect(page.locator(".onyx-form")).toHaveScreenshot("form-reserved-messages.png");

  // ARRANGE
  await mount(
    <OnyxForm style={style}>
      {Object.values(ALL_FORM_ELEMENTS).map(({ component, props }) =>
        h(component as Component, props),
      )}
    </OnyxForm>,
  );

  // ASSERT
  await expect(page.locator(".onyx-form")).toHaveScreenshot("form-default.png");
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
