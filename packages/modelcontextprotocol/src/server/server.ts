import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import packageJson from "../../package.json" with { type: "json" };
import { resources } from "../resources/index.js";
import type { RegisterableResource } from "../types.js";
import { resourceToTool } from "../util/mcp-server.js";

const { name, version, description } = packageJson;

type CreateServerOptions = { resourcesAsTools: boolean; exclude?: string };

export const createServer = ({ resourcesAsTools, exclude }: CreateServerOptions) => {
  /**
   * Internal McpServer, which provides the MCP resources.
   */
  const server = new McpServer({
    name,
    version,
    description,
    websiteUrl: "https://onyx.schwarz/development/packages/mcp.html",
  });

  for (const resource of resources) {
    const uri = typeof resource[1] === "string" ? resource[1] : resource[1].uriTemplate.expand({});
    if (exclude && new RegExp(exclude).test(uri)) {
      continue;
    }

    // typescript is unable to merge the type parameters of the overloaded function
    server.registerResource(...(resource as RegisterableResource));

    if (resourcesAsTools) {
      server.registerTool(...resourceToTool(resource));
    }
  }

  return server;
};
