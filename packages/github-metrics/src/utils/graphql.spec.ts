import { beforeEach, describe, expect, test, vi } from "vitest";
import { runQuery } from "./graphql.js";

describe("runQuery", () => {
  beforeEach(() => {
    process.env.GITHUB_TOKEN = "test-token";
  });

  test("should return response data", async () => {
    // ARRANGE
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ data: { foo: "bar" } }),
    });

    // ACT
    const data = await runQuery({ query: "test-query", variables: { a: "foo" } }, fetchSpy);

    // ASSERT
    expect(data).toStrictEqual({ foo: "bar" });

    expect(fetchSpy).toHaveBeenCalledExactlyOnceWith(
      "https://api.github.com/graphql",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
        body: '{"query":"test-query","variables":{"a":"foo"}}',
      }),
    );
  });

  test("should throw error if response is not ok", async () => {
    // ARRANGE
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: false,
      text: vi.fn().mockResolvedValue("test-error"),
    });

    // ACT
    const queryPromise = runQuery({ query: "test-query", variables: { a: "foo" } }, fetchSpy);

    // ASSERT
    await expect(queryPromise).rejects.toThrowError("test-error");
  });

  test("should throw error if query contains errors", async () => {
    // ARRANGE
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ errors: ["test-error"] }),
    });

    // ACT
    const queryPromise = runQuery({ query: "test-query", variables: { a: "foo" } }, fetchSpy);

    // ASSERT
    await expect(queryPromise).rejects.toThrowError("test-error");
  });
});
