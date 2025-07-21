import MyModule from "../../../src/module.js";

export default defineNuxtConfig({
  modules: [MyModule],
  onyx: { theme: "lidl" },
  compatibilityDate: "2024-07-08",
});
