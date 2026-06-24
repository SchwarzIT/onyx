import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import packageJson from "../../package.json" with { type: "json" };
import { getComponentApi } from "../resources/get-component-api.js";
import { listComponents } from "../resources/list-components.js";
import { listCssDesignTokens } from "../resources/list-css-design-tokens.js";
import { listIcons } from "../resources/list-icons.js";
import { resourceToTool } from "../util/mcp-server.js";

const { name, version, description } = packageJson;

type CreateServerOptions = { resourcesAsTools: boolean };

export const resources = [listComponents, getComponentApi, listIcons, listCssDesignTokens];

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

  resources.forEach((resource) => server.registerResource(...resource));

  if (resourcesAsTools) {
    resources.map((r) => resourceToTool(r)).forEach((t) => server.registerTool(...t));
  }

  return server;
};
