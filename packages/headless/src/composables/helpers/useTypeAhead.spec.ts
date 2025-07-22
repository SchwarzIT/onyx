import { beforeAll, expect, test, vi } from "vitest";
import { useTypeAhead } from "./useTypeAhead.js";

beforeAll(() => {
  vi.useFakeTimers();
});

test("useTypeAhead", () => {
  const spy = vi.fn();
  const typeAhead = useTypeAhead(spy);

  typeAhead({ key: "a" });
  expect(spy).toHaveBeenCalledOnce();
  expect(spy).toHaveBeenLastCalledWith("a");

  typeAhead({ key: "Alt" });
  expect(spy).toHaveBeenCalledOnce();
  expect(spy).toHaveBeenLastCalledWith("a");

  typeAhead({ key: "b" });
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenLastCalledWith("ab");

  vi.runAllTimers();

  typeAhead({ key: "c" });
  expect(spy).toBeCalledTimes(3);
  expect(spy).toHaveBeenLastCalledWith("c");
});
