import type { StoryContextForEnhancers } from "storybook/internal/types";
import { expect, test } from "vitest";
import { enhanceEventArgTypes } from "./actions.js";

test("should enhance event arg types", () => {
  const argTypes = {
    someProp: {
      name: "someProp",
      table: { category: "props" },
    },
    click: {
      name: "click",
      table: { category: "events" },
    },
  } satisfies StoryContextForEnhancers["argTypes"];

  const result = enhanceEventArgTypes({
    argTypes,
  } as unknown as StoryContextForEnhancers);

  expect(result).toStrictEqual({
    ...argTypes,
    onClick: {
      name: "onClick",
      table: { disable: true },
      action: "click",
    },
  });
});
