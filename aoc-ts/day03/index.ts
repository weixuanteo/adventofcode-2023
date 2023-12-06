import { readInputFileByNewLines } from "../utils/reader";

const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
]; // down, up, right, left, up-left, down-left, up-right, down-right

async function solveA() {
    const lines = (
        await readInputFileByNewLines("../inputs/day03/input.txt")
    ).filter((x) => x != "");

    const numbersIdx = new Map<string, boolean>(); // index key -> seen

    let sum = 0;

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            const char = lines[y][x];
            if (!isNaN(Number(char))) {
                numbersIdx.set(getIdxKey(y, x), false);
            }
        }
    }

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] !== "." && !numbersIdx.has(getIdxKey(y, x))) {
                for (const d of directions) {
                    const [dy, dx] = d;
                    const [ny, nx] = [y + dy, x + dx];
                    if (numbersIdx.has(getIdxKey(ny, nx))) {
                        const num = getNumberFromIdx(
                            [ny, nx],
                            numbersIdx,
                            lines
                        );
                        sum += num;
                    }
                }
            }
        }
    }

    console.log("Part 1: ", sum);
}

function getNumberFromIdx(
    idx: [number, number],
    set: Map<string, boolean>,
    lines: string[]
): number {
    // check left and right for number util undefined or a symbol
    let num = "";
    let left = idx[1];
    while (left >= 0 && set.has(getIdxKey(idx[0], left))) {
        if (set.get(getIdxKey(idx[0], left))) {
            return 0;
        }
        num = lines[idx[0]][left] + num;
        set.set(getIdxKey(idx[0], left), true);
        left -= 1;
    }
    let right = idx[1] + 1;
    while (right < lines[idx[0]].length && set.has(getIdxKey(idx[0], right))) {
        if (set.get(getIdxKey(idx[0], right))) {
            return 0;
        }
        num += lines[idx[0]][right];
        set.set(getIdxKey(idx[0], right), true);
        right++;
    }

    return Number(num);
}

function getIdxKey(y: Number, x: Number): string {
    return y + "," + x;
}

async function solveB() {
    const lines = (
        await readInputFileByNewLines("../inputs/day03/input.txt")
    ).filter((x) => x != "");

    let sum = 0;
    const numbersIdx = new Map<string, boolean>();

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            const char = lines[y][x];
            if (!isNaN(Number(char))) {
                numbersIdx.set(getIdxKey(y, x), false);
            }
        }
    }

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] === "*") {
                let partsFound = [];
                for (const d of directions) {
                    const [dy, dx] = d;
                    const [ny, nx] = [y + dy, x + dx];
                    if (numbersIdx.has(getIdxKey(ny, nx))) {
                        const num = getNumberFromIdx(
                            [ny, nx],
                            numbersIdx,
                            lines
                        );
                        if (num !== 0) {
                            partsFound.push(num);
                        }
                    }
                }
                if (partsFound.length === 2) {
                    sum += partsFound.reduce((t, v) => t * v);
                }
            }
        }
    }

    console.log("Part 2:", sum);
}

console.log("--- Day 3: Gear Ratios ---");
solveA();
solveB();
