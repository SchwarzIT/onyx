import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { reactive } from "vue";
import PropsForwardTestCaseSpec from "./PropsForwardTestCase.spec.vue";
import PropsTestCase, { type PropsTestCaseProps } from "./PropsTestCase.spec.vue";
import { useForwardProps } from "./props.js";

describe("useForwardProps", () => {
  test(`should work for empty props`, () => {
    // ARRANGE
    const forwarded = useForwardProps({}, PropsTestCase);

    // ASSERT
    expect(forwarded.value).toStrictEqual({});
  });

  test(`should not forward non-matching props`, () => {
    // ARRANGE
    const forwarded = useForwardProps(
      {
        "data-testid": "xyz",
        additional: "xyz2",
      },
      PropsTestCase,
    );

    // ASSERT
    expect(forwarded.value).toStrictEqual({});
  });

  test(`should only forward props of the target component`, () => {
    // ARRANGE
    const props = {
      string: "string",
      number: 99,
      object: { prop: 1 },
      "data-testid": "xyz",
      additional: "xyz2",
    };

    // ASSERT
    const forwarded = useForwardProps(props, PropsTestCase);
    expect(forwarded.value).toStrictEqual({
      string: "string",
      number: 99,
      object: { prop: 1 },
    } satisfies Omit<PropsTestCaseProps, "missing">);
  });

  test(`should update forwarded props reactively`, () => {
    // ARRANGE
    const props = reactive({
      string: "string1",
    });
    const forwarded = useForwardProps(props, PropsTestCase);

    // ASSERT
    expect(forwarded.value).toStrictEqual({
      string: "string1",
    });

    // ACT
    props.string = "string2";

    // ASSERT
    expect(forwarded.value).toStrictEqual({
      string: "string2",
    });
  });

  test(`should work with actual components`, () => {
    // ARRANGE

    const props = {
      string: "string",
      number: 99,
      object: { prop: 1 },
      "data-testid": "xyz",
      additional1: "additional1",
      additional2: "additional2",
    } as any; // eslint-disable-line @typescript-eslint/no-explicit-any -- `@vue/test-utils` seems to have issues with the prop typing, see https://github.com/vuejs/test-utils/issues/2294

    const unwantedCase = mount(PropsTestCase, { props });
    const withForwarding = mount(PropsForwardTestCaseSpec, { props });

    // ASSERT
    expect(unwantedCase.attributes()).toEqual({
      "data-testid": "xyz",
      additional1: "additional1",
      additional2: "additional2",
    });

    expect(withForwarding.attributes("additional1")).toBeUndefined();
    expect(withForwarding.attributes("additional2")).toBeUndefined();
    expect(withForwarding.attributes()).toEqual({ "data-testid": "xyz" });
  });
});
