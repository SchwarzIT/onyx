import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import { defineComponent, h, nextTick, ref, toRef, type PropType } from "vue";
import { PORTAL_INJECTION_KEY, usePortal, usePortalOutlet } from "./usePortal.js";

const TestPortalEntry = defineComponent({
  props: {
    /**
     * Identifier for this entry
     */
    portalKey: {
      type: [String, Number, Symbol] as PropType<PropertyKey>,
      required: true,
    },
  },
  setup(props, { slots }) {
    usePortal({
      key: toRef(props, "portalKey"),
      slot: () => slots.default?.(),
    });
    return () => null;
  },
});

describe("usePortal", () => {
  test("should throw an error if No RenderMap was provided", () => {
    expect(() =>
      usePortal({
        key: ref("tab-1"),
        slot: vi.fn(),
      }),
    ).toThrow("No RenderMap was provided for `usePortal` to be used!");
  });

  test("should register, update and remove slot in injected RenderMap", async () => {
    // ARRANGE
    const renderMap = new Map<PropertyKey, () => unknown>();
    const key = ref<PropertyKey>("tab-1");
    const slot = vi.fn(() => "Slot content");

    const wrapper = mount(
      defineComponent({
        setup() {
          usePortal({ key, slot });
          return () => h("div");
        },
      }),
      {
        global: {
          provide: {
            [PORTAL_INJECTION_KEY]: renderMap,
          },
        },
      },
    );

    // ASSERT
    expect(renderMap.get("tab-1")).toBe(slot);

    // ACT
    key.value = "tab-2";
    await nextTick();

    // ASSERT
    expect(renderMap.get("tab-2")).toBe(slot);

    // ACT
    wrapper.unmount();

    // ASSERT
    expect(renderMap.has("tab-2")).toBe(false);
  });

  test("should render active portal content in PortalOut and update when currentValue changes", async () => {
    // ARRANGE
    const currentValue = ref<PropertyKey>("tab-1");

    const wrapper = mount(
      defineComponent({
        setup() {
          const { PortalOut } = usePortalOutlet({ currentValue });
          return () =>
            h("div", [
              h(TestPortalEntry, { portalKey: "tab-1" }, () => h("span", "Content 1")),
              h(TestPortalEntry, { portalKey: "tab-2" }, () => h("span", "Content 2")),
              h("div", { class: "outlet" }, [h(PortalOut)]),
            ]);
        },
      }),
    );

    const outlet = wrapper.find(".outlet");

    // ASSERT
    expect(outlet.text()).toBe("Content 1");

    // ACT
    currentValue.value = "tab-2";
    await nextTick();

    // ASSERT
    expect(outlet.text()).toBe("Content 2");

    // ACT
    currentValue.value = "unknown";
    await nextTick();

    // ASSERT
    expect(outlet.text()).toBe("");
  });

  test("should remove portal content when portal component is unmounted", async () => {
    // ARRANGE
    const currentValue = ref<PropertyKey>("tab-1");
    const showSecond = ref(true);

    const wrapper = mount(
      defineComponent({
        setup() {
          const { PortalOut } = usePortalOutlet({ currentValue });
          return () =>
            h("div", [
              h(TestPortalEntry, { portalKey: "tab-1" }, () => "Content 1"),
              showSecond.value
                ? h(TestPortalEntry, { portalKey: "tab-2" }, () => "Content 2")
                : null,
              h("div", { class: "outlet" }, [h(PortalOut)]),
            ]);
        },
      }),
    );

    const outlet = wrapper.find(".outlet");

    // ASSERT
    expect(outlet.text()).toBe("Content 1");

    // ACT
    currentValue.value = "tab-2";
    await nextTick();

    // ASSERT
    expect(outlet.text()).toBe("Content 2");

    // ACT
    showSecond.value = false;
    await nextTick();

    // ASSERT
    expect(outlet.text()).toBe("");
  });
});
