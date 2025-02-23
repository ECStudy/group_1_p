import exp from "constants";

export const EXTENSION_ID = "tab-and-bookmark" as const;
export const TAB_VIEW = "tabview" as const;
export const BOOKMARK_VIEW = "bookmartview" as const;

export enum ACTION {
    CREATE = "create",
    DELETE = "delete",
    CLOSE = "close",
    OPEN = "open",
}

export enum Confirm {
    DELETE = "delete",
    Cancel = "cancel",
    OK = "ok",
    RECOVER = "recover",
    KEEP = "keep",
}

export enum UpdateAction {
    LABEL = "label",
    COLOR = "color",
    DESCRIPTION = "description",
}
