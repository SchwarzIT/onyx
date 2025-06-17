import { vi } from "vitest";

vi.mock("@vueless/storybook-dark-mode", () => {
  return {
    DARK_MODE_EVENT_NAME: "DARK_MODE",
  } satisfies Partial<typeof import("@vueless/storybook-dark-mode")>;
});
