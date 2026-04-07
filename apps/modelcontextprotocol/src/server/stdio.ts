import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { error } from "node:console";
import { server } from "./server.js";

/**
 * MCP server running via stdio
 */
export const run = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  error("MCP Server running on stdio.");
};
