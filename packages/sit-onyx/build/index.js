import fsPromises from "node:fs/promises";
import path from "node:path";
import { register } from "tsx/esm/api";
import { build, mergeConfig } from "vite";

async function emptyDirectory(dirPath) {
  try {
    const files = await fsPromises.readdir(dirPath);

    const promises = files.map(async (file) =>
      fsPromises.rm(path.join(dirPath, file), { recursive: true, force: true }),
    );

    return Promise.all(promises);
  } catch (err) {
    console.error(`Error emptying directory: ${dirPath}`, err);
    throw err;
  }
}

/**
 * Loads vite.config.ts using tsx and returns its content.
 * This allows us to import ts files here without an explicit compile step.
 *
 * Note: This workaround is necessary because `tsx` has an issue with running/importing `sass`.
 * TODO: Convert this file to TypeScript and remove this workaround once https://github.com/privatenumber/tsx/issues/627 is fixed or https://github.com/vitejs/vite/pull/19182 is released.
 *
 */
async function loadViteConfig() {
  const unregister = register();
  const result = (await import("../vite.config.ts")).default;
  await unregister();
  return result;
}

/**
 * Vite build with focus on size and performance.
 */
async function buildForProduction(config) {
  process.env.NODE_ENV = "production";
  const prodConfig = mergeConfig(
    config,
    {
      build: {
        emptyOutDir: false,
      },
      configFile: false, // otherwise it will run vite build twice
      define: { "process.env.NODE_ENV": '"production"' }, // statically replace all "process.env.NODE_ENV" calls
    },
    true,
  );
  await build(prodConfig);
}

/**
 * Vite build with focus on developer experience.
 */
async function buildForBundler(config) {
  process.env.NODE_ENV = "development";
  const bundlerConfig = mergeConfig(
    config,
    {
      mode: "development",
      configFile: false, // otherwise it will run vite build twice
      build: {
        minify: false,
        sourcemap: true,
        emptyOutDir: false,
      },
    },
    true,
  );
  bundlerConfig.build.lib.formats = ["es"];
  bundlerConfig.build.lib.fileName = () => "index.esm-bundler.js";
  await build(bundlerConfig);
}

async function run() {
  const config = await loadViteConfig();
  const outDir = path.join(import.meta.dirname, "..", config.build?.outDir ?? "dist");
  await emptyDirectory(outDir);
  await buildForProduction(config);
  await buildForBundler(config);
}

run();
