import { readInputFileByNewLines } from "../utils/reader";

const mapKeys = ["Time:", "Distance:"];

async function solveA() {
    const lines = (
        await readInputFileByNewLines("../inputs/day06/input.txt")
    ).filter((x) => x != "");

    let timeNdist = new Map();

    for (const line of lines) {
        const data = line.split(" ").filter((x) => x != "");
        timeNdist.set(
            data[0],
            data.slice(1).map((x) => Number(x))
        );
    }

    const time = timeNdist.get("Time:");
    const dist = timeNdist.get("Distance:");

    let multiply = 1;

    for (let i = 0; i < time.length; i++) {
        const raceMaxTime = time[i];
        const raceBestDist = dist[i];
        let holdTime = -1;
        let times = 0;
        for (let t = raceMaxTime; t >= 0; t--) {
            holdTime += 1;
            if (holdTime * t > raceBestDist) {
                times += 1;
            }
        }
        multiply *= times;
    }

    console.log("Part 1:", multiply);
}

async function solveB() {
    const lines = (
        await readInputFileByNewLines("../inputs/day06/input.txt")
    ).filter((x) => x != "");

    let timeNdist = new Map();

    for (const line of lines) {
        const data = line.split(" ").filter((x) => x != "");
        timeNdist.set(data[0], Number(data.slice(1).join("")));
    }

    const raceMaxTime = timeNdist.get("Time:");
    const raceBestDist = timeNdist.get("Distance:");
    let holdTime = -1;
    let times = 0;
    for (let t = raceMaxTime; t >= 0; t--) {
        holdTime += 1;
        if (holdTime * t > raceBestDist) {
            times += 1;
        }
    }

    console.log("Part 2:", times);
}

console.log("--- Day 6: Wait For It ---");
solveA();
solveB();
