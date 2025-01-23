import { type InjectionKey } from "vue";

export const useLink = () => {
  return {};
};

export type ProvideRouterOptions = {
  // https://router.vuejs.org/api/interfaces/Router.html#push-
  push: (to: string) => void;
};

export const ROUTER_INJECTION_KEY = Symbol() as InjectionKey<ProvideRouterOptions>;
