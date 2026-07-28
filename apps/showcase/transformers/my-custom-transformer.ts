import { defineTransformer } from "@nuxt/content";

export default defineTransformer({
  name: "title-suffix",
  extensions: [".md"], // File extensions to apply this transformer to
  transform: async (file, options) => {
    console.log(
      "🔍 ~ transform ~ apps/showcase/transformers/my-custom-transformer.ts:10 ~ file:",
      file,
    );
    // Modify the file object as needed
    return {
      ...file,
      body: {
        ...file.body,
        value: file.body.value.map((v) => (v[0] === "component-example" ? ["code", {}, "v[1]"] : v)),
      },
    };
  },
});
