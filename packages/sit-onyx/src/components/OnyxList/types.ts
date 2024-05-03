export type OnyxListProps = {
  /**
   * Aria label. Must be set for accessibility reasons.
   */
  label: string;
  /**
   * Available options to choose from.
   */
  items: ListItem[];
};

export type ListItem = {
  label: string;
  /**
   * Optional group name. If set, all options will be grouped under that group name.
   */
  group?: string;
};
