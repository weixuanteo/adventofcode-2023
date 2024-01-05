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

function setUpNodes(lines: string[]): Map<string, Node> {
    const nodes = new Map<string, Node>();
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].replaceAll(/\(|\)/g, "").replaceAll(" ", "");
        const data = line.split("=").map((x) => x.split(","));
        const parentNode = data[0][0];
        const leftNode = data[1][0];
        const rightNode = data[1][1];
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
    return nodes;
}

async function solveA() {
    const lines = (
        await readInputFileByNewLines("../inputs/day08/input.txt")
    ).filter((x) => x != "");

    let steps = 0;

    const actions = lines[0];
    const nodes = setUpNodes(lines);

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

async function solveB() {
    const lines = (
        await readInputFileByNewLines("../inputs/day08/input.txt")
    ).filter((x) => x != "");

    const actions = lines[0];
    const nodes = setUpNodes(lines);

    // Brute force method (This will take like half a year to finish)
    // let startNodes = [...nodes].filter(([k, v]) => k[k.length - 1] === "A");
    // let currentNodes = startNodes.map(([k, v]) => v);
    // // console.log(currentNodes);
    // while (!allNodesReachedZ(currentNodes)) {
    //     for (let i = 0; i < currentNodes.length; i++) {
    //         const current = currentNodes[i];
    //         const a = getAction(actions, steps);
    //         if (a == "L") {
    //             currentNodes[i] = current.left;
    //         } else {
    //             currentNodes[i] = current.right;
    //         }
    //         // console.log(current.name, "visiting", currentNodes[i]?.name);
    //     }
    //     steps++;
    // }

    // Better approach: Use LCM of all the steps to reach Z from all the start nodes
    let startNodes = [...nodes].filter(([k, v]) => k[k.length - 1] === "A");
    let stepsToZ = [];
    for (let i = 0; i < startNodes.length; i++) {
        let current = startNodes[i][1];
        const path = [];
        let s = 0;
        while (current?.name[current?.name.length - 1] !== "Z") {
            const a = getAction(actions, s);
            if (a == "L") {
                current = current.left;
            } else {
                current = current.right;
            }
            path.push(current.name);
            s++;
        }
        stepsToZ.push(s);
    }
    console.log("Part 2:", lcm(stepsToZ));
}

function lcm(numbers: number[]): number {
    return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}

function gcd(a: number, b: number): number {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}

console.log("--- Day 8: Haunted Wasteland ---");
solveA();
solveB();
