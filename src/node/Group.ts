import * as vscode from "vscode";
import * as path from "path";

import { v4 as uuidv4 } from "uuid";

import { RenderPayload, TabItem, TreeItemType } from "../type/types";
import { Node } from "./Node";

const groupIconPaths: { [key: string]: string } = {
    Default: "images/group_icon_Default.svg",
    Black: "images/group_icon_Black.svg",
    Blue: "images/group_icon_Blue.svg",
    Brown: "images/group_icon_Brown.svg",
    Green: "images/group_icon_Green.svg",
    Purple: "images/group_icon_Purple.svg",
    Red: "images/group_icon_Red.svg",
    White: "images/group_icon_White.svg",
    Yellow: "images/group_icon_Yellow.svg",
};

export class Group extends Node {
    readonly type = TreeItemType.Group;
    // 고유 id
    id: string;
    // 그룹 이름
    label: string;
    // 컬러코드
    color: string;
    // 접기 펼치기 여부
    collapsed: boolean;
    // 경로
    path: string;
    description?: string;

    constructor(id: string, label: string, payload?: any) {
        super(id);
        this.id = id;
        this.label = label;
        this.color = "Default";
        this.collapsed = false; // 기본적으로 열림 상태
        this.path = "";
        this.description = payload?.description || "";
    }

    render(
        context: vscode.ExtensionContext,
        payload?: RenderPayload
    ): vscode.TreeItem {
        const item = new vscode.TreeItem(
            this.label,
            this.collapsed
                ? vscode.TreeItemCollapsibleState.Collapsed //닫힘 1
                : vscode.TreeItemCollapsibleState.Expanded //열림 2
        );

        item.id = this.id;
        item.contextValue = "group";

        const iconPath =
            groupIconPaths[this.color] || groupIconPaths["Default"];
        item.iconPath = {
            light: path.join(context.extensionPath, iconPath),
            dark: path.join(context.extensionPath, iconPath),
        };

        if (
            payload?.viewDescription &&
            this.description &&
            this.description.trim() !== ""
        ) {
            item.description = this.description;
        }

        return item;
    }

    getLabel(): string {
        return this.label;
    }

    setLabel(label: string) {
        this.label = label;
    }

    setColor(color: string) {
        this.color = color;
    }

    //TODO. Tab과 로직이 동일함, 함께 가는 방법 고안
    remove(item: Group): void {
        const targetId = item.id;
        const parentNode = item.getParentNode();
        const parentNodeChildren = parentNode?.getChildren();

        if (parentNodeChildren?.length) {
            const removedChildren = parentNodeChildren?.filter(
                (group) => group.id !== targetId
            );

            parentNode?.setChildren(removedChildren);
        }
    }

    setCollapsed(collapsed: boolean) {
        this.collapsed = collapsed;
    }

    setUpdateCollapsed(collapsed: boolean) {
        //현재 노드 collapsed 업데이트
        this.setCollapsed(collapsed);
        //부모 노드 collapsed 업데이트
        const parentNode = this.getParentNode() as Group;
        if (parentNode && parentNode.type === TreeItemType.Group) {
            parentNode.setUpdateCollapsed(collapsed);
        }
    }

    setDescription(description?: string) {
        this.description = description;
    }
}
