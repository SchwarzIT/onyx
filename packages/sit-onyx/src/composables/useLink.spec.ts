import { describe, expect, test, vi } from "vitest";
import * as vue from "vue";
import { ROUTER_INJECTION_KEY, useLink, type ProvideRouterOptions } from "./useLink";

vi.mock("vue", async (importOriginal) => {
  const module = await importOriginal<typeof import("vue")>();

  return {
    ...module,
    inject: vi.fn((key) => {
      if (key !== ROUTER_INJECTION_KEY) return;
      return {
        currentRoute: vue.ref("/"),
        push: vi.fn(),
      } satisfies ProvideRouterOptions;
    }) satisfies typeof vue.inject,
  };
});

describe("useLink", () => {
  test.each([
    { current: "", link: "", active: true },
    { current: "", link: "/", active: true },
    { current: "/", link: "", active: true },
    { current: "", link: "/", active: true },
    { current: "", link: undefined, active: false },
    { current: "/", link: undefined, active: false },
    { current: "/test", link: "/test", active: true },
    { current: "/test/", link: "/test", active: true },
    { current: "/test", link: "/test/", active: true },
    { current: "/test   ", link: "   /test", active: true },
    { current: "/parent/child", link: "/parent/child", active: true },
    { current: "/parent/child", link: "/parent", active: true },
    { current: "/parent", link: "/parent/child", active: false },
  ])("should mark as active", ({ current, link, active }) => {
    vi.spyOn(vue, "inject").mockImplementation((key) => {
      if (key !== ROUTER_INJECTION_KEY) return;
      return {
        currentRoute: vue.ref(current),
        push: vi.fn(),
      } satisfies ProvideRouterOptions;
    });

    const { isActive } = useLink();

    expect(isActive.value(link)).toBe(active);
  });
});
