import type { Collections, ContentNavigationItem } from "@nuxt/content";

export type SidebarNavigationItem = {
  title: string;
  /**
   * Item path. Already localized for i18n with `useLocalePath`.
   */
  path: string;
  icon?: string;
  children?: SidebarNavigationItem[];
  sidebar?: SidebarNavigationOptions;
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

export const useSidebarNavigation = async () => {
  const { locale } = useI18n();
  const localePath = useLocalePath();
  const route = useRoute();

  const { data } = await useAsyncData(
    () => `navigation-${locale.value}`,
    () => {
      const collection = `content_${locale.value}` as const;
      return queryCollectionNavigation(collection as keyof Collections);
    },
    {
      default: () => [],
    },
  );

  /**
   * All navigation items.
   */
  const allItems = computed(() => {
    // map the items from "@nuxt/content" to our custom data scheme for better type support
    const mapItem = (item: ContentNavigationItem): SidebarNavigationItem => {
      return {
        title: item.title,
        path: localePath(item.path),
        children: item.children?.map(mapItem),
        sidebar: item.sidebar && typeof item.sidebar === "object" ? item.sidebar : undefined,
        icon: item.icon && typeof item.icon === "string" ? item.icon : undefined,
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
    items: SidebarNavigationItem[],
    currentPath: string,
  ): SidebarNavigationItem | undefined {
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
    items: SidebarNavigationItem[],
    currentPath: string,
    rootStack: SidebarNavigationItem[] = [],
  ): SidebarNavigationItem | undefined {
    for (const item of items) {
      // 1. Determine if current node is a nested root
      const isRoot = item.sidebar?.root === true;

      // 2. Update stack: If this is a root, add to ancestry
      const nextRootStack = isRoot ? [...rootStack, item] : rootStack;

      // 3. Check if this is the active item
      if (item.path === currentPath) {
        // Edge Case: If we are physically AT the home page, never show a back button.
        if (currentPath === "/") return undefined;

        // Case A: Deep nesting (e.g. Stack: [Modules -> Auth])
        // Return the previous root (Modules)
        if (nextRootStack.length >= 2) {
          return nextRootStack[nextRootStack.length - 2];
        }

        // Case B: First level of nesting (e.g. Stack: [Modules])
        // Return the first item in the navigation (typically a "Home" item)
        if (nextRootStack.length === 1) {
          // if the root is parat of the highest navigation level, we want to return undefined
          // (so no back button is shown), otherwise we return the first available item
          const isSameLevel = allItems.value.some((item) => item.path === nextRootStack[0]?.path);
          return isSameLevel ? undefined : allItems.value[0];
        }

        // Case C: No nested roots active (Standard Sidebar)
        return undefined;
      }

      // 4. Recursive Step
      if (item.children) {
        const result = findPreviousRootItem(item.children, currentPath, nextRootStack);
        if (result !== undefined) {
          return result;
        }
      }
    }

    return undefined;
  }

  return { navigation, allItems, previousRootItem };
};
