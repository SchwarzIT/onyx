import type { OnyxBasicDialogProps } from "../OnyxBasicDialog/types.js";

export type OnyxModalProps = Omit<OnyxBasicDialogProps, "modal" | "alignment">;
