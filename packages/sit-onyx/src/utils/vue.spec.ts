import { describe, expect, test } from "vitest";
import { h, type VNode } from "vue";
import OnyxButton from "../components/OnyxButton/OnyxButton.vue";
import OnyxHeadline from "../components/OnyxHeadline/OnyxHeadline.vue";
import { filterVNodesByComponent } from "./vue";

describe("filterVNodesByComponent", () => {
  test("should filter VNodes by component", () => {
    const headlineNode = h(OnyxHeadline, "Test");
    const vnodes: VNode[] = [h("div"), headlineNode, h(OnyxButton)];

    let filteredNodes = filterVNodesByComponent(vnodes, OnyxHeadline);
    expect(filteredNodes).toStrictEqual([headlineNode]);

    // should work when using v-for node
    const wrapperNode = h("Test", vnodes);
    wrapperNode.type = Symbol("v-fgt").toString();

    filteredNodes = filterVNodesByComponent([wrapperNode], OnyxHeadline);
    expect(filteredNodes).toStrictEqual([headlineNode]);
  });
});
