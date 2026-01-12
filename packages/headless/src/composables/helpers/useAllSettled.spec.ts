import { expect, test, vi } from "vitest";
import { useAllSettled } from "./useAllSettled.js";

test("should be defined", () => {
  expect(useAllSettled).toBeDefined();
});

test("should execute cb after resolved promise", async () => {
  // ARRANGE
  vi.useFakeTimers();
  const spy = vi.fn();
  const { add, active } = useAllSettled(spy);
  expect(active.value).toBe(false);

  // ACT
  const resolved = Promise.resolve("result");
  add(resolved);

  // ASSERT
  expect(active.value).toBe(true);
  await vi.runAllTimersAsync();
  expect(spy).toHaveBeenCalledOnce();
  expect(active.value).toBe(false);
});

test("should execute cb after rejected promise", async () => {
  // ARRANGE
  vi.useFakeTimers();
  const spy = vi.fn();
  const { add, active } = useAllSettled(spy);
  expect(active.value).toBe(false);

  // ACT
  const resolved = Promise.reject("reject");
  add(resolved);

  // ASSERT
  expect(active.value).toBe(true);
  await vi.runAllTimersAsync();
  expect(spy).toHaveBeenCalledOnce();
  expect(active.value).toBe(false);
});

test("should execute cb only after all added promise are settled", async () => {
  // ARRANGE
  vi.useFakeTimers();
  const spy = vi.fn();
  const { add, active } = useAllSettled(spy);

  const first = Promise.withResolvers<string>();
  add(first.promise);
  const second = Promise.withResolvers<string>();
  add(second.promise);
  const third = Promise.withResolvers<string>();
  add(third.promise);

  // ACT
  first.resolve("first");

  // ASSERT
  await vi.runAllTimersAsync();
  expect(active.value).toBe(true);
  expect(spy).not.toHaveBeenCalled();

  // ACT
  third.resolve("last");

  // ASSERT
  await vi.runAllTimersAsync();
  expect(active.value).toBe(true);
  expect(spy).not.toHaveBeenCalled();

  // ACT
  second.resolve("second");

  // ASSERT
  await vi.runAllTimersAsync();
  expect(active.value).toBe(false);
  expect(spy).toHaveBeenCalledOnce();

  // ACT
  const newPromise = Promise.withResolvers<string>();
  add(newPromise.promise);

  // ASSERT
  await vi.runAllTimersAsync();
  expect(active.value).toBe(true);
  expect(spy).toHaveBeenCalledOnce();

  // ACT
  newPromise.resolve("resolved");

  // ASSERT
  await vi.runAllTimersAsync();
  expect(active.value).toBe(false);
  expect(spy).toHaveBeenCalledTimes(2);
});
