export type IconMetadata = {
  category: string;
  deprecated?: boolean;
  aliases?: string[];
};

export type GroupedIconCategory = {
  iconName: string;
  metadata: IconMetadata;
};

export type IconCategories = Record<string, GroupedIconCategory[]>;
