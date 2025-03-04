import type { OnyxDialogProps } from "../OnyxDialog/types";

export type OnyxModalDialogProps = Omit<OnyxDialogProps, "modal" | "alignment">;
