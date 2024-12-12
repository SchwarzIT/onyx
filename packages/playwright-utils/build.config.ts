import { BuildEntry, defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    { builder: "mkdist", input: "./src", pattern: ["**/*.vue"], loaders: ["vue"] },
    ...["cjs", "esm"].map<BuildEntry>((format) => ({
      builder: "mkdist",
      input: "./src",
      pattern: ["**/*.{ts,tsx}"],
      format,
      loaders: ["js"],
      ext: format === "cjs" ? "cjs" : "js",
      esbuild: {
        jsx: "automatic",
        jsxImportSource: "playwright",
      },
    })),
  ],
  declaration: true,
  clean: true,
});
