import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { log } from "node:console";
import { createServer } from "node:http";

/**
 * MCP server running as a http server.
 * `HOST` and `PORT` environment variable can be used to change the server settings.
 */
export const run = async (getServer: () => McpServer) => {
  const httpServer = createServer(async (req, res) => {
    // MCPServer and Transports cannot be reused and need to be created for each connection.
    const server = getServer();
    const transport = new StreamableHTTPServerTransport();
    res.on("close", () => {
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res);
  });

  const PORT = Number.parseInt(process.env["PORT"] ?? "3000");
  const HOST = process.env["HOST"] ?? "0.0.0.0";

  httpServer.listen(PORT, HOST);

  log(`MCP http server listening on ${HOST}:${PORT}.`);
};
