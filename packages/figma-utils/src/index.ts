#!/usr/bin/env node

import { Command } from "commander";
import fs from "node:fs";
import { fileURLToPath, URL } from "node:url";
import { exportCommand } from "./commands/export.js";

const packageJson = JSON.parse(
  fs.readFileSync(fileURLToPath(new URL("../package.json", import.meta.url)), "utf8"),
);

const cli = new Command();
cli.version(packageJson.version, "-v, --version").description(packageJson.description);

const availableCommands = [exportCommand];

availableCommands.forEach((command) => cli.addCommand(command));

cli.parse();
