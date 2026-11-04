export {};

declare module "#imports" {
  export const requireUserSession: (typeof import("nuxt-auth-utils/dist/runtime/server/utils/session"))["requireUserSession"];
}
