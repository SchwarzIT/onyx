import { describe, expect, test, vi } from "vitest";
import * as graphql from "../utils/graphql.js";
import { getMeanStorySize } from "./meanStorySize.js";

const getMockData = () => ({
  organization: {
    projectV2: {
      items: {
        nodes: [
          { fieldValueByName: null },
          { fieldValueByName: { number: 1 } },
          { fieldValueByName: { number: 2 } },
        ],
        pageInfo: {
          hasNextPage: false,
          endCursor: undefined as string | undefined,
        },
      },
    },
  },
});

describe("meanStorySize", () => {
  test("should calculate the mean story size", async () => {
    // ARRANGE
    const runQuerySpy = vi.spyOn(graphql, "runQuery");
    runQuerySpy.mockResolvedValue(getMockData());

    // ACT
    const meanSize = await getMeanStorySize({
      organization: "test",
      projectId: 1,
      field: "test-field",
    });

    // ASSERT
    expect(meanSize).toBe(1.5);
  });

  test("should calculate the mean story size when response is empty", async () => {
    // ARRANGE
    const runQuerySpy = vi.spyOn(graphql, "runQuery");
    const data = getMockData();
    data.organization.projectV2.items.nodes = [];
    runQuerySpy.mockResolvedValue(data);

    // ACT
    const meanSize = await getMeanStorySize({
      organization: "test",
      projectId: 1,
      field: "test-field",
    });

    // ASSERT
    expect(meanSize).toBe(0);
  });

  test("should consider all items if pagination exists", async () => {
    // ARRANGE
    const runQuerySpy = vi.spyOn(graphql, "runQuery");

    const data1 = getMockData();
    data1.organization.projectV2.items.nodes = [data1.organization.projectV2.items.nodes[0]];
    data1.organization.projectV2.items.pageInfo = { hasNextPage: true, endCursor: "cursor-1" };

    const data2 = getMockData();
    data2.organization.projectV2.items.nodes = [data2.organization.projectV2.items.nodes[1]];
    data2.organization.projectV2.items.pageInfo = { hasNextPage: true, endCursor: "cursor-2" };

    const data3 = getMockData();
    data3.organization.projectV2.items.nodes = [data3.organization.projectV2.items.nodes[2]];

    runQuerySpy
      .mockResolvedValueOnce(data1)
      .mockResolvedValueOnce(data2)
      .mockResolvedValueOnce(data3);

    // ACT
    const meanSize = await getMeanStorySize({
      organization: "test",
      projectId: 1,
      field: "test-field",
    });

    // ASSERT
    expect(meanSize).toBe(1.5);
  });
});
