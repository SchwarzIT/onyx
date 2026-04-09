import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { type ComponentMeta, type MetaCheckerOptions } from "vue-component-meta";

export type RegisterableResource = Parameters<McpServer["registerResource"]>;

export type MetaSource = {
  exportName: string;
  displayName: string;
} & ComponentMeta &
  Exclude<MetaCheckerOptions["schema"], boolean>;
