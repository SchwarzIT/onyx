//
// This file is only a temporary copy of the improved source code generation for Storybook.
// It is intended to be deleted once its officially released in Storybook itself, see:
// https://github.com/storybookjs/storybook/pull/27194
//
import { expect, test } from "vitest";
import { h } from "vue";
import {
  extractSlotNames,
  generatePropsSourceCode,
  generateSlotSourceCode,
} from "./source-code-generator";

test("should generate source code for props", () => {
  const slots = ["default", "testSlot"];

  const code = generatePropsSourceCode(
    {
      a: "foo",
      b: '"I am double quoted"',
      c: 42,
      d: true,
      e: false,
      f: [1, 2, 3],
      g: {
        g1: "foo",
        b2: 42,
      },
      h: undefined,
      i: null,
      j: "",
      k: BigInt(9007199254740991),
      l: Symbol(),
      m: Symbol("foo"),
      default: "default slot",
      testSlot: "test slot",
    },
    slots,
  );

  expect(code).toBe(
    `a="foo" b='"I am double quoted"' :c="42" d :e="false" :f="[1,2,3]" :g="{'g1':'foo','b2':42}" :k="BigInt(9007199254740991)" :l="Symbol()" :m="Symbol('foo')"`,
  );
});

test("should generate source code for slots", () => {
  // slot code generator should support primitive values (string, number etc.)
  // but also VNodes (e.g. created using h()) so custom Vue components can also be used
  // inside slots with proper generated code

  const slots = {
    default: "default content",
    a: "a content",
    b: 42,
    c: true,
    // single VNode without props
    d: h("div", "d content"),
    // VNode with props and single child
    e: h("div", { style: "color:red" }, "e content"),
    // VNode with props and single child returned as getter
    f: h("div", { style: "color:red" }, () => "f content"),
    // VNode with multiple children
    g: h("div", { style: "color:red" }, [
      "child 1",
      h("span", { style: "color:green" }, "child 2"),
    ]),
    // VNode multiple children but returned as getter
    h: h("div", { style: "color:red" }, () => [
      "child 1",
      h("span", { style: "color:green" }, "child 2"),
    ]),
    // VNode with multiple and nested children
    i: h("div", { style: "color:red" }, [
      "child 1",
      h("span", { style: "color:green" }, ["nested child 1", h("p", "nested child 2")]),
    ]),
    j: ["child 1", "child 2"],
    k: null,
    l: { foo: "bar" },
    m: BigInt(9007199254740991),
  };

  const expectedCode = `default content

<template #a>a content</template>

<template #b>42</template>

<template #c>true</template>

<template #d><div>d content</div></template>

<template #e><div style="color:red">e content</div></template>

<template #f><div style="color:red">f content</div></template>

<template #g><div style="color:red">child 1
<span style="color:green">child 2</span></div></template>

<template #h><div style="color:red">child 1
<span style="color:green">child 2</span></div></template>

<template #i><div style="color:red">child 1
<span style="color:green">nested child 1
<p>nested child 2</p></span></div></template>

<template #j>child 1
child 2</template>

<template #l>{"foo":"bar"}</template>

<template #m>{{ BigInt(9007199254740991) }}</template>`;

  let actualCode = generateSlotSourceCode(slots, Object.keys(slots));
  expect(actualCode).toBe(expectedCode);

  // should generate the same code if getters/functions are used to return the slot content
  const slotsWithGetters = Object.entries(slots).reduce<
    Record<string, () => (typeof slots)[keyof typeof slots]>
  >((obj, [slotName, value]) => {
    obj[slotName] = () => value;
    return obj;
  }, {});

  actualCode = generateSlotSourceCode(slotsWithGetters, Object.keys(slotsWithGetters));
  expect(actualCode).toBe(expectedCode);
});

test.each([
  { __docgenInfo: "invalid-value", slotNames: [] },
  { __docgenInfo: {}, slotNames: [] },
  { __docgenInfo: { slots: "invalid-value" }, slotNames: [] },
  { __docgenInfo: { slots: ["invalid-value"] }, slotNames: [] },
  {
    __docgenInfo: { slots: [{ name: "slot-1" }, { name: "slot-2" }, { notName: "slot-3" }] },
    slotNames: ["slot-1", "slot-2"],
  },
])("should extract slots names from __docgenInfo", ({ __docgenInfo, slotNames }) => {
  const actualNames = extractSlotNames({ __docgenInfo });
  expect(actualNames).toStrictEqual(slotNames);
});
