import { readInputFileByNewLines } from "../utils/reader";

async function solveA() {
    const lines = (
        await readInputFileByNewLines("../inputs/day02/input.txt")
    ).filter((x) => x != "");
    let sum = 0;

    for (const line of lines) {
        let l = line.split(": ");
        const id = l[0].split("Game ")[1];
        const games = l[1]
            .split("; ")
            .map((x) => x.split(", ").map((y) => y.split(" ")));
        let gameValid = true;
        for (const game of games) {
            let values = new Map([
                ["red", 0],
                ["green", 0],
                ["blue", 0],
            ]);
            for (const ballColor of game) {
                values.set(
                    ballColor[1],
                    values.get(ballColor[1]) + parseInt(ballColor[0])
                );
            }
            if (
                !isGamePossible(
                    values.get("red"),
                    values.get("green"),
                    values.get("blue")
                )
            ) {
                gameValid = false;
                break;
            }
        }
        if (gameValid) {
            sum += parseInt(id);
        }
    }
    console.log("Part 1: ", sum);
}

async function solveB() {
    const lines = (
        await readInputFileByNewLines("../inputs/day02/input.txt")
    ).filter((x) => x != "");
    let sum = 0;
    for (const line of lines) {
        let l = line.split(": ");
        const id = l[0].split("Game ")[1];
        const games = l[1]
            .split("; ")
            .map((x) => x.split(", ").map((y) => y.split(" ")));
        let values = new Map([
            ["red", 0],
            ["green", 0],
            ["blue", 0],
        ]);
        for (const game of games) {
            for (const ballColor of game) {
                if (values.get(ballColor[1]) < parseInt(ballColor[0])) {
                    values.set(ballColor[1], parseInt(ballColor[0]));
                }
            }
        }
        sum += values.get("red") * values.get("green") * values.get("blue");
    }

    console.log("Part 2: ", sum);
}

function isGamePossible(red: number, green: number, blue: number) {
    return red <= 12 && green <= 13 && blue <= 14;
}

console.log("--- Day 2: Cube Conundrum ---");
solveA();
solveB();
