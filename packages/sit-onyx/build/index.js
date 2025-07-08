// @ts-check
import fsPromises from "node:fs/promises";
import path from "node:path";
import { register } from "tsx/esm/api";
import { build, mergeConfig } from "vite";

const OUT_DIR = path.join(import.meta.dirname, "..", "dist");

async function emptyDirectory(dirPath) {
  try {
    // create the directory if it doesn't exist. `recursive` ensures that the command doesn't fail when it already exists.
    await fsPromises.mkdir(dirPath, { recursive: true });

    // empty the directory without removing it
    // keeping the directory alive ensures, that tools/server that rely on the directory will work correctly.
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
async function loadViteConfig(path) {
  const unregister = register();
  const result = (await import(path)).default;
  await unregister();
  return result;
}

async function buildFor({ vitePath, nodeEnv }) {
  const config = await loadViteConfig(vitePath);

  process.env.NODE_ENV = nodeEnv;
  const bundlerConfig = mergeConfig(
    config,
    {
      configFile: false, // otherwise it will run vite build twice
      build: {
        emptyOutDir: false, // don't delete the output directory automatically
        outDir: OUT_DIR,
      },
    },
    true,
  );
  await build(bundlerConfig);
}

async function run() {
  await emptyDirectory(OUT_DIR);

  const bundler = { vitePath: "../vite.config.ts", nodeEnv: "development" };
  await buildFor(bundler);

  const production = { vitePath: "../vite.config.prod.ts", nodeEnv: "production" };
  await buildFor(production);
}

run();
