import fsPromises from "node:fs/promises";
import path from "node:path";
import { build, mergeConfig } from "vite";
import config from "../vite.config.js";

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

async function run() {
  process.env.NODE_ENV = "production";
  const outDir = path.join(import.meta.dirname, "..", config.build?.outDir ?? "dist");
  await emptyDirectory(outDir);

  await build(
    mergeConfig(
      config,
      {
        configFile: false,
        define: { "process.env.NODE_ENV": '"production"' },
      },
      true,
    ),
  );

  await build(
    mergeConfig(
      {
        ...config,
        build: {
          ...config.build,
          rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ["vue"],
            output: {
              // Provide global variables to use in the UMD build
              // for externalized deps
              globals: {
                vue: "Vue",
              },
            },
          },
        },
      },
      {
        configFile: false,
        define: { "process.env.NODE_ENV": '"production"' },
        build: {
          emptyOutDir: false,
          lib: {
            name: "sit-onyx",
            formats: ["umd"],
            fileName: () => "index.browser.js",
            cssFileName: "duplicate-to-be-deleted",
          },
        },
      },
      true,
    ),
  );

  process.env.NODE_ENV = "bundler";
  const bundlerConfig = mergeConfig(
    config,
    {
      mode: "bundler",
      configFile: false,
      build: {
        minify: false,
        sourcemap: true,
        emptyOutDir: false,
        lib: {
          formats: ["es"],
          fileName: () => "index.esm-bundler.js",
          cssFileName: "duplicate-to-be-deleted",
        },
      },
    },
    true,
  );
  await build(bundlerConfig);
  await fsPromises.rm(path.join(outDir, "duplicate-to-be-deleted.css"), { force: true });
}

run();
