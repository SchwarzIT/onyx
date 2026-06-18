import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { error } from "node:console";

/**
 * MCP server running via stdio.
 * All logging has to use stderr, otherwise the logging to stdio will break the transport.
 */
export const run = async (getServer: () => McpServer) => {
  const transport = new StdioServerTransport();
  await getServer().connect(transport);
  error("MCP Server running on stdio.");
};
