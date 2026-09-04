/**
 * @type {import("stylelint").Config}
 */
export default {
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "unit-disallowed-list": ["vh"],
    "plugin/no-unsupported-browser-features": [
      true,
      {
        // ignore CSS features that are not supported by some browser but we in onyx decide to still use
        ignore: [
          "css-autofill",
          "css-selection",
          "text-size-adjust",
          "css-resize",
          "css-scrollbar",
          "css-touch-action",
          "css3-cursors",
          "css3-cursors-grab",
        ],
        ignorePartialSupport: true,
      },
    ],
  },
  overrides: [
    {
      files: ["src/.vitepress/dist/assets/style.*.css"],
      rules: {
        "unit-disallowed-list": null,
      },
    },
  ],
};
