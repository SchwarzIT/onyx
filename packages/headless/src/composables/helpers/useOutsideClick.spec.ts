import { beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { mockVueLifecycle } from "../../utils/vitest";
import { useOutsideClick } from "./useOutsideClick";

describe("useOutsideClick", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVueLifecycle();
  });

  it("should be defined", () => {
    expect(useOutsideClick).toBeDefined();
  });

  it("should detect outside clicks", async () => {
    // ARRANGE
    vi.useFakeTimers();
    const inside = ref(document.createElement("button"));
    document.body.appendChild(inside.value);
    const outside = ref(document.createElement("button"));
    document.body.appendChild(outside.value);

    const onOutsideClick = vi.fn();
    useOutsideClick({ inside, onOutsideClick });

    // ACT
    const event = new MouseEvent("click", { bubbles: true });
    outside.value.dispatchEvent(event);

    // ASSERT
    expect(onOutsideClick).toHaveBeenCalledTimes(1);
    expect(onOutsideClick).toBeCalledWith(event);

    // ACT
    outside.value.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "Tab" }));
    await vi.runAllTimersAsync();

    // ASSERT
    expect(
      onOutsideClick,
      "should not trigger on Tab press when checkOnTab option is disabled",
    ).toHaveBeenCalledTimes(1);
  });

  it("should detect outside clicks correctly for multiple inside elements", () => {
    // ARRANGE
    const inside = [document.createElement("button"), document.createElement("button")];
    inside.forEach((e) => document.body.appendChild(e));
    const outside = ref(document.createElement("button"));
    document.body.appendChild(outside.value);

    const onOutsideClick = vi.fn();
    useOutsideClick({ inside, onOutsideClick });
    // ACT
    const event = new MouseEvent("click", { bubbles: true });
    inside[0].dispatchEvent(event);
    inside[1].dispatchEvent(event);
    // ASSERT
    expect(onOutsideClick).not.toHaveBeenCalled();

    // ACT
    outside.value.dispatchEvent(event);
    // ASSERT
    expect(onOutsideClick).toHaveBeenCalledTimes(1);
    expect(onOutsideClick).toBeCalledWith(event);
  });

  it("should ignore outside clicks when disabled", async () => {
    // ARRANGE
    vi.useFakeTimers();
    const inside = ref(document.createElement("button"));
    document.body.appendChild(inside.value);
    const outside = ref(document.createElement("button"));
    document.body.appendChild(outside.value);

    const disabled = ref(false);
    const onOutsideClick = vi.fn();
    useOutsideClick({ inside, disabled, onOutsideClick });

    // ACT
    const event = new MouseEvent("click", { bubbles: true });
    outside.value.dispatchEvent(event);
    // ASSERT
    expect(onOutsideClick).toHaveBeenCalledTimes(1);
    expect(onOutsideClick).toBeCalledWith(event);

    // ACT
    disabled.value = true;
    await vi.runAllTimersAsync();
    const event2 = new MouseEvent("click", { bubbles: true });
    outside.value.dispatchEvent(event2);
    // ASSERT
    expect(onOutsideClick).toHaveBeenCalledTimes(1);
  });

  it("should detect outside tab via keyboard", async () => {
    // ARRANGE
    vi.useFakeTimers();
    const inside = ref(document.createElement("button"));
    document.body.appendChild(inside.value);
    const outside = ref(document.createElement("button"));
    document.body.appendChild(outside.value);

    const onOutsideClick = vi.fn();
    useOutsideClick({ inside, onOutsideClick, checkOnTab: true });

    // ACT
    const event = new KeyboardEvent("keydown", { bubbles: true, key: "Tab" });
    outside.value.dispatchEvent(event);
    await vi.runAllTimersAsync();

    // ASSERT
    expect(onOutsideClick).toHaveBeenCalledTimes(1);
    expect(onOutsideClick).toBeCalledWith(event);
  });
});
