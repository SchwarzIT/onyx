import { describe, expect, test, vi } from "vitest";
import { useManagedState } from "./useManagedState";
import { reactive, toRef } from "vue";

describe("useManagedState", () => {
  const props = reactive({ custom: "customValue" as string | undefined });
  const emitSpy = vi.fn(() => {});
  const state = useManagedState(
    toRef(() => props.custom),
    "",
    emitSpy,
  );

  test("should use prop value as initial value", () => {
    expect(state.value).toBe("customValue");
  });

  test("should reflect prop updates", () => {
    props.custom = "newValue";
    expect(state.value).toBe("newValue");
  });

  test("should emit and not update on state writes", () => {
    state.value = "updatedValue";
    expect(state.value).toBe("newValue");
    expect(emitSpy).toBeCalledTimes(1);
    expect(emitSpy).toBeCalledWith("updatedValue");
  });

  test("should use state value when prop is undefined", () => {
    props.custom = undefined;
    expect(state.value).toBe("updatedValue");
  });
});
