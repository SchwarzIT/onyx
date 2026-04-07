import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {} from "node:fs/promises";
import packageJson from "../package.json" with { type: "json" };
import { getComponentApi } from "./resources/get-component-api.js";
import { listComponents } from "./resources/list-components.js";

const { name, version, description } = packageJson;

// Create server instance
const server = new McpServer({
  name,
  version,
  description,
  websiteUrl: "https://onyx.schwarz",
});

server.registerResource(...listComponents);
server.registerResource(...getComponentApi);
