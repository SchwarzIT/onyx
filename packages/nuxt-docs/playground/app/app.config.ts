export default defineAppConfig({
  onyxDocs: {
    nav: {
      items: [
        { label: "Home", link: "/" },
        { label: "Foo", link: "/foo" },
        { label: "Does not exist", link: "/does-not-exist" },
      ],
    },
  },
});
