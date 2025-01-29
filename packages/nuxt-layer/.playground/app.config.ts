export default defineAppConfig({
  onyxDocs: {
    app: {
      name: "Nuxt template",
      logo: "/onyx-logo.svg",
    },
    nav: {
      items: [
        { label: "Home", href: "/" },
        { label: "Docs", href: "/docs" },
        { label: "Code", href: "/code" },
      ],
    },
  },
});
