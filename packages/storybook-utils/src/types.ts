export type StorybookGlobalType<TValue> = {
  name: string;
  description: string;
  defaultValue?: TValue;
  toolbar: {
    icon: string;
    items: { value: TValue; right?: string; title: string }[];
    title?: string;
    dynamicTitle?: boolean;
  };
};
