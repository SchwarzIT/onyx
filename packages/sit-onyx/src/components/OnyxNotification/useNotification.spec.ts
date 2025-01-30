import { describe, expect, test } from "vitest";
import { createNotificationProvider } from "./useNotification";

describe("useNotification", () => {
  test("should create notification provider", () => {
    const provider = createNotificationProvider();

    expect(provider.notificationsQueue.value).toStrictEqual([]);

    provider.add({ headline: "Test 1", description: "Test 1" });
    provider.add({ headline: "Test 2", description: "Test 2" });

    expect(provider.notificationsQueue.value).toStrictEqual([
      {
        id: 2,
        headline: "Test 1",
        description: "Test 1",
        onClose: expect.any(Function),
      },
      {
        id: 3,
        headline: "Test 2",
        description: "Test 2",
        onClose: expect.any(Function),
      },
    ]);

    provider.remove(2);

    expect(provider.notificationsQueue.value).toStrictEqual([
      {
        id: 3,
        headline: "Test 2",
        description: "Test 2",
        onClose: expect.any(Function),
      },
    ]);

    provider.notificationsQueue.value[0].onClose();

    expect(provider.notificationsQueue.value).toStrictEqual([]);
  });
});
