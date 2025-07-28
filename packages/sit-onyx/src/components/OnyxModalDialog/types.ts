import type { OnyxSupportDialogProps } from "../OnyxSupportDialog/types.js";

export type OnyxModalDialogProps = Omit<OnyxSupportDialogProps, "modal" | "alignment">;
