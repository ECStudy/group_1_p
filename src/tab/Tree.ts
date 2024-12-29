import * as vscode from "vscode";

import { GroupItem, TabItem } from "../type/types";

import { Group } from "./Group";
import { Tab } from "./Tab";
import { ICreateGroup } from "../type/group";
import { EventHandler } from "../EventHandler";

export class Tree extends EventHandler {
    private root: Array<Group> = [];
    private tabMap: Record<string, TabItem> = {};
    private groupMap: Record<string, Group> = {};

    getTree(): Group[] {
        return this.root;
    }

    createEmptyGroup(payload: ICreateGroup) {
        const group = new Group(
            payload.label,
            payload.parentId,
            payload.parentLabel
        );
        this.root.push(group);
        this.groupMap[group.id] = group;
        console.log("createEmptyGroup -> this.root-->", this.root);
        console.log("createEmptyGroup -> this.groupMap-->", this.groupMap);
        this.triggerEvent("create");
    }

    getGroupMap() {
        return this.groupMap;
    }
}
