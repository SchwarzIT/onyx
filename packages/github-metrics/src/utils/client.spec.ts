import { beforeEach, describe, expect, test, vi } from "vitest";
import { CreateClientOptions } from "../types.js";
import { createClient } from "./client.js";

const mockOptions: CreateClientOptions = {
  organization: "test-org",
  projectId: 1,
  authToken: "test-token",
  fields: {
    effort: "test-effort",
    iteration: "test-iteration",
    status: {
      fieldName: "test-status",
      options: {
        finished: "test-finished",
      },
    },
  },
};

export function createTestClient() {
  return createClient(mockOptions);
}

describe("createClient", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("should create client", () => {
    // ACT
    const client = createTestClient();

    // ASSERT
    expect(client.options).toBe(mockOptions);
  });

  describe("runQuery", () => {
    test("should return response data", async () => {
      // ARRANGE
      const client = createTestClient();

      const fetchSpy = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ data: { foo: "bar" } }),
      });

      client.options.fetch = fetchSpy;

      // ACT
      const data = await client.runQuery({ query: "test-query", variables: { a: "foo" } });

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
      const client = createTestClient();

      const fetchSpy = vi.fn().mockResolvedValue({
        ok: false,
        text: vi.fn().mockResolvedValue("test-error"),
      });

      client.options.fetch = fetchSpy;

      // ACT
      const queryPromise = client.runQuery({ query: "test-query", variables: { a: "foo" } });

      // ASSERT
      await expect(queryPromise).rejects.toThrowError("test-error");
    });

    test("should throw error if query contains errors", async () => {
      // ARRANGE
      const client = createTestClient();

      const fetchSpy = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ errors: ["test-error"] }),
      });

      client.options.fetch = fetchSpy;

      // ACT
      const queryPromise = client.runQuery({ query: "test-query", variables: { a: "foo" } });

      // ASSERT
      await expect(queryPromise).rejects.toThrowError("test-error");
    });
  });

  describe("getAllIterations", () => {
    test("should get all iterations", async () => {
      // ARRANGE
      const client = createTestClient();

      const fetchSpy = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          data: {
            organization: {
              projectV2: {
                field: {
                  configuration: {
                    completedIterations: [
                      {
                        id: "54cf5c95",
                        title: "#1 STARTING ONYXVER",
                        startDate: "2024-02-07",
                        duration: 14,
                      },
                      {
                        id: "381c7c80",
                        title: "#0 INCEPTIONYX",
                        startDate: "2024-01-24",
                        duration: 14,
                      },
                    ],
                    iterations: [
                      {
                        id: "b0b2ac79",
                        title: "#2 THE CHAMBER OF SECRONYX",
                        startDate: "2024-02-21",
                        duration: 14,
                      },
                      {
                        id: "00fcc982",
                        title: "#3 THE FELLOWSHIP OF THE RONYX",
                        startDate: "2024-03-06",
                        duration: 14,
                      },
                    ],
                  },
                },
              },
            },
          },
        }),
      });

      client.options.fetch = fetchSpy;

      // ACT
      const iterations = await client.getAllIterations();

      // ASSERT
      expect(iterations).toStrictEqual([
        {
          id: "381c7c80",
          title: "#0 INCEPTIONYX",
          startDate: "2024-01-24",
          duration: 14,
        },
        {
          id: "54cf5c95",
          title: "#1 STARTING ONYXVER",
          startDate: "2024-02-07",
          duration: 14,
        },
        {
          id: "b0b2ac79",
          title: "#2 THE CHAMBER OF SECRONYX",
          startDate: "2024-02-21",
          duration: 14,
        },
        {
          id: "00fcc982",
          title: "#3 THE FELLOWSHIP OF THE RONYX",
          startDate: "2024-03-06",
          duration: 14,
        },
      ]);
    });
  });

  describe("getAllItems", () => {
    test("should get and map all items", async () => {
      // ARRANGE
      const client = createTestClient();

      const fetchSpy = vi.fn().mockResolvedValue({
        ok: true,
        json: vi
          .fn()
          .mockResolvedValueOnce({
            data: {
              organization: {
                projectV2: {
                  items: {
                    nodes: [
                      {
                        content: {
                          issueType: {
                            name: "Bug",
                          },
                        },
                        fieldValues: {
                          nodes: [
                            {},
                            {
                              title: "Sprint 1",
                              __typename: "ProjectV2ItemFieldIterationValue",
                              field: {
                                name: "Sprint",
                              },
                            },
                            {
                              title: "#1",
                              __typename: "ProjectV2ItemFieldIterationValue",
                              field: {
                                name: mockOptions.fields.iteration,
                              },
                            },
                            {
                              number: 5,
                              __typename: "ProjectV2ItemFieldNumberValue",
                              field: {
                                name: "Effort",
                              },
                            },
                            {
                              number: 1.5,
                              __typename: "ProjectV2ItemFieldNumberValue",
                              field: {
                                name: mockOptions.fields.effort,
                              },
                            },
                            {
                              __typename: "ProjectV2ItemFieldSingleSelectValue",
                              name: mockOptions.fields.status.options.finished,
                              field: {
                                name: mockOptions.fields.status.fieldName,
                              },
                            },
                          ],
                        },
                      },
                    ],
                    pageInfo: {
                      hasNextPage: true,
                      endCursor: "test-cursor",
                    },
                  },
                },
              },
            },
          })
          .mockResolvedValueOnce({
            data: {
              organization: {
                projectV2: {
                  items: {
                    nodes: [
                      {
                        content: {},
                        fieldValues: {
                          nodes: [
                            {
                              title: "#2",
                              __typename: "ProjectV2ItemFieldIterationValue",
                              field: {
                                name: mockOptions.fields.iteration,
                              },
                            },
                            {
                              number: 42,
                              __typename: "ProjectV2ItemFieldNumberValue",
                              field: {
                                name: mockOptions.fields.effort,
                              },
                            },
                            {
                              __typename: "ProjectV2ItemFieldSingleSelectValue",
                              name: "something-else",
                              field: {
                                name: mockOptions.fields.status.fieldName,
                              },
                            },
                          ],
                        },
                      },
                    ],
                    pageInfo: {
                      hasNextPage: false,
                    },
                  },
                },
              },
            },
          }),
      });

      client.options.fetch = fetchSpy;

      // ACT
      const items = await client.getAllItems();

      // ASSERT
      expect(items).toStrictEqual([
        { iteration: "#1", effort: 1.5, type: "Bug", status: "finished" },
        { iteration: "#2", effort: 42 },
      ]);
    });
  });
});
