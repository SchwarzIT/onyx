export type SegmentedControlElementProps = {
  value: string;
  icon?: string;
  text?: string;
  disabled?: boolean;
};
export type SegmentedControlElement = {
  value: string;
  element: HTMLElement | null;
  disabled: boolean;
};
