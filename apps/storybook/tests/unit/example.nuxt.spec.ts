import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import Index from "~/pages/index.vue";

describe("example unit test", () => {
  test("home page should include headline", () => {
    const wrapper = mount(Index);
    expect(wrapper.text()).toContain("Welcome to Nuxt!");
  });
});
