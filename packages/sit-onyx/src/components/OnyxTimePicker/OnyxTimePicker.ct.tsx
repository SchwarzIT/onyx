import { iconPlaceholder } from "@sit-onyx/icons";
import { createEmitSpy, expectEmit } from "@sit-onyx/playwright-utils";
import { DENSITIES } from "../../composables/density.js";
import { expect, test } from "../../playwright/a11y.js";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxTimePicker from "./OnyxTimePicker.vue";
import { TIME_PICKER_TYPES } from "./types.js";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Time picker",
    columns: ["HH:MM:SS", "HH:MM"],
    rows: ["closed"],
    component: (column) => {
      return (
        <OnyxTimePicker
          label="Test label"
          showSeconds={column === "HH:MM:SS"}
          style={{ width: "16rem", marginBottom: "6rem" }}
        />
      );
    },
  });

  for (const state of ["default", "with value"] as const) {
    executeMatrixScreenshotTest({
      name: `Time picker (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus", "skeleton", "disabled", "loading", "withAmPm"],
      component: (column, row) => {
        return (
          <OnyxTimePicker
            label="Test label"
            density={column}
            disabled={row === "disabled"}
            loading={row === "loading"}
            skeleton={row === "skeleton"}
            showAmPm={row === "withAmPm"}
            modelValue={state === "with value" ? "12:11" : undefined}
            style={{ width: "16rem" }}
          />
        );
      },
      hooks: {
        beforeEach: async (component, _page, _column, row) => {
          const input = component.getByLabel("Test label");
          if (row === "hover") await input.hover();
          if (row === "focus") await input.focus();
        },
      },
    });
  }
  for (const state of ["default", "with value"] as const) {
    executeMatrixScreenshotTest({
      name: `Time picker range (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus", "open", "skeleton", "disabled", "loading", "withAmPm"],
      component: (column, row) => {
        return (
          <OnyxTimePicker
            label="Test label"
            type="range"
            density={column}
            disabled={row === "disabled"}
            loading={row === "loading"}
            skeleton={row === "skeleton"}
            showAmPm={row === "withAmPm"}
            modelValue={state === "with value" ? { from: "12:11", to: "13:11" } : undefined}
            style={{
              width: "16rem",
              marginBottom: row === "open" || row === "withAmPm" ? "18rem" : "0rem",
            }}
          />
        );
      },
      hooks: {
        beforeEach: async (component, _page, _column, row) => {
          const input = component.getByLabel("Test label");
          if (row === "hover") await input.hover();
          if (row === "focus") await input.focus();
          if (row === "open" || row === "withAmPm") {
            await input.click();
          }
        },
      },
    });
  }

  for (const state of ["default", "with value"] as const) {
    executeMatrixScreenshotTest({
      name: `Time picker select (${state})`,
      columns: DENSITIES,
      rows: ["default", "hover", "focus", "open", "skeleton", "disabled", "loading"],
      component: (column, row) => {
        return (
          <OnyxTimePicker
            type="select"
            min="8:00"
            max="10:00"
            label="Test label"
            density={column}
            disabled={row === "disabled"}
            loading={row === "loading"}
            skeleton={row === "skeleton"}
            modelValue={state === "with value" ? "09:30" : undefined}
            style={{ width: "16rem", marginBottom: row === "open" ? "16rem" : "0rem" }}
          />
        );
      },
      hooks: {
        beforeEach: async (component, _page, _column, row) => {
          const input = component.getByRole("combobox", { name: "Test label" });
          if (row === "hover") await input.hover();
          if (row === "focus") await input.focus();
          if (row === "open") {
            await input.click();
          }
        },
      },
    });
  }
});

test.describe("Screenshot tests (slots)", () => {
  executeMatrixScreenshotTest({
    name: "Time picker (slots)",
    columns: ["default"],
    rows: TIME_PICKER_TYPES,
    component: (column, row) => {
      return (
        <OnyxTimePicker label="Test label" style={{ width: "24rem" }} type={row}>
          <template v-slot:leading>
            <span style={{ paddingInline: "var(--onyx-form-element-v2-padding-inline)" }}>
              Leading
            </span>
          </template>

          <template v-slot:leadingIcons>
            <OnyxIcon icon={iconPlaceholder} />
          </template>

          <template v-slot:trailingIcons>
            <OnyxIcon icon={iconPlaceholder} />
          </template>

          <template v-slot:trailing>
            <span style={{ paddingInline: "var(--onyx-form-element-v2-padding-inline)" }}>
              Leading
            </span>
          </template>

          <template v-slot:bottomRight>Bottom right</template>
        </OnyxTimePicker>
      );
    },
  });
});

test.describe("Keyboard tests", () => {
  test("keyboard navigation", async ({ mount }) => {
    const component = await mount(<OnyxTimePicker label="Test label" type="range" />);
    const input = component.getByLabel("Test label");

    const hourInput = component.getByRole("spinbutton", { name: "Hour" }).first();
    const minuteInput = component.getByRole("spinbutton", { name: "Minute" }).first();

    await input.click();

    await expect(hourInput).toBeVisible();
    await expect(minuteInput).toBeVisible();
    await expect(hourInput).toBeFocused();

    //keyboard navigation
    await component.press("ArrowRight");
    await expect(minuteInput).toBeFocused();
    await component.press("ArrowLeft");

    await expect(hourInput).toBeFocused();

    await component.press("ArrowUp");

    await expect(hourInput).toHaveValue("1");

    await component.press("ArrowDown");
    await expect(hourInput).toHaveValue("0");
    await component.press("ArrowDown");
    await expect(hourInput).toHaveValue("0");

    await component.press("ArrowRight");
    await component.press("ArrowRight");
    await component.press("ArrowRight");
    await component.press("ArrowRight");

    await expect(hourInput).toBeHidden();
    await expect(minuteInput).toBeHidden();

    //should close if input is clicked
    await input.click();
    await expect(hourInput).toBeVisible();
    await expect(minuteInput).toBeVisible();
    await expect(hourInput).toBeFocused();

    await input.click();
    await expect(hourInput).toBeHidden();
    await expect(minuteInput).toBeHidden();

    // ACT
    await input.click();
    await hourInput.fill("15");

    // ASSERT
    await expect(minuteInput, "should focus next segment after entering a value").toBeFocused();
  });
});

test("should truncate milliseconds and timezones from modelValue, min, and max", async ({
  mount,
}) => {
  // ARRANGE
  const component = await mount(OnyxTimePicker, {
    props: {
      showSeconds: true,
      label: "Time picker",
      modelValue: "08:11:21.30Z",
      min: "07:30:30.30Z",
      max: "17:30:30.11111",
    },
  });

  const input = component.getByRole("textbox", { name: "Time picker" });

  // ASSERT
  await expect(input).toHaveAttribute("min", "07:30:30");
  await expect(input).toHaveAttribute("max", "17:30:30");
  await expect(input).toHaveValue("08:11:21");

  // ACT
  await component.update({ props: { showSeconds: false } });

  // ASSERT
  await expect(input).toHaveAttribute("min", "07:30");
  await expect(input).toHaveAttribute("max", "17:30");
  await expect(input).toHaveValue("08:11");
});

test("should emit validityChange", async ({ mount }) => {
  // ARRANGE
  const onValidityChange = createEmitSpy<typeof OnyxTimePicker, "validityChange">();

  const component = await mount(OnyxTimePicker, {
    props: {
      label: "Test label",
      required: true,
      onValidityChange,
    },
  });

  // ACT
  await component.update({ props: { modelValue: "12:30" } });

  // ASSERT
  await expectEmit(onValidityChange, 2, [expect.objectContaining({ valid: true })]);

  // ACT
  await component.update({ props: { modelValue: "" } });

  // ASSERT
  await expectEmit(onValidityChange, 3, [expect.objectContaining({ valid: false })]);
});
