import { describe, expect, test } from "vitest";
import { createNotificationsProvider } from "./useNotification";

describe("useNotification", () => {
  test("should create notifications provider", () => {
    const provider = createNotificationsProvider();

    expect(provider.notifications.value).toStrictEqual([]);

    provider.show({ headline: "Test 1", description: "Description 1" });
    provider.show({ headline: "Test 2", description: "Description 2" });

    expect(provider.notifications.value).toStrictEqual([
      {
        id: 2,
        headline: "Test 2",
        description: "Description 2",
        onClose: expect.any(Function),
      },
      {
        id: 1,
        headline: "Test 1",
        description: "Description 1",
        onClose: expect.any(Function),
      },
    ]);

    provider.remove(2);

    expect(provider.notifications.value).toStrictEqual([
      {
        id: 1,
        headline: "Test 1",
        description: "Description 1",
        onClose: expect.any(Function),
      },
    ]);

    provider.notifications.value[0].onClose();

    expect(provider.notifications.value).toStrictEqual([]);
  });
});
