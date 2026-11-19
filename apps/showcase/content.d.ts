// in tsconfig.content.ts we strictly disallow auto imports / unknown components
// but global Nuxt components like "ClientOnly" should still be available
declare module "vue" {
  interface GlobalComponents {
    ClientOnly: (typeof import("#app/components/client-only"))["default"];
  }
}

export {};
