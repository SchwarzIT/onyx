#!/usr/bin/env node
import { Command } from "commander";
import fs from "node:fs";
import { fileURLToPath, URL } from "node:url";
import { importFlagsCommand } from "./commands/import-flags.js";
import { importIconsCommand } from "./commands/import-icons.js";
import { importVariablesCommand } from "./commands/import-variables.js";

const packageJson = JSON.parse(
  fs.readFileSync(fileURLToPath(new URL("../package.json", import.meta.url)), "utf8"),
);

const cli = new Command();
cli.version(packageJson.version, "-v, --version").description(packageJson.description);

const availableCommands = [importVariablesCommand, importIconsCommand, importFlagsCommand];
availableCommands.forEach((command) => cli.addCommand(command));

cli.parse();
