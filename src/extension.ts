import * as vscode from "vscode";

import { TabView } from "./view/TabView";

export function activate(context: vscode.ExtensionContext) {
    const tabView = new TabView(context);
    context.subscriptions.push(tabView);
}

export function deactivate() {}
