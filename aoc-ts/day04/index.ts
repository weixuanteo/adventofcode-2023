import { readInputFileByNewLines } from "../utils/reader";

async function solveA() {
    const lines = (
        await readInputFileByNewLines("../inputs/day04/input.txt")
    ).filter((x) => x != "");

    let sum = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const numbers = line.split(" | ");
        const playNums = numbers[1]
            .split(" ")
            .map((x) => x.trim())
            .filter((y) => y != "");
        const winNums = numbers[0]
            .split(" ")
            .map((x) => x.trim())
            .filter((y) => !isNaN(Number(y)) && y != "");
        let gameSum = 0;
        let streak = 0;
        for (const num of playNums) {
            if (winNums.includes(num)) {
                gameSum = Math.pow(2, streak);
                streak += 1;
            }
        }
        sum += gameSum;
    }

    console.log("Part 1:", sum);
}

async function solveB() {
    const lines = (
        await readInputFileByNewLines("../inputs/day04/input.txt")
    ).filter((x) => x != "");

    let sum = 0;

    const cardCopies = new Map<number, number>();
    for (let i = 0; i < lines.length; i++) {
        cardCopies.set(i + 1, 1);
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const numbers = line.split(" | ");
        const playNums = numbers[1]
            .split(" ")
            .map((x) => x.trim())
            .filter((y) => y != "");
        const winNums = numbers[0]
            .split(" ")
            .map((x) => x.trim())
            .filter((y) => !isNaN(Number(y)) && y != "");

        let streak = 0;
        for (const num of playNums) {
            if (winNums.includes(num)) {
                streak += 1;
            }
        }
        const currCardVal = cardCopies.get(i + 1);
        if (!currCardVal) {
            throw new Error("Card " + (i + 1) + " not found");
        }
        for (let j = 1; j <= streak; j++) {
            const nextCardVal = cardCopies.get(i + 1 + j);
            if (!nextCardVal) {
                throw new Error("Card " + (i + 1 + j) + " not found");
            }
            cardCopies.set(i + 1 + j, nextCardVal + 1 * currCardVal);
        }
    }

    for (const val of cardCopies.values()) {
        sum += val;
    }

    console.log("Part 2:", sum);
}

console.log("--- Day 4: Scratchcards ---");
solveA();
solveB();
