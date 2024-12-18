import * as vscode from "vscode";

import { v4 as uuidv4 } from "uuid";

import { NativeTabInput, TabItem, TreeItemType } from "../type/types";

import { getNormalizedId } from "../util";

export class Tab implements TabItem {
    readonly type = TreeItemType.Tab;
    readonly id: string;
    groupId: string | null;
    path: string;
    uri: vscode.Uri;

    constructor(nativeTab: vscode.Tab, groupId: string | null = null) {
        if (!nativeTab.input || !(nativeTab.input as NativeTabInput)?.uri) {
            throw new Error("Invalid nativeTab: Missing input or uri");
        }

        this.id = `tab_${uuidv4()}`;
        this.groupId = groupId;
        this.path = getNormalizedId(nativeTab);
        this.uri = (nativeTab.input as NativeTabInput)?.uri;
    }

    toTreeItem(): vscode.TreeItem {
        const treeItem = new vscode.TreeItem(
            this.uri,
            vscode.TreeItemCollapsibleState.None
        );
        treeItem.id = this.id;
        treeItem.contextValue = "tab";
        treeItem.command = {
            command: "vscode.open",
            title: "Open Tab",
            arguments: [this.uri],
        };
        return treeItem;
    }
}
