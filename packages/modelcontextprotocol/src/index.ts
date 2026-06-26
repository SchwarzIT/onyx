#!/usr/bin/env node
import { log } from "node:console";
import { stat } from "node:fs/promises";
import { parseArgs, type ParseArgsOptionsConfig } from "node:util";
import packageJson from "../package.json" with { type: "json" };
import { writeSkillFiles } from "./resources/skills.js";
import { run as http } from "./server/http.js";
import { createServer } from "./server/server.js";
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
    resourcesAsTools: {
      type: "boolean",
      short: "r",
      default: false,
    },
    writeSkills: {
      type: "string",
      short: "w",
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
    values: { transport, version, help, resourcesAsTools, writeSkills },
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
 -t, --transport <"stdio"|"http"> Which kind of MCP server should be started (default: stdio). 
                                  The "http" transport considers PORT and HOST environment variables, when starting the server.
 -r, --resourcesAsTools           Some LLM Coding Assistants (e.g. Gemini) are not able to to use MCP resources (yet). 
                                  This setting makes resources also available as tools to support these Coding Assistants.
 -w, --write-skills <directory>     Write resources to SKILL.md files in the specified directory.
 -h, --help                       Show this help text and quit.
 -v, --version                    Show version number and quit.`);
    process.exit(0);
  } else if (version) {
    log(packageJson.version);
    process.exit(0);
  } else if (writeSkills) {
    const stats = await stat(writeSkills);
    if (!stats.isDirectory()) {
      throw new Error(`${writeSkills} is not a directory`);
    }
    await writeSkillFiles(writeSkills);
    process.exit(0);
  } else {
    if (!Object.keys(SUPPORTED_TRANSPORTS).includes(transport)) {
      throw new Error(`Unsupported transport: ${transport}`);
    }
    const getServer = () => createServer({ resourcesAsTools });
    await SUPPORTED_TRANSPORTS[transport as SupportedTransport](getServer);
  }
}

export { createServer, http, stdio };
