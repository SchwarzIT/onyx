import { computed, inject, unref, type InjectionKey, type Ref } from "vue";
import type { SharedLinkProps } from "../components/OnyxRouterLink/types";
import { isInternalLink } from "../utils";
import { extractLinkProps } from "../utils/router";

/**
 * Internal behavior of the `OnyxRouterLink`. Should be used for navigation. Considers the user provided [router](https://onyx.schwarz/development/router.html).
 */
export const useLink = () => {
  const router = inject(ROUTER_INJECTION_KEY, undefined);

  /**
   * Currently active route (if router is provided).
   */
  const currentRoute = computed(() => {
    if (!router) return;
    const route = unref(router.currentRoute);
    return typeof route === "string" ? { path: route } : route;
  });

  /**
   * Handles the navigation with the user provided router if available and the link is internal.
   * Otherwise the default browser behavior of the `<a>` tag will handle the navigation.
   *
   * @param e Mouse event of a `<a>` element, e.g. from a click listener.
   * @example
   * ```vue
   * <script lang="ts" setup>
   * const { navigate } = useLink();
   * </script>
   *
   * <template>
   *   <a
   *     :href="props.href"
   *     :target="props.target"
   *     @click="navigate($event, props.href)"
   *   >
   *     <slot></slot>
   *   </a>
   * </template>
   * ```
   */
  const navigate = (e: MouseEvent, href: string) => {
    if (router && isInternalLink(href) && shouldHandleNavigation(e)) {
      // prevent actual navigation so we can handle this with the user provided router
      e.preventDefault();
      router.push(href);
    }
  };

  /**
   * Checks whether the given path is currently active based on the currently active route.
   */
  const isActive = computed(() => {
    return (link?: string | SharedLinkProps) => {
      if (!currentRoute.value || link == undefined) return false;

      const href = normalizeHref(extractLinkProps(link).href);
      const path = normalizeHref(currentRoute.value.path);
      const { hash } = currentRoute.value;

      if (href === "/") return path === href;
      if (hash && hash === href) return true;
      return path.startsWith(href);
    };
  });

  return { navigate, currentRoute, isActive };
};

/**
 * Checks whether we should handle the navigation for a given mouse event using the user provided router.
 *
 * @see: https://github.com/vuejs/router/blob/7deea23a30739af1bda56f966133848bb25d36df/packages/router/src/RouterLink.ts#L394
 */
const shouldHandleNavigation = (e: MouseEvent) => {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  // don't redirect when preventDefault called
  if (e.defaultPrevented) return;
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) return;
  // don't redirect if `target="_blank"` or a hash is used to e.g. navigate to a section of a page
  if (e.currentTarget && e.currentTarget instanceof Element) {
    const target = e.currentTarget.getAttribute("target");
    const href = e.currentTarget.getAttribute("href");
    if (target === "_blank" || href?.startsWith("#")) return;
  }

  return true;
};

/**
 * Normalized the given href by:
 * - convert "" to "/"
 * - remove trailing slashes (only if href is not "/" itself)
 * - trim whitespaces
 */
const normalizeHref = (href: string) => {
  const value = href.trim();
  if (value === "") return "/";
  if (value === "/") return value;
  return value.replace(/\/+$/, "");
};

export type ProvideRouterOptions = {
  /**
   * Programmatically navigate to a new URL.
   * @see https://router.vuejs.org/api/interfaces/Router.html#push-
   */
  push: (to: string) => void;
  /**
   * Currently active route.
   * @see https://router.vuejs.org/api/interfaces/Router.html#currentRoute
   */
  currentRoute: Ref<string | { path: string; hash?: string }>;
};

export const ROUTER_INJECTION_KEY = Symbol() as InjectionKey<ProvideRouterOptions>;
