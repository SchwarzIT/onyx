import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp";
import { describe, expect, test } from "vitest";
import type { RegisterableResource } from "../types.js";
import { resourceToTool } from "./mcp-server.js";

describe("resourceToTool", () => {
  test("should map resource with template to tool correctly", async () => {
    const testResource: RegisterableResource<true> = [
      "test-title",
      new ResourceTemplate("test://sit-onyx/{parameter-1}/{parameter-2}", {
        list: undefined,
      }),
      {
        title: "Test Title",
        description: "Test Description",
        mimeType: "text/markdown",
      },
      async (uri: URL) => ({
        contents: [
          {
            uri: uri.href,
            text: "# Test Text",
            mimeType: "text/markdown",
          },
        ],
      }),
    ];

    const [name, config, handler] = resourceToTool(testResource);

    expect(name).toBe("test-title");
    expect(config).toMatchObject({
      annotations: {
        destructiveHint: false,
        idempotentHint: true,
        readOnlyHint: true,
      },
      description: "Test Description",
      title: "Test Title",
    });
    expect(config.inputSchema).toHaveProperty("parameter-1");
    expect(config.inputSchema).toHaveProperty("parameter-2");
    await expect(
      handler({
        "parameter-1": "value-1",
        "parameter-2": "value-2",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Simplify testing
      } as any),
    ).resolves.toMatchObject({
      content: [
        {
          resource: {
            mimeType: "text/markdown",
            text: "# Test Text",
            uri: "test://sit-onyx/value-1/value-2",
          },
          type: "resource",
        },
      ],
    });
  });

  test("should map resource without template to tool correctly", async () => {
    const testResource: RegisterableResource<false> = [
      "test-title",
      "test://sit-onyx/static",
      {
        title: "Test Title",
        description: "Test Description",
        mimeType: "text/markdown",
      },
      async (uri: URL) => ({
        contents: [
          {
            uri: uri.href,
            text: "# Test Text",
            mimeType: "text/markdown",
          },
        ],
      }),
    ];

    const [name, config, handler] = resourceToTool(testResource);

    expect(name).toBe("test-title");
    expect(config).toMatchObject({
      annotations: {
        destructiveHint: false,
        idempotentHint: true,
        readOnlyHint: true,
      },
      description: "Test Description",
      title: "Test Title",
    });
    expect(config.inputSchema).toBeUndefined();
    await expect(
      handler({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Simplify testing
      } as any),
    ).resolves.toMatchObject({
      content: [
        {
          resource: {
            mimeType: "text/markdown",
            text: "# Test Text",
            uri: "test://sit-onyx/static",
          },
          type: "resource",
        },
      ],
    });
  });
});
