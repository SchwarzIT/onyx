import type { OnyxDialogProps } from "../OnyxDialog/types.js";

export type OnyxModalDialogProps = Omit<OnyxDialogProps, "modal" | "alignment">;
