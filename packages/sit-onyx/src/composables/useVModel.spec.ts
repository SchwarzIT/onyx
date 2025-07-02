import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import { nextTick, reactive } from "vue";
import type { Nullable } from "../types/index.js";
import { useVModel } from "./useVModel.js";
import UseVModelSpec from "./useVModel.spec.vue";

test("should update the internal state when the prop changes", async () => {
  const props = reactive({ modelValue: "default" as Nullable<string> });
  const emit = vi.fn();
  const modelValue = useVModel({
    key: "modelValue",
    props,
    emit,
  });
  expect(modelValue.value).toBe("default");

  props.modelValue = "changed";
  await nextTick();
  expect(modelValue.value).toBe("changed");

  props.modelValue = undefined;
  await nextTick();
  expect(modelValue.value).toBe(undefined);
});

test("should emit the 'update' event with the new value when the computed value is set", async () => {
  const props = reactive({ modelValue: "default" as Nullable<string> });
  const emit = vi.fn();
  const modelValue = useVModel({
    key: "modelValue",
    props,
    emit,
  });

  modelValue.value = "new value";
  await nextTick();
  expect(emit).toHaveBeenCalledWith("update:modelValue", "new value");

  modelValue.value = undefined;
  await nextTick();
  expect(emit).toHaveBeenCalledWith("update:modelValue", undefined);
});

test("should return the internal state value if the prop is controlled, otherwise return the prop value", async () => {
  const props = reactive({ modelValue: undefined as Nullable<string> });
  const emit = vi.fn();
  const modelValue = useVModel({
    key: "modelValue",
    props,
    emit,
    default: "internal",
  });
  expect(modelValue.value).toBe("internal");

  props.modelValue = "updated";
  await nextTick();
  expect(modelValue.value).toBe("updated");
});

test("should handle null prop values correctly", async () => {
  const props = reactive({ modelValue: null as Nullable<string> });
  const emit = vi.fn();
  const modelValue = useVModel({
    key: "modelValue",
    props,
    emit,
  });
  expect(modelValue.value).toBe(undefined);

  modelValue.value = "new value";
  await nextTick();
  expect(emit).toHaveBeenCalledWith("update:modelValue", "new value");

  props.modelValue = "updated value";
  await nextTick();
  expect(modelValue.value).toBe("updated value");
});

test("should handle undefined prop values correctly", async () => {
  const props = reactive({ modelValue: undefined as Nullable<string> });
  const emit = vi.fn();
  const modelValue = useVModel({
    key: "modelValue",
    props,
    emit,
  });
  expect(modelValue.value).toBe(undefined);

  modelValue.value = "new value";
  await nextTick();
  expect(emit).toHaveBeenCalledWith("update:modelValue", "new value");

  props.modelValue = "updated value";
  await nextTick();
  expect(modelValue.value).toBe("updated value");
});

test("should not emit an event if the new value is the same as the old value", async () => {
  const props = reactive({ modelValue: "default" as Nullable<string> });
  const emit = vi.fn();
  const modelValue = useVModel({
    key: "modelValue",
    props,
    emit,
  });
  expect(modelValue.value).toBe("default");

  modelValue.value = "default";
  await nextTick();
  expect(emit).not.toHaveBeenCalled();
});

test("should ignore if emits are not applied", async () => {
  const props = reactive({ modelValue: "default" as Nullable<string> });
  const emit = vi.fn();
  const modelValue = useVModel({
    key: "modelValue",
    props,
    emit,
  });

  expect(modelValue.value).toBe("default");

  modelValue.value = "internal";
  await nextTick();
  expect(modelValue.value).toBe("default");

  modelValue.value = "internal-again";
  props.modelValue = "new-prop-value";
  await nextTick();
  expect(modelValue.value).toBe("new-prop-value");

  modelValue.value = "internal-again-again";
  props.modelValue = undefined;
  await nextTick();
  expect(modelValue.value).toBe(undefined);
});

test("should use internal value when prop is not defined", async () => {
  const props = reactive({ modelValue: undefined as Nullable<string> });
  const emit = vi.fn();
  const modelValue = useVModel({
    key: "modelValue",
    props,
    emit,
    default: "default",
  });

  expect(modelValue.value).toBe("default");

  modelValue.value = "internal";
  await nextTick();
  expect(modelValue.value).toBe("internal");

  modelValue.value = "internal-2";
  await nextTick();
  expect(modelValue.value).toBe("internal-2");
});

describe("useVModel with a modelValue controlled from the parent", () => {
  const component = mount(UseVModelSpec);
  test("should use correct default value", async () => {
    expect(component.vm._modelValue).toBe("default");
    expect(component.emitted()).not.toHaveProperty("update:modelValue");
  });

  test("should set empty string value", async () => {
    component.setProps({ modelValue: "" });
    await nextTick();
    expect(component.vm._modelValue).toBe("");
    expect(component.emitted()).not.toHaveProperty("update:modelValue");
  });

  test("should use default when set to undefined", async () => {
    component.setProps({ modelValue: undefined });
    await nextTick();
    expect(component.vm._modelValue).toBe("default");
    expect(component.emitted()).not.toHaveProperty("update:modelValue");
  });

  test("should accept new prop after being set to undefined", async () => {
    component.setProps({ modelValue: "newValue" });
    await nextTick();
    expect(component.vm._modelValue).toBe("newValue");
    expect(component.emitted()).not.toHaveProperty("update:modelValue");
  });

  test("should keep old value and emit update event when updated internally", async () => {
    component.vm._modelValue = "test";
    await nextTick();
    expect(component.vm._modelValue).toBe("newValue");
    expect(component.emitted()).toHaveProperty("update:modelValue");
    expect(component.emitted()["update:modelValue"]).toHaveLength(1);
    expect(component.emitted()["update:modelValue"].at(0)).toEqual(["test"]);
  });

  test("should not emit again when update is applied", async () => {
    component.setProps({ modelValue: "test" });
    await nextTick();
    expect(component.vm._modelValue).toBe("test");
    expect(component.emitted()).toHaveProperty("update:modelValue");
    expect(component.emitted()["update:modelValue"]).toHaveLength(1);
  });

  test("should emit undefined", async () => {
    component.vm._modelValue = undefined as unknown as string;
    await nextTick();
    expect(component.emitted()).toHaveProperty("update:modelValue");
    expect(component.emitted()["update:modelValue"]).toHaveLength(2);
    expect(component.emitted()["update:modelValue"].at(1)).toEqual([undefined]);
  });

  test("should set undefined when updated from the outside after emit", async () => {
    component.setProps({ modelValue: undefined });
    await nextTick();
    expect(component.vm._modelValue).toBe("default");
  });
});

describe("useVModel with a modelValue that is not controlled", () => {
  const component = mount(UseVModelSpec);
  test("should use correct default value", async () => {
    expect(component.vm._modelValue).toBe("default");
    expect(component.emitted()).not.toHaveProperty("update:modelValue");
  });

  test("should emit and update value internally", async () => {
    component.vm._modelValue = "newValue";
    await nextTick();
    expect(component.vm._modelValue).toBe("newValue");
    expect(component.emitted()).toHaveProperty("update:modelValue");
    expect(component.emitted()["update:modelValue"]).toHaveLength(1);
    expect(component.emitted()["update:modelValue"].at(-1)).toEqual(["newValue"]);
  });

  test("should be able to set undefined", async () => {
    component.vm._modelValue = undefined as unknown as string;
    await nextTick();
    expect(component.vm._modelValue).toBe("default");
    expect(component.emitted()["update:modelValue"]).toHaveLength(2);
    expect(component.emitted()["update:modelValue"].at(-1)).toEqual([undefined]);
  });

  test("should be able to set null", async () => {
    component.vm._modelValue = null as unknown as string;
    await nextTick();
    expect(component.vm._modelValue).toBe("default");
    expect(component.emitted()["update:modelValue"]).toHaveLength(3);
    expect(component.emitted()["update:modelValue"].at(-1)).toEqual([null]);
  });
});

describe("noDefault useVModel with a modelValue that is not controlled", () => {
  const component = mount(UseVModelSpec);
  test("should use correct default value", async () => {
    expect(component.vm._noDefault).toBe(undefined);
    expect(component.emitted()).not.toHaveProperty("update:noDefault");
  });

  test("should emit and update value internally", async () => {
    component.vm._noDefault = "newValue";
    await nextTick();
    expect(component.vm._noDefault).toBe("newValue");
    expect(component.emitted()).toHaveProperty("update:noDefault");
    expect(component.emitted()["update:noDefault"]).toHaveLength(1);
    expect(component.emitted()["update:noDefault"].at(-1)).toEqual(["newValue"]);
  });

  test("should be able to be set to undefined", async () => {
    component.vm._noDefault = undefined as unknown as string;
    await nextTick();
    expect(component.vm._noDefault).toBe(undefined);
    expect(component.emitted()).toHaveProperty("update:noDefault");
    expect(component.emitted()["update:noDefault"]).toHaveLength(2);
    expect(component.emitted()["update:noDefault"].at(-1)).toEqual([undefined]);
  });

  test("should be able to be set to null", async () => {
    component.vm._noDefault = null as unknown as string;
    await nextTick();
    expect(component.vm._noDefault).toBe(undefined);
    expect(component.emitted()).toHaveProperty("update:noDefault");
    expect(component.emitted()["update:noDefault"]).toHaveLength(3);
    expect(component.emitted()["update:noDefault"].at(-1)).toEqual([null]);
  });

  test("should emit and update value again after null", async () => {
    component.vm._noDefault = "newValue2";
    await nextTick();
    expect(component.vm._noDefault).toBe("newValue2");
    expect(component.emitted()).toHaveProperty("update:noDefault");
    expect(component.emitted()["update:noDefault"]).toHaveLength(4);
    expect(component.emitted()["update:noDefault"].at(-1)).toEqual(["newValue2"]);
  });
});

describe("noDefault useVModel with a modelValue that is controlled by the parent", () => {
  const component = mount(UseVModelSpec);
  test("should use correct default value", async () => {
    expect(component.vm._noDefault).toBe(undefined);
    expect(component.emitted()).not.toHaveProperty("update:noDefault");
  });

  test("should update value from prop internally", async () => {
    component.setProps({ noDefault: "newValue" });
    await nextTick();
    expect(component.vm._noDefault).toBe("newValue");
    expect(component.emitted()).not.toHaveProperty("update:noDefault");
  });

  test("should be able to set undefined", async () => {
    component.setProps({ noDefault: undefined });
    await nextTick();
    expect(component.vm._noDefault).toBe(undefined);
    expect(component.emitted()).not.toHaveProperty("update:noDefault");
  });

  test("should be able to set null", async () => {
    component.setProps({ noDefault: null as unknown as string });
    await nextTick();
    expect(component.vm._noDefault).toBe(undefined);
    expect(component.emitted()).not.toHaveProperty("update:noDefault");
  });

  test("should emit and update value", async () => {
    component.vm._noDefault = "internal";
    await nextTick();
    expect(component.vm._noDefault).toBe("internal");
    expect(component.emitted()).toHaveProperty("update:noDefault");
    expect(component.emitted()["update:noDefault"]).toHaveLength(1);
    expect(component.emitted()["update:noDefault"].at(-1)).toEqual(["internal"]);
  });
});
