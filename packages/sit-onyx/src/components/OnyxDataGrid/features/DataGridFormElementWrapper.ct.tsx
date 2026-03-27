import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
import type { Component } from "vue";
import { expect, test } from "../../../playwright/a11y.js";
import OnyxDatePicker from "../../OnyxDatePicker/OnyxDatePicker.vue";
import OnyxDatePickerV2 from "../../OnyxDatePickerV2/OnyxDatePickerV2.vue";
import OnyxInput from "../../OnyxInput/OnyxInput.vue";
import OnyxSelect from "../../OnyxSelect/OnyxSelect.vue";
import type { SelectOption } from "../../OnyxSelect/types.js";
import OnyxSlider from "../../OnyxSlider/OnyxSlider.vue";
import OnyxStepper from "../../OnyxStepper/OnyxStepper.vue";
import OnyxSwitch from "../../OnyxSwitch/OnyxSwitch.vue";
import OnyxTable from "../../OnyxTable/OnyxTable.vue";
import OnyxTimePicker from "../../OnyxTimePicker/OnyxTimePicker.vue";
import DataGridFormElementWrapper from "./DataGridFormElementWrapper.vue";

const table = (...elements: unknown[]) => (
  <OnyxTable style={{ width: "10rem" }}>
    <template v-slot:head>
      <tr>
        <th>Head</th>
      </tr>
    </template>
    {elements.map((element) => (
      <tr>
        <td>{element}</td>
      </tr>
    ))}
  </OnyxTable>
);

test(`DataGridFormElementWrapper with OnyxInput`, async ({ mount, browserName }) => {
  // ARRANGE
  const onUpdateModelValue = createEmitSpy<typeof OnyxInput, "onUpdate:modelValue">();
  const TEST_VALUE = "test value";
  const LABEL = "test-label";
  const mounted = await mount(
    table(
      <DataGridFormElementWrapper
        is={OnyxInput}
        label={LABEL}
        modelValue={TEST_VALUE}
        onUpdate:modelValue={onUpdateModelValue}
      />,
    ),
  );

  const input = mounted.getByLabel(LABEL);
  await expect(input).toHaveValue(TEST_VALUE);

  const NEW_VALUE = "new value";
  await input.fill(NEW_VALUE);

  await test.step("expect emit", (step) => {
    step.skip(browserName === "firefox");
    expectEmit(onUpdateModelValue, 1, [NEW_VALUE]);
  });

  await test.step("on firefox emit is triggered twice", (step) => {
    step.skip(browserName !== "firefox");
    expectEmit(onUpdateModelValue, 2, [NEW_VALUE]);
  });
});

test(`DataGridFormElementWrapper with OnyxStepper`, async ({ mount }) => {
  // ARRANGE
  const onUpdateModelValue = createEmitSpy<typeof OnyxStepper, "onUpdate:modelValue">();
  const TEST_VALUE = 42;
  const LABEL = "test-label";
  const mounted = await mount(
    table(
      <DataGridFormElementWrapper
        is={OnyxStepper}
        label={LABEL}
        modelValue={TEST_VALUE}
        onUpdate:modelValue={onUpdateModelValue}
      />,
    ),
  );

  const input = mounted.getByLabel(LABEL);
  await expect(input).toHaveValue(`${TEST_VALUE}`);

  const NEW_VALUE = 69;
  await input.fill(`${NEW_VALUE}`);
  await input.blur();

  expectEmit(onUpdateModelValue, 1, [NEW_VALUE]);
});

test(`DataGridFormElementWrapper with OnyxDatePicker`, async ({ mount }) => {
  // ARRANGE
  const onUpdateModelValue = createEmitSpy<typeof OnyxDatePicker, "onUpdate:modelValue">();
  const TEST_VALUE = "2020-12-31";
  const LABEL = "test-label";
  const mounted = await mount(
    table(
      <DataGridFormElementWrapper
        is={OnyxDatePicker}
        label={LABEL}
        modelValue={TEST_VALUE}
        onUpdate:modelValue={onUpdateModelValue}
      />,
    ),
  );

  const input = mounted.getByLabel(LABEL);
  await expect(input).toHaveValue(TEST_VALUE);

  const NEW_VALUE = "2023-05-15";
  await input.fill(NEW_VALUE);
  await input.blur();

  expectEmit(onUpdateModelValue, 1, [NEW_VALUE]);
});

test(`DataGridFormElementWrapper with OnyxDatePickerV2`, async ({ mount }) => {
  // ARRANGE
  const onUpdateModelValue = createEmitSpy<typeof OnyxDatePickerV2, "onUpdate:modelValue">();
  const TEST_VALUE = "2020-12-31";
  const LABEL = "test-label";
  const mounted = await mount(
    table(
      <DataGridFormElementWrapper
        is={OnyxDatePickerV2}
        label={LABEL}
        modelValue={TEST_VALUE}
        onUpdate:modelValue={onUpdateModelValue}
      />,
    ),
  );

  const input = mounted.getByLabel(LABEL);
  await expect(input).toHaveValue("12/31/2020");

  await input.click();

  await mounted
    .getByRole("dialog", { name: "Calendar" })
    .getByRole("button", { name: "Monday, December 21" })
    .click();

  expectEmit(onUpdateModelValue, 1, [new Date(2020, 11, 21)]);
});

test(`DataGridFormElementWrapper with OnyxTimePicker`, async ({ mount }) => {
  // ARRANGE
  const onUpdateModelValue = createEmitSpy<typeof OnyxTimePicker, "onUpdate:modelValue">();
  const TEST_VALUE = "01:02";
  const LABEL = "test-label";
  const mounted = await mount(
    table(
      <DataGridFormElementWrapper
        is={OnyxTimePicker}
        label={LABEL}
        modelValue={TEST_VALUE}
        onUpdate:modelValue={onUpdateModelValue}
      />,
    ),
  );

  const input = mounted.getByLabel(LABEL);
  await expect(input).toHaveValue(TEST_VALUE);

  const NEW_VALUE = "12:34";
  await input.fill(NEW_VALUE);
  await input.blur();

  expectEmit(onUpdateModelValue, 1, [NEW_VALUE]);
});

test(`DataGridFormElementWrapper with OnyxSwitch`, async ({ mount }) => {
  // ARRANGE
  const onUpdateModelValue = createEmitSpy<typeof OnyxSwitch, "onUpdate:modelValue">();
  const TEST_VALUE = true;
  const LABEL = "test-label";
  const mounted = await mount(
    table(
      <DataGridFormElementWrapper
        is={OnyxSwitch}
        label={LABEL}
        modelValue={TEST_VALUE}
        onUpdate:modelValue={onUpdateModelValue}
      />,
    ),
  );

  const inputLabel = mounted.locator(".onyx-switch__click-area");
  const input = mounted.getByLabel(LABEL);
  await expect(input).toBeChecked();
  await inputLabel.click();

  expectEmit(onUpdateModelValue, 1, [false]);
});

test(`DataGridFormElementWrapper with OnyxSlider`, async ({ mount }) => {
  // ARRANGE
  const onUpdateModelValue: ReturnType<typeof createEmitSpy> = createEmitSpy();
  const TEST_VALUE = 0;
  const LABEL = "test-label";

  const mounted = await mount(
    table(
      <DataGridFormElementWrapper
        is={OnyxSlider as Component}
        label={LABEL}
        modelValue={TEST_VALUE}
        onUpdate:modelValue={onUpdateModelValue}
      />,
    ),
  );

  const rail = mounted.locator(".onyx-slider__rail");
  const input = mounted.getByLabel(LABEL);
  await expect(input).toHaveValue(`${TEST_VALUE}`);

  const { width, height } = (await rail.boundingBox())!;
  await rail.click({ position: { x: width * 0.5, y: height * 0.5 } });

  expectEmit(onUpdateModelValue, 1, [50]);
});

test(`DataGridFormElementWrapper with OnyxSelect`, async ({ mount }) => {
  // ARRANGE
  const onUpdateModelValue: ReturnType<typeof createEmitSpy> = createEmitSpy();
  const TEST_VALUE = 0;
  const LABEL = "test-label";

  const MOCK_OPTIONS = Array.from({ length: 5 }, (_, index) => ({
    value: index,
    label: `Test option ${index + 1}`,
  })) satisfies SelectOption[];

  const mounted = await mount(
    table(
      <DataGridFormElementWrapper
        is={OnyxSelect as Component}
        label={LABEL}
        listLabel={"test options"}
        modelValue={TEST_VALUE}
        onUpdate:modelValue={onUpdateModelValue}
        options={MOCK_OPTIONS}
      />,
    ),
  );

  const input = mounted.getByLabel(LABEL);
  await expect(input).toHaveValue(MOCK_OPTIONS.at(0)!.label);
  await input.click();

  const option = mounted.getByRole("option", { name: MOCK_OPTIONS.at(1)!.label });
  await option.click();
  expectEmit(onUpdateModelValue, 1, [1]);
});

test("DataGridFormElementWrapper Screenshot Test", async ({ mount }) => {
  const LABEL = "test-label";
  const mounted = await mount(
    table(
      <DataGridFormElementWrapper
        is={OnyxSelect as Component}
        label={LABEL}
        listLabel={"test options"}
        modelValue={0}
        options={[{ value: 0, label: `Test option 0` }]}
      />,
      <DataGridFormElementWrapper is={OnyxSlider as Component} label={LABEL} modelValue={33} />,
      <DataGridFormElementWrapper is={OnyxSwitch} label={LABEL} modelValue={true} />,
      <DataGridFormElementWrapper is={OnyxTimePicker} label={LABEL} modelValue={"01:02"} />,
      <DataGridFormElementWrapper is={OnyxDatePicker} label={LABEL} modelValue={"2020-12-31"} />,
      <DataGridFormElementWrapper is={OnyxDatePickerV2} label={LABEL} modelValue={"2020-12-31"} />,
      <DataGridFormElementWrapper is={OnyxStepper} label={LABEL} modelValue={12} />,
      <DataGridFormElementWrapper is={OnyxInput} label={LABEL} modelValue={"some text"} />,
    ),
  );
  await expect(mounted).toHaveScreenshot("form-element-wrapper-all-inputs.png");
});
