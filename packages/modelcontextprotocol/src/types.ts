import type { McpServer, ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { AnySchema, ZodRawShapeCompat } from "@modelcontextprotocol/sdk/server/zod-compat";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types";
import { type ComponentMeta, type MetaCheckerOptions } from "vue-component-meta";

/**
 * Necessary Parameters to register a resource via `mcpServer.registerResource`
 */
export type RegisterableResource = Parameters<McpServer["registerResource"]>;
/**
 * Necessary Parameters to register a resource via `mcpServer.registerTool`
 */
export type RegisterableTool<
  OutputArgs extends ZodRawShapeCompat | AnySchema,
  InputArgs extends undefined | ZodRawShapeCompat | AnySchema = undefined,
> =
  // Unfortunately `Parameters<McpServer["registerTool"]>` results in the `never` type
  // Therefore we copied the type:
  [
    name: string,
    config: {
      title?: string;
      description?: string;
      inputSchema?: InputArgs;
      outputSchema?: OutputArgs;
      annotations?: ToolAnnotations;
      _meta?: Record<string, unknown>;
    },
    cb: ToolCallback<InputArgs>,
  ];

export type MetaSource = {
  exportName: string;
  displayName: string;
} & ComponentMeta &
  Exclude<MetaCheckerOptions["schema"], boolean>;
