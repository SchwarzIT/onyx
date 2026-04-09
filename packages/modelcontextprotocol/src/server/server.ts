import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import packageJson from "../../package.json" with { type: "json" };
import { getComponentApi } from "../resources/get-component-api.js";
import { listComponents } from "../resources/list-components.js";

const { name, version, description } = packageJson;

/**
 * Internal McpServer, which provides the MCP resources.
 */
const server = new McpServer({
  name,
  version,
  description,
  websiteUrl: "https://onyx.schwarz",
});

server.registerResource(...listComponents);
server.registerResource(...getComponentApi);

export { server };
