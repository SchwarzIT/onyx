import { beforeAll, expect, test, vi } from "vitest";
import { useTypeAhead } from "./typeAhead";

beforeAll(() => {
  vi.useFakeTimers();
});

test("useTypeAhead", async () => {
  const spy = vi.fn();
  const typeAhead = useTypeAhead(spy);

  typeAhead({ key: "a" } as KeyboardEvent);
  expect(spy).toHaveBeenCalledOnce();
  expect(spy).toHaveBeenLastCalledWith("a");

  typeAhead({ key: "Alt" } as KeyboardEvent);
  expect(spy).toHaveBeenCalledOnce();
  expect(spy).toHaveBeenLastCalledWith("a");

  typeAhead({ key: "b" } as KeyboardEvent);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenLastCalledWith("ab");

  await vi.advanceTimersByTimeAsync(600);

  typeAhead({ key: "c" } as KeyboardEvent);
  expect(spy).toBeCalledTimes(3);
  expect(spy).toHaveBeenLastCalledWith("c");
});
