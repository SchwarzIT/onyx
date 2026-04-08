import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { log } from "node:console";
import { randomUUID } from "node:crypto";
import { createServer } from "node:http";
import { server } from "./server.js";

/**
 * MCP server running as a http server.
 * `HOST` and `PORT` environment variable can be used to change the server settings.
 */
export const run = async () => {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
  });

  await server.connect(transport);

  const httpServer = createServer(transport.handleRequest);

  const PORT = Number.parseInt(process.env["PORT"] ?? "3000");
  const HOST = process.env["HOST"] ?? "0.0.0.0";

  httpServer.listen(PORT, HOST);

  log(`MCP http server listening on ${HOST}:${PORT}.`);
};
