import { optimize, PluginConfig } from "svgo";

/**
 * Optimizes the given SVG content for usage inside an icon library using [svgo](https://svgo.dev).
 * Will apply the following optimizations:
 * - remove dimensions (height/width) so it can be set via CSS
 * - "preset-default" to reduce file size and redundant information
 * - (only if type "icon"): remove all fills so the color can be set via CSS
 */
export const optimizeSvg = (svgContent: string, type: "icon" | "image" = "icon") => {
  const plugins: PluginConfig[] = [{ name: "preset-default" }, { name: "removeDimensions" }];

  if (type === "icon") {
    plugins.push({
      name: "removeAttrs",
      params: {
        // remove all fills so we can set the color via CSS
        attrs: ["fill"],
      },
    });
  }

  const { data } = optimize(svgContent, {
    multipass: true,
    plugins,
  });
  return data;
};
