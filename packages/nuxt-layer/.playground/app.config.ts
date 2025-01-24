export default defineAppConfig({
  onyxDocs: {
    app: {
      name: "App name",
      logo: "https://storybook.onyx.schwarz/onyx-logo.svg",
    },
    nav: {
      items: [
        { label: "Home", href: "/" },
        { label: "Page 1", href: "/page-1" },
        { label: "Page 2", href: "/page-2" },
      ],
    },
  },
});
