import { vi } from "vitest";

vi.mock("storybook-dark-mode", () => {
  return {
    DARK_MODE_EVENT_NAME: "DARK_MODE",
  } satisfies Partial<typeof import("storybook-dark-mode")>;
});
