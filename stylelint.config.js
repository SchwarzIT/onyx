/** @type {import('stylelint').Config} */
export default {
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "plugin/no-unsupported-browser-features": [
      true,
      {
        // ignore CSS features that are not supported by some browser but we in onyx decide to still use
        ignore: [
          "css-overscroll-behavior",
          "css-container-query-units",
          "css-container-queries",
          "css-selection",
          "text-size-adjust",
          "css-resize",
          "css-scrollbar",
          "css-touch-action",
          "css3-cursors",
        ],
        ignorePartialSupport: true,
      },
    ],
  },
};
