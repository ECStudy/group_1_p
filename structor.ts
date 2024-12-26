type Item = Tab | Group;

class Tab {
    name: string;
    type: "tab";

    constructor(name: string) {
        if (!name) throw new Error("Tab name is required.");
        this.name = name;
        this.type = "tab";
    }

    display(indent: number = 0): void {
        console.log(`${" ".repeat(indent)}📄 ${this.name}`);
    }
}

class Group {
    name: string;
    type: "group";
    children: Item[];

    constructor(name: string) {
        if (!name) throw new Error("Group name is required.");
        this.name = name;
        this.type = "group";
        this.children = [];
    }

    addItem(item: Item): void {
        if (!(item instanceof Tab || item instanceof Group)) {
            throw new Error("Only tabs or groups can be added.");
        }
        this.children.push(item);
    }

    display(indent: number = 0): void {
        console.log(`${" ".repeat(indent)}📁 ${this.name}`);
        this.children.forEach((item) => item.display(indent + 2));
    }

    findByName(name: string): Item | null {
        if (this.name === name) return this;

        for (const child of this.children) {
            if (child instanceof Tab && child.name === name) {
                return child;
            } else if (child instanceof Group) {
                const found = child.findByName(name);
                if (found) return found;
            }
        }

        return null;
    }
}

class Tree {
    root: Group;

    constructor(rootName: string) {
        this.root = new Group(rootName);
    }

    addEmptyGroup(groupName: string, newGroupName: string): boolean {
        const group = this.root.findByName(groupName);
        if (group instanceof Group) {
            group.addItem(new Group(newGroupName));
            return true;
        } else {
            console.error(`Group "${groupName}" not found or is not a group.`);
            return false;
        }
    }

    addItemToGroup(groupName: string, item: Item): boolean {
        const group = this.root.findByName(groupName);
        if (group instanceof Group) {
            group.addItem(item);
            return true;
        } else {
            console.error(`Group "${groupName}" not found or is not a group.`);
            return false;
        }
    }

    findItem(name: string): Item | null {
        return this.root.findByName(name);
    }

    display(): void {
        this.root.display();
    }
}

class TreeDataProvider {
    private trees: Map<string, Tree>;

    constructor() {
        this.trees = new Map();
    }

    // Add a new tree
    addTree(treeName: string): Tree {
        if (this.trees.has(treeName)) {
            throw new Error(`Tree with name "${treeName}" already exists.`);
        }
        const tree = new Tree(treeName);
        this.trees.set(treeName, tree);
        return tree;
    }

    // Get a tree by name
    getTree(treeName: string): Tree | null {
        return this.trees.get(treeName) || null;
    }

    // Delete a tree by name
    deleteTree(treeName: string): boolean {
        return this.trees.delete(treeName);
    }

    // Display all trees
    displayAllTrees(): void {
        this.trees.forEach((tree, name) => {
            console.log(`Tree: ${name}`);
            tree.display();
        });
    }
}

// Example usage:
const dataProvider = new TreeDataProvider();

// Add trees
const tree1 = dataProvider.addTree("Tree1");
const tree2 = dataProvider.addTree("Tree2");

// Add items to Tree1
tree1.addEmptyGroup("Tree1", "Group1");
tree1.addItemToGroup("Group1", new Tab("Tab1"));

// Add items to Tree2
tree2.addEmptyGroup("Tree2", "GroupA");
tree2.addItemToGroup("GroupA", new Tab("TabA"));

// Display all trees
dataProvider.displayAllTrees();

// Access specific tree
const specificTree = dataProvider.getTree("Tree1");
if (specificTree) {
    specificTree.display();
}

// Delete a tree
dataProvider.deleteTree("Tree1");

// Display all trees after deletion
dataProvider.displayAllTrees();