import { readInputFileByNewLines } from "../utils/reader";

class Node {
    name = "";
    left;
    right;
    constructor(name: string, left: Node | undefined, right: Node | undefined) {
        this.name = name;
        this.left = left;
        this.right = right;
    }
}

function getAction(action: string, step: number) {
    return action[step % action.length];
}

async function solveA() {
    const lines = (
        await readInputFileByNewLines("../inputs/day08/input.txt")
    ).filter((x) => x != "");

    let steps = 0;

    const actions = lines[0];

    // console.log(lines);
    const nodes = new Map<string, Node>();
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].replaceAll(/\(|\)/g, "").replaceAll(" ", "");
        const data = line.split("=").map((x) => x.split(","));
        const parentNode = data[0][0];
        const leftNode = data[1][0];
        const rightNode = data[1][1];
        // console.log(parentNode, leftNode, rightNode);
        // check if left node or right node exists
        if (!nodes.has(leftNode)) {
            nodes.set(leftNode, new Node(leftNode, undefined, undefined));
        }
        if (!nodes.has(rightNode)) {
            nodes.set(rightNode, new Node(rightNode, undefined, undefined));
        }
        // check if parent node exists
        if (nodes.has(parentNode)) {
            const node = nodes.get(parentNode);
            if (!node) {
                throw new Error("Node is undefined");
            }
            node.left = nodes.get(leftNode);
            node.right = nodes.get(rightNode);
        } else {
            nodes.set(
                parentNode,
                new Node(parentNode, nodes.get(leftNode), nodes.get(rightNode))
            );
        }
    }
    // console.log(nodes);

    let currentNode = nodes.get("AAA");
    while (currentNode?.name != "ZZZ") {
        // console.log("visiting", currentNode?.name);
        const a = getAction(actions, steps);
        if (a == "L") {
            currentNode = currentNode?.left;
        } else {
            currentNode = currentNode?.right;
        }
        steps++;
    }

    console.log("Part 1:", steps);
}

async function solveB() {}

console.log("--- Day 8: Haunted Wasteland ---");
solveA();
solveB();
