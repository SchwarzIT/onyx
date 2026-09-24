import { hash } from "node:crypto";
import { globSync } from "node:fs";
import { access, constants, glob, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { Features } from "lightningcss";
import { addComponent, createResolver } from "nuxt/kit";

const monorepoRoot = fileURLToPath(new URL("../../", import.meta.url));

const CUSTOM_CACHE = fileURLToPath(
  new URL("./node_modules/.cache/register-components/", import.meta.url),
);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  extends: ["@sit-onyx/nuxt-docs"],
  modules: ["nuxt-auth-utils", "@vueuse/nuxt", "nuxt-llms"],
  css: ["@sit-onyx/tiptap/style.css"],
  app: {
    head: {
      link: [{ rel: "icon", href: "/favicon.svg" }],
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [{ code: "en", language: "en-US", file: "en-US.json", name: "English" }],
  },
  content: {
    experimental: {
      // use native Node sqlite so we don't need "better-sqlite3" dependency
      sqliteConnector: "native",
    },
  },
  llms: {
    domain: "https://your-site.com",
    title: "Your Site Name",
    description: "A brief description of your site",
  },
  vite: {
    css: {
      lightningcss: {
        // see: https://github.com/parcel-bundler/lightningcss/issues/873
        exclude: Features.LightDark,
      },
    },
    server: {
      fs: {
        allow: [monorepoRoot],
      },
    },
  },
  alias: {
    "#root": monorepoRoot,
  },
  imports: {
    transform: {
      // fix "Identifier 'h' has already been declared" error which occurs only inside this monorepo
      // see: https://github.com/nuxt/nuxt/issues/18823#issuecomment-1419704343
      exclude: [/\bpackages\/flags\b/, /\bpackages\/icons\b/],
    },
  },
  hooks: {
    async "content:file:beforeParse"(ctx) {
      if (ctx.file.extension !== ".md") {
        return;
      }
      const inlineMatcher = /^<<< (.+?)$/dgm;

      const { body, dirname = "." } = ctx.file;
      const regExpMatches = body.matchAll(inlineMatcher);
      const matches = Array.from(regExpMatches).reverse();

      let newBody = body;
      for (const match of matches) {
        const [path, ...parameters] = match[1]?.trim().split(" ") || [];
        if (!path) {
          continue;
        }
        const [complete] = match.indices || [];
        const [start, end] = complete || [];

        const { resolve } = createResolver(dirname);
        const filePath = resolve(path);
        const sourceCode = await readFile(filePath, "utf-8");
        if (parameters.includes("preview=true")) {
          const hashValue = hash("sha-1", sourceCode).substring(0, 8);
          const name = `Example${hashValue}`;
          await mkdir(CUSTOM_CACHE, { recursive: true });
          await writeFile(
            join(CUSTOM_CACHE, `${hashValue}.json`),
            JSON.stringify({ name, filePath }),
          );
          parameters.push(`previewComponent=${name}`);
        }
        const before = newBody.slice(undefined, start);
        const after = newBody.slice(end);
        const fileType = path.split(".").at(-1);
        const fileName = path.split("/").at(-1);
        newBody = `${before}
\`\`\`${fileType} [${fileName}] ${parameters.join(" ")}
${sourceCode}
\`\`\`
${after}`;
      }
      ctx.file.body = newBody;
    },
    async ready() {
      try {
        await access(CUSTOM_CACHE, constants.R_OK);
        const files = glob(join(CUSTOM_CACHE, "*.json"));
        for await (const file of files) {
          const raw = await readFile(file, { encoding: "utf-8" });
          const { filePath, name } = JSON.parse(raw) as { filePath: string; name: string };
          try {
            await access(filePath, constants.R_OK);
            addComponent({ name, filePath, global: true, priority: 1 });
          } catch (_) {
            // file path to example doesn't exist? Delete file
            unlink(file).catch(() => {});
          }
        }
      } catch (_) {
        // no cache file - nothing to do
      }
    },
    // see: https://nuxt.com/docs/4.x/getting-started/prerendering#prerenderroutes-nuxt-hook
    async "prerender:routes"(ctx) {
      const componentDirs = globSync("content/en/components/*/*");

      const componentRoutes = componentDirs.map((dir) => {
        const path = dir
          .split("/")
          .slice(2)
          .join("/")
          .replace(/(?<=\/|^)\d+\./g, "");
        return `/${path}`;
      });

      for (const route of componentRoutes) {
        ctx.routes.add(route);
      }
    },
  },
});
