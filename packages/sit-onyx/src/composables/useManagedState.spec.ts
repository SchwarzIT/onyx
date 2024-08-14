import { describe, expect, test, vi } from "vitest";
import { reactive, toRef } from "vue";
import { MANAGED_SYMBOL, useManagedState, type ManagedProp } from "./useManagedState";

describe("useManagedState", () => {
  const props = reactive({ custom: "customValue" as ManagedProp<string> });
  const emitSpy = vi.fn(() => {});
  const { state, isManaged } = useManagedState(
    toRef(() => props.custom),
    "",
    emitSpy,
  );

  test("should use prop value as initial value", () => {
    expect(state.value).toBe("customValue");
    expect(isManaged.value).toBeFalsy();
  });

  test("should reflect prop updates", () => {
    props.custom = "newValue";
    expect(state.value).toBe("newValue");
    expect(isManaged.value).toBeFalsy();
  });

  test("should emit and not update on state writes", () => {
    state.value = "updatedValue";
    expect(state.value).toBe("newValue");
    expect(isManaged.value).toBeFalsy();
    expect(emitSpy).toBeCalledTimes(1);
    expect(emitSpy).toBeCalledWith("updatedValue");
  });

  test("should use state value when prop is undefined", () => {
    props.custom = MANAGED_SYMBOL;
    expect(state.value).toBe("updatedValue");
    expect(isManaged.value).toBeTruthy();
  });
});
