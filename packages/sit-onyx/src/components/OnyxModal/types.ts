import type { OnyxSupportDialogProps } from "../OnyxSupportDialog/types.js";

export type OnyxModalProps = Omit<OnyxSupportDialogProps, "modal" | "alignment">;
