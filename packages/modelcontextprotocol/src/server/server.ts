import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import packageJson from "../../package.json" with { type: "json" };
import { resources } from "../resources/index.js";
import type { RegisterableResource } from "../types.js";
import { resourceToTool } from "../util/mcp-server.js";

const { name, version, description } = packageJson;

type CreateServerOptions = { resourcesAsTools: boolean };

export const createServer = ({ resourcesAsTools }: CreateServerOptions) => {
  /**
   * Internal McpServer, which provides the MCP resources.
   */
  const server = new McpServer({
    name,
    version,
    description,
    websiteUrl: "https://onyx.schwarz",
  });

  resources.forEach((resource) =>
    // typescript is unable to merge the type parameters of the overloaded function
    server.registerResource(...(resource as RegisterableResource)),
  );

  if (resourcesAsTools) {
    resources.map((r) => resourceToTool(r)).forEach((t) => server.registerTool(...t));
  }

  return server;
};
