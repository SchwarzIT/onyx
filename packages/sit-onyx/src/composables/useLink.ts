import { inject, type InjectionKey } from "vue";
import type { LinkTarget } from "../components/OnyxLink/types";
import { isExternalLink } from "../utils";

export const useLink = () => {
  const router = inject(ROUTER_INJECTION_KEY, undefined);

  const navigate = (href: string, target: LinkTarget) => {
    const isExternal = isExternalLink(href);
    if (isExternal || !router) window.open(href, target);
    else router.push(href);
  };

  return { navigate };
};

export type ProvideRouterOptions = {
  // https://router.vuejs.org/api/interfaces/Router.html#push-
  push: (to: string) => void;
};

export const ROUTER_INJECTION_KEY = Symbol() as InjectionKey<ProvideRouterOptions>;
