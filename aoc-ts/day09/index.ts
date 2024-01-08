import { readInputFileByNewLines } from "../utils/reader";

const inputFile = "../inputs/day09/input.txt";
const testFile = "../inputs/day09/test.txt";

async function solveA() {
    let total = 0;
    const lines = (await readInputFileByNewLines(inputFile)).filter(
        (x) => x != ""
    );

    for (let i = 0; i < lines.length; i++) {
        let hist: number[][] = [];
        const line = lines[i];
        let numbers = line.split(" ").map((x) => parseInt(x));
        hist.push(numbers);

        hist = buildHistory(hist);

        hist[hist.length - 1].push(0);
        for (let j = hist.length - 2; j >= 0; j--) {
            const prev = hist[j + 1][hist[j + 1].length - 1];
            hist[j].push(hist[j][hist[j].length - 1] + prev);
        }

        total += hist[0][hist[0].length - 1];
    }

    console.log("Part 1:", total);
}

// TODO: can be improved by using a linked list to store the history, O(1) insertion at start and end
async function solveB() {
    let total = 0;
    const lines = (await readInputFileByNewLines(inputFile)).filter(
        (x) => x != ""
    );

    for (let i = 0; i < lines.length; i++) {
        let hist: number[][] = [];
        const line = lines[i];
        let numbers = line.split(" ").map((x) => parseInt(x));
        hist.push(numbers);

        hist = buildHistory(hist);

        hist[hist.length - 1].push(0);
        for (let j = hist.length - 2; j >= 0; j--) {
            const prev = hist[j + 1][0];
            hist[j].unshift(hist[j][0] - prev);
        }

        total += hist[0][0];
    }

    console.log("Part 2:", total);
}

function buildHistory(initial: number[][]): number[][] {
    let hist = initial;
    while (!hist[hist.length - 1].every((x) => x === 0)) {
        let newNums = [];
        for (let j = 1; j < hist[hist.length - 1].length; j++) {
            const diff =
                hist[hist.length - 1][j] - hist[hist.length - 1][j - 1];
            newNums.push(diff);
        }
        hist.push(newNums);
    }
    return hist;
}

console.log("--- Day 9: Mirage Maintenance ---");
solveA();
solveB();
