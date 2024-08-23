import { optimize } from "svgo";

/**
 * Optimizes the given SVG content for usage inside an icon library using [svgo](https://svgo.dev).
 * Will apply the following optimizations:
 * - remove all fills so the color can be set via CSS
 * - remove dimensions (height/width) so it can be set via CSS
 * - "preset-default" to reduce file size and redundant information
 */
export const optimizeSvg = (svgContent: string) => {
  const { data } = optimize(svgContent, {
    multipass: true,
    plugins: [
      { name: "preset-default" },
      { name: "removeDimensions" },
      {
        name: "removeAttrs",
        params: {
          // remove all fills so we can set the color via CSS
          attrs: ["fill"],
        },
      },
    ],
  });
  return data;
};
