import type { Collections, ContentNavigationItem } from "@nuxt/content";

export type SidebarNavigationItem = Pick<ContentNavigationItem, "title" | "path"> & {
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
  const route = useRoute();

  const { data } = await useAsyncData(
    () => `navigation-${locale.value}`,
    () => {
      const collection = `content_${locale.value}` as const;
      return queryCollectionNavigation(collection as keyof Collections);
    },
    {
      default: () => [] as SidebarNavigationItem[],
      transform: (data) => {
        // map the items from "@nuxt/content" to our custom data scheme for better type support
        const mapItem = (item: ContentNavigationItem): SidebarNavigationItem => {
          return {
            title: item.title,
            path: item.path,
            children: item.children?.map(mapItem),
            sidebar: item.sidebar && typeof item.sidebar === "object" ? item.sidebar : undefined,
          };
        };

        return data.map(mapItem);
      },
    },
  );

  const navigation = computed(() => {
    // support multiple sidebars / roots so different pages can have their own sub-sidebar
    const root = findDeepestRoot(data.value, route.path);
    if (!root) return data.value;
    return root.children ?? [root];
  });

  const findDeepestRoot = (
    items: SidebarNavigationItem[],
    activePath: string,
  ): SidebarNavigationItem | undefined => {
    /** Helper function to check if a path exists anywhere in a node's subtree */
    const containsPath = (node: SidebarNavigationItem, path: string): boolean => {
      if (node.path === path) return true;
      return node.children?.some((child) => containsPath(child, path)) ?? false;
    };

    for (const item of items) {
      // 1. Check children first (to find something deeper)
      if (item.children) {
        const deeperResult = findDeepestRoot(item.children, activePath);
        if (deeperResult) return deeperResult;
      }

      // 2. If no deeper root was found, check if this current node is a match
      if (item.sidebar?.root && containsPath(item, activePath)) {
        return item;
      }
    }
  };

  return { navigation };
};
