import { computed, useAsyncData, useI18n, useLocalePath, useRoute } from "#imports"; // since nuxt 4.3 the auto-imports don't work for this composable anymore; Might be related to https://github.com/nuxt/nuxt/issues/22342
import type { Collections, ContentNavigationItem } from "@nuxt/content";

export type SidebarNavigationItem<TCollection extends keyof Collections = keyof Collections> = {
  title: string;
  /**
   * Item path. Already localized for i18n with `useLocalePath`.
   */
  path: string;
  icon?: string;
  children?: SidebarNavigationItem<TCollection>[];
  sidebar?: SidebarNavigationOptions;
  /**
   * Additional fields. Must be defined when calling `useSidebarNavigation()`.
   */
  fields?: Partial<Collections[TCollection]>;
};

/**
 * Custom navigation options. Can be set via the `.navigation.yml` file inside of a content folder.
 *
 * @example
 * ```yaml
 * # .navigation.yml
 * sidebar:
 *    root: true
 * ```
 */
export type SidebarNavigationOptions = {
  /**
   * Whether this item is considered the root of the sidebar.
   * If true, items above this one will be filtered out.
   */
  root?: boolean;
  /**
   * Whether children should be initially collapsed.
   */
  collapsed?: boolean;
};

export type UseSidebarNavigationOptions<TCollection extends keyof Collections = keyof Collections> =
  {
    /**
     * Collection name to use for querying the navigation.
     */
    collection: Ref<TCollection>;
    /**
     * Additional fields to include.
     */
    fields?: (keyof Collections[TCollection])[];
  };

/**
 * Composable for querying and mapping the navigation items for a given collection.
 */
export const useSidebarNavigation = async <
  TCollection extends keyof Collections = keyof Collections,
>(
  options: UseSidebarNavigationOptions<TCollection>,
) => {
  const { locale } = useI18n();
  const localePath = useLocalePath();
  const route = useRoute();

  const { data } = await useAsyncData(
    () => `navigation-${options.collection.value}-${locale.value}`,
    () => queryCollectionNavigation(options.collection.value, options.fields),
    { default: () => [] },
  );

  /**
   * All navigation items.
   */
  const allItems = computed(() => {
    // map the items from "@nuxt/content" to our custom data scheme for better type support
    const mapItem = (item: ContentNavigationItem): SidebarNavigationItem<TCollection> => {
      const fields = options.fields?.reduce(
        (obj, field) => {
          const extraFieldValue = item[field as keyof typeof item];
          obj[field] = extraFieldValue as Collections[TCollection][typeof field];
          return obj;
        },
        {} as Collections[TCollection],
      );

      return {
        title: item.title,
        path: localePath(item.path),
        children: item.children?.map(mapItem),
        sidebar: item.sidebar && typeof item.sidebar === "object" ? item.sidebar : undefined,
        icon: item.icon && typeof item.icon === "string" ? item.icon : undefined,
        fields,
      };
    };

    return data.value.map(mapItem);
  });

  const navigation = computed(() => {
    // support multiple sidebars / roots so different pages can have their own sub-sidebar
    const root = findDeepestRoot(allItems.value, route.path);
    if (!root) return allItems.value;
    return root.children ?? [root];
  });

  /**
   * Finds the "previous root" (parent root) for the currently active route within the navigation tree.
   * Useful to e.g. display a back button to traverse up the navigation tree.
   */
  const previousRootItem = computed(() => findPreviousRootItem(allItems.value, route.path));

  /**
   * Recursively searches for the deepest item marked as a sidebar root
   * that contains the `currentPath` within its subtree.
   */
  function findDeepestRoot(
    items: SidebarNavigationItem<TCollection>[],
    currentPath: string,
  ): SidebarNavigationItem<TCollection> | undefined {
    /** Helper function to check if a path exists anywhere in a node's subtree */
    const containsPath = (node: SidebarNavigationItem, path: string): boolean => {
      if (node.path === path) return true;
      return node.children?.some((child) => containsPath(child, path)) ?? false;
    };

    for (const item of items) {
      // 1. Check children first (to find something deeper)
      if (item.children) {
        const deeperResult = findDeepestRoot(item.children, currentPath);
        if (deeperResult) return deeperResult;
      }

      // 2. If no deeper root was found, check if this current node is a match
      if (item.sidebar?.root && containsPath(item, currentPath)) {
        return item;
      }
    }
  }

  /**
   * Finds the "previous root" (parent root) for a given current path within the navigation tree.
   * - If depth >= 2: returns the previous root item
   * - If depth == 1: returns the first item in the navigation (typically a "Home" item)
   * - If depth == 0: returns undefined (no back button needed)
   *
   * @param items - The full navigation array
   * @param currentPath - The path of the currently active page
   * @param rootStack - (Internal) Accumulator for recursion
   */
  function findPreviousRootItem(
    items: SidebarNavigationItem<TCollection>[],
    currentPath: string,
    rootStack: SidebarNavigationItem<TCollection>[] = [],
  ): SidebarNavigationItem<TCollection> | undefined {
    for (const item of items) {
      const isRoot = item.sidebar?.root === true;

      // 1. update stack: if item is a root, add to ancestry
      const nextRootStack = isRoot ? [...rootStack, item] : rootStack;

      // 2. check if item is the active item
      if (item.path === currentPath) {
        // case A: deep nesting (e.g. Stack: [Home -> Examples -> Example 1])
        // return the previous root (Examples)
        if (nextRootStack.length >= 2) {
          return nextRootStack[nextRootStack.length - 2];
        }

        // case B: first level of nesting (e.g. Stack: [Home])
        // return the first item in the navigation (typically a "Home" item)
        if (nextRootStack.length === 1) {
          // if the root is part of the highest navigation level, we want to return undefined
          // (so no back button is shown), otherwise we return the first available item
          const isSameLevel = allItems.value.some((item) => item.path === nextRootStack[0]?.path);
          return isSameLevel ? undefined : allItems.value[0];
        }

        // case C: no nested roots active
        return undefined;
      }

      // 3. recursive step for children
      if (item.children) {
        const result = findPreviousRootItem(item.children, currentPath, nextRootStack);
        if (result !== undefined) {
          return result;
        }
      }
    }
  }

  return { navigation, allItems, previousRootItem };
};
