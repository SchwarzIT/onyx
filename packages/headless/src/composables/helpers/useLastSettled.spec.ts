import { expect, test, vi } from "vitest";
import { useLastSettled } from "./useLastSettled.js";

test("should be defined", () => {
  expect(useLastSettled).toBeDefined();
});

test("should execute cb after resolved promise", async () => {
  // ARRANGE
  vi.useFakeTimers();
  const spy = vi.fn();
  const { add, active } = useLastSettled(spy);
  expect(active.value).toBe(false);

  // ACT
  const resolved = Promise.resolve("result");
  add(resolved);

  // ASSERT
  expect(active.value).toBe(true);
  await vi.runAllTimersAsync();
  expect(spy).toHaveBeenCalledExactlyOnceWith(true, "result");
  expect(active.value).toBe(false);
});

test("should execute cb after rejected promise", async () => {
  // ARRANGE
  vi.useFakeTimers();
  const spy = vi.fn();
  const { add, active } = useLastSettled(spy);

  // ACT
  const rejected = Promise.reject("rejected");
  add(rejected);

  // ASSERT
  expect(active.value).toBe(true);
  await vi.runAllTimersAsync();
  expect(spy).toHaveBeenCalledExactlyOnceWith(false);
  expect(active.value).toBe(false);
});

test("should execute cb only after last added promise", async () => {
  // ARRANGE
  vi.useFakeTimers();
  const spy = vi.fn();
  const { add, active } = useLastSettled(spy);

  const first = Promise.withResolvers<string>();
  add(first.promise);
  const second = Promise.withResolvers<string>();
  add(second.promise);
  const last = Promise.withResolvers<string>();
  add(last.promise);

  // ACT
  first.resolve("first");

  // ASSERT
  await vi.runAllTimersAsync();
  expect(active.value).toBe(true);
  expect(spy).not.toHaveBeenCalled();

  // ACT
  last.resolve("last");

  // ASSERT
  await vi.runAllTimersAsync();
  expect(active.value).toBe(false);
  expect(spy).toHaveBeenCalledExactlyOnceWith(true, "last");

  // ACT
  second.resolve("second");

  // ASSERT
  await vi.runAllTimersAsync();
  expect(active.value).toBe(false);
  expect(spy).toHaveBeenCalledExactlyOnceWith(true, "last");
});
