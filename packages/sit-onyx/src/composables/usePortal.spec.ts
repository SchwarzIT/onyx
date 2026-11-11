import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { defineComponent, h, nextTick, ref, toRef, type PropType, type Ref } from "vue";
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
      slot: ref(() => slots.default?.()),
    });
    return () => null;
  },
});

describe("usePortal", () => {
  test("should register, update and remove slot in injected RenderMap", async () => {
    // ARRANGE
    const renderMap = new Map<PropertyKey, Ref<() => unknown>>();
    const key = ref<PropertyKey>("tab-1");
    const slot = ref((): string => "Slot content");

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

  test("should render active portal content in PortalOutlet and update when currentValue changes", async () => {
    // ARRANGE
    const activeKey = ref<PropertyKey>("tab-1");
    const dynamicContent1 = ref<string>("Content 1");

    const wrapper = mount(
      defineComponent({
        setup() {
          const { PortalOutlet } = usePortalOutlet({ activeKey });
          return () =>
            h("div", [
              h(TestPortalEntry, { portalKey: "tab-1" }, () => h("span", dynamicContent1.value)),
              h(TestPortalEntry, { portalKey: "tab-2" }, () => h("span", "Content 2")),
              h("div", { class: "outlet" }, [h(PortalOutlet)]),
            ]);
        },
      }),
    );

    const outlet = wrapper.find(".outlet");

    // ASSERT
    expect(outlet.text()).toBe("Content 1");

    // ACT
    dynamicContent1.value = "New Content 1";
    await nextTick();

    // ASSERT
    expect(outlet.text()).toBe("New Content 1");

    // ACT
    activeKey.value = "tab-2";
    await nextTick();

    // ASSERT
    expect(outlet.text()).toBe("Content 2");

    // ACT
    activeKey.value = "unknown";
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
          const { PortalOutlet } = usePortalOutlet({ activeKey: currentValue });
          return () =>
            h("div", [
              h(TestPortalEntry, { portalKey: "tab-1" }, () => "Content 1"),
              showSecond.value
                ? h(TestPortalEntry, { portalKey: "tab-2" }, () => "Content 2")
                : null,
              h("div", { class: "outlet" }, [h(PortalOutlet)]),
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
