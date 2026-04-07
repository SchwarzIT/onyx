import { log } from "node:console";
import { parseArgs, type ParseArgsOptionsConfig } from "node:util";
import packageJson from "../package.json" with { type: "json" };
import { run as http } from "./server/http.js";
import { server } from "./server/server.js";
import { run as stdio } from "./server/stdio.js";

const SUPPORTED_TRANSPORTS = {
  stdio,
  http,
};

type SupportedTransport = keyof typeof SUPPORTED_TRANSPORTS;

if (import.meta.main) {
  const options = {
    transport: {
      type: "string",
      short: "t",
      default: "stdio",
    },
    help: {
      type: "boolean",
      short: "h",
      default: false,
    },
    version: {
      type: "boolean",
      short: "v",
      default: false,
    },
  } satisfies ParseArgsOptionsConfig;

  const {
    values: { transport, version, help },
  } = parseArgs({
    args: process.argv.slice(2),
    options,
    allowPositionals: false,
    allowNegative: false,
    strict: true,
  });

  if (help) {
    log(`${packageJson.description}

Usage: 
    onyx-mcp [options]

Options:
 -t, --transport <stdio|http> Which kind of MCP server should be started (default: stdio)
 -h, --help                   This help text
 -v, --version                Show version number and quit`);
    process.exit(0);
  } else if (version) {
    log(packageJson.version);
    process.exit(0);
  } else {
    if (!Object.keys(SUPPORTED_TRANSPORTS).includes(transport)) {
      throw new Error(`Unsupported transport: ${transport}`);
    }

    await SUPPORTED_TRANSPORTS[transport as SupportedTransport]();
  }
}

export { http, server, stdio };
