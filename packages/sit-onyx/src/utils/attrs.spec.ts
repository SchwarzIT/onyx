import { describe, expect, test, vi, type Mock } from "vitest";
import * as vue from "vue";
import { mergeVueProps, useRootAttrs } from "./attrs";

vi.mock("vue", async (importOriginal) => {
  const module = await importOriginal<typeof import("vue")>();

  return {
    ...module,
    useAttrs: vi.fn(),
  };
});

describe("useRootAttrs", () => {
  test.for([
    {
      title: "should put styles and class to root",
      attrs: { class: "class-1", style: "background: red;" },
      expectedRoot: { class: "class-1", style: "background: red;" },
      expectedRest: {},
    },
    {
      title: "should put other props to the rest",
      attrs: { class: "class-1", style: "background: red;", onClick: { name: "handler" } },
      expectedRoot: { class: "class-1", style: "background: red;" },
      expectedRest: { onClick: { name: "handler" } },
    },
    {
      title: "should work with only rest attrs",
      attrs: { onClick: { name: "handler" } },
      expectedRoot: {},
      expectedRest: { onClick: { name: "handler" } },
    },
    {
      title: "should work with no attrs",
      attrs: {},
      expectedRoot: {},
      expectedRest: {},
    },
  ])("$title", ({ attrs, expectedRoot, expectedRest }) => {
    const spy = vue.useAttrs as Mock;
    spy.mockImplementationOnce(() => attrs);

    const { rootAttrs, restAttrs } = useRootAttrs();
    expect(rootAttrs.value).toMatchObject(expectedRoot);
    expect(restAttrs.value).toMatchObject(expectedRest);
  });
});

describe("mergeVueProps", () => {
  test.for([
    { title: "should be able to work with no args", args: [], expected: {} },
    { title: "should be able to work with nullish args", args: [null, undefined], expected: {} },
    {
      title: "should merge as expected",
      args: [
        { class: "class-1", override: "old", other1: true },
        {},
        null,
        undefined,
        { class: "class-2 class-3", override: "new", other2: true },
      ],
      expected: { class: "class-1 class-2 class-3", override: "new", other1: true, other2: true },
    },
  ])("$title", ({ args, expected }) => {
    const result = mergeVueProps(...args);
    expect(result).toMatchObject(expected);
  });
});
