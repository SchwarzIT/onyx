export default defineAppConfig({
  onyxDocs: {
    app: {
      name: "App name",
      logo: "https://storybook.onyx.schwarz/onyx-logo.svg",
    },
    nav: {
      items: [
        { label: "Home", href: "/" },
        { label: "Code", href: "/code" },
        { label: "Blog", href: "/blog" },
      ],
    },
  },
});
