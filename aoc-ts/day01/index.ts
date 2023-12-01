import { readInputFileByNewLines } from "../utils/reader";

const lettersToNum = new Map([
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
]);

async function solveA() {
    const lines = await readInputFileByNewLines("../inputs/day01/input.txt");
    let sum = 0;
    for (const line of lines) {
        sum += getDigits(line);
    }
    console.log("Part 1: ", sum);
}

async function solveB() {
    const lines = await readInputFileByNewLines("../inputs/day01/input.txt");
    let sum = 0;
    for (const line of lines) {
        const digits = getDigitsSmarter(line);
        sum += digits;
    }
    console.log("Part 2: ", sum);
}

function getDigits(input: string): number {
    let first = 0;
    let second = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (!isNaN(Number(char))) {
            if (first == 0) {
                first = Number.parseInt(char);
            }
            second = Number.parseInt(char);
        }
    }
    return first * 10 + second;
}

// TODO: very hacky, think about a better way with less code
function getDigitsSmarter(input: string): number {
    let first = 0;
    let firstIdx = -1;
    let second = 0;
    let secondIdx = -1;

    for (const [key, value] of lettersToNum) {
        const startIdx = input.indexOf(key);
        const endIdx = input.lastIndexOf(key);
        if (startIdx != -1) {
            if (firstIdx === -1 && secondIdx === -1) {
                first = value;
                second = value;
                firstIdx = startIdx;
                secondIdx = endIdx;
            }
            if (startIdx < firstIdx) {
                first = value;
                firstIdx = startIdx;
            }
            if (endIdx > secondIdx) {
                second = value;
                secondIdx = endIdx;
            }
        }
    }

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (!isNaN(Number(char))) {
            if (first == 0 && second == 0) {
                first = Number.parseInt(char);
                second = Number.parseInt(char);
                firstIdx = i;
                secondIdx = i;
            } else if (i < firstIdx) {
                first = Number.parseInt(char);
                firstIdx = i;
            } else if (i > secondIdx) {
                second = Number.parseInt(char);
                secondIdx = i;
            }
        }
    }
    return first * 10 + second;
}

console.log("--- Day 1: Trebuchet?! ---");
await solveA();
await solveB();
