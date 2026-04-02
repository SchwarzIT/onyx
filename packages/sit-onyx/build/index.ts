/* eslint no-console: "off" -- console is fine for node scripts */
import fsPromises from "node:fs/promises";
import path from "node:path";
import { build, mergeConfig } from "vite";

const OUT_DIR = path.join(import.meta.dirname, "..", "dist");

async function emptyDirectory(dirPath: string) {
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

async function buildFor({ vitePath, nodeEnv }: { vitePath: string; nodeEnv: string }) {
  const config = (await import(vitePath)).default;

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

await emptyDirectory(OUT_DIR);

const bundler = { vitePath: "../vite.config.ts", nodeEnv: "development" };
await buildFor(bundler);

const production = { vitePath: "../vite.config.prod.ts", nodeEnv: "production" };
await buildFor(production);
