import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import {
  addComponentsDir,
  addImportsDir,
  createResolver,
  defineNuxtModule,
  useLogger,
  type NuxtLogger,
} from "@nuxt/kit";
import { INTERNAL_THEMES } from "./runtime/utils/themes.js";

export default defineNuxtModule({
  meta: {
    name: "@sit-onyx/nuxt-internal",
  },
  moduleDependencies: {
    "nuxt-auth-utils": {},
  },
  defaults: {},
  setup(_, nuxt) {
    const logger = useLogger("@sit-onyx/nuxt-internal");
    const resolver = createResolver(import.meta.url);

    addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      pathPrefix: false,
      ignore: ["/internal"],
    });
    addImportsDir(resolver.resolve("./runtime/composables"));

    // install Schwarz internal theme npm packages or add stubs if not available in the user's network
    nuxt.hook("build:before", async () => {
      await installSchwarzThemes(nuxt.options.rootDir, nuxt.options.buildDir, logger);
    });
  },
});

/**
 * Install all Schwarz internal theme npm packages or adds stubs if they are not available in the
 * user's network.
 *
 * @param rootDir Root directory of the Nuxt application
 * @param buildDir Nuxt build directory (.nuxt folder) of the application
 */
async function installSchwarzThemes(rootDir: string, buildDir: string, logger: NuxtLogger) {
  const nodeModulesDir = path.resolve(rootDir, "node_modules");
  const tempDir = path.resolve(buildDir, ".tmp");

  // TODO: should we check if themes are already installed to prevent multiple installations? How would this work with cached node_modules in CI?

  // create temporary folder so we can add the npm packages there using pnpm
  await fs.rm(tempDir, { recursive: true, force: true });
  await fs.mkdir(tempDir, { recursive: true });
  await fs.writeFile(
    path.join(tempDir, "pnpm-workspace.yaml"),
    ["packages: []", "nodeLinker: hoisted", "autoInstallPeers: false"].join("\n") + "\n",
  );

  try {
    const result = spawnSync(
      "pnpm",
      [
        "add",
        ...INTERNAL_THEMES.map((theme) => `${theme.packageName}@latest`),
        "--prefer-offline",
        "--prod",
        "--ignore-scripts",
      ],
      {
        cwd: tempDir,
        stdio: "pipe",
      },
    );

    if (result.status !== 0) {
      throw new Error(`Error while installing Schwarz internal theme npm packages`);
    }

    await fs.cp(
      path.join(tempDir, "node_modules", "@onyx-internal"),
      path.join(nodeModulesDir, "@onyx-internal"),
      {
        recursive: true,
        dereference: true,
      },
    );

    await fs.cp(path.join(tempDir, "node_modules"), nodeModulesDir, {
      recursive: true,
      dereference: true,
      filter: (src) => {
        const basename = path.basename(src);
        // Skip dot files (.pnpm, .bin) and @onyx-internal (already copied above)
        if (basename.startsWith(".") || basename === "@onyx-internal") {
          return false;
        }
        return true;
      },
    });

    logger.success("Successfully vendored Schwarz internal themes");
  } catch {
    logger.warn("Unable to vendor Schwarz internal themes. Using no-op stubs instead.");
    await Promise.all(
      INTERNAL_THEMES.map(async (theme) => {
        await writeFallbackStub(nodeModulesDir, theme.packageName);
      }),
    );
  } finally {
    // clean up
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

/**
 * Creates and writes a stub package for the given theme package.
 * Useful if downloading the actual package failed.
 */
async function writeFallbackStub(dir: string, packageName: string) {
  const packageDir = path.join(dir, packageName);
  await fs.mkdir(packageDir, { recursive: true });

  await fs.writeFile(
    path.join(packageDir, "package.json"),
    JSON.stringify(
      {
        name: packageName,
        version: "0.0.0",
        type: "module",
        stub: true,
        exports: {
          ".": "./index.css",
        },
      },
      null,
      2,
    ),
  );

  const stubContent = `/* Fallback stub for ${packageName} */`;
  await fs.writeFile(path.join(packageDir, "index.css"), stubContent.trim());
}
