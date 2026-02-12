import type { OnyxButtonProps } from "../OnyxButton/types.js";
import type { FormInjected } from "../OnyxForm/OnyxForm.core.js";

export type OnyxSplitButtonProps = Omit<
  OnyxButtonProps,
  "label" | "icon" | "iconPosition" | "link" | "type"
> & {
  splitButtonOptions: splitButtonOption[];
  disabled?: FormInjected<boolean>;
};
type splitButtonOption = {
  label: string;
  icon?: string;
  onClickFunction: () => void;
} & Pick<OnyxButtonProps, "link" | "type">;
//* Die erste Option ([0]) dient als permanenter Hauptbutton.
//* Alle weiteren Optionen werden ausschließlich als Klick-Aktionen im Dropdown gelistet.
