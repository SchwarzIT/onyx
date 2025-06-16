import { describe, expect, test, vi } from "vitest";
import * as vue from "vue";
import { ROUTER_INJECTION_KEY, useLink, type ProvideRouterOptions } from "./useLink";

vi.mock("vue", async (importOriginal) => {
  const module = await importOriginal<typeof import("vue")>();

  return {
    ...module,
    inject: vi.fn(),
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
    // trailing slashes and whitespaces should be ignored
    { current: "/test/", link: "/test", active: true },
    { current: "/test", link: "/test/", active: true },
    { current: "/test   ", link: "   /test", active: true },
    // nested links: parent should be active if child page is currently active
    { current: "/parent/child", link: "/parent/child", active: true },
    { current: "/parent/child", link: "/parent", active: true },
    { current: "/parent", link: "/parent/child", active: false },
    // hashes
    { current: "#some-hash", link: "#some-hash", active: true },
    { current: { path: "/test", hash: "#some-hash" }, link: "#some-hash", active: true },
    { current: "#some-hash", link: "#some-other-hash", active: false },
    { current: { path: "/test", hash: "" }, link: "#some-hash", active: false },
  ])("should mark $link with current $current as active: $active", ({ current, link, active }) => {
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
