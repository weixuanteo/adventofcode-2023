import { readInputFileByNewLines } from "../utils/reader";

const mapKeys = [
    "seeds:",
    "seed-to-soil",
    "soil-to-fertilizer",
    "fertilizer-to-water",
    "water-to-light",
    "light-to-temperature",
    "temperature-to-humidity",
    "humidity-to-location",
];

const mappings = new Map<string, number[][]>();

async function solveA() {
    const lines = (
        await readInputFileByNewLines("../inputs/day05/input.txt")
    ).filter((x) => x != "");
    let mapKey = "";
    let seeds: number[] = [];
    let lowest = Number.MAX_VALUE;
    for (const line of lines) {
        const lineData = line.split(" ");
        if (mapKeys.includes(lineData[0])) {
            mapKey = lineData[0];
            if (mapKey == "seeds:") {
                seeds = lineData.slice(1).map((x) => Number(x));
            } else {
                mappings.set(mapKey, new Array());
            }
        } else {
            if (lineData.length !== 3) {
                throw new Error(
                    "Invalid line data, expected src, dst, and length"
                );
            }
            const dBegin = Number(lineData[0]);
            const sBegin = Number(lineData[1]);
            const len = Number(lineData[2]);

            mappings.get(mapKey)?.push([dBegin, sBegin, len]);
        }
    }
    // console.log(mappings);
    for (const seed of seeds) {
        let current = seed;

        for (const mapKey of mapKeys.slice(1)) {
            const mapData = mappings.get(mapKey);
            if (!mapData) {
                throw new Error("Invalid map data");
            }
            for (const [dest, src, len] of mapData) {
                // check if current is within the src range
                if (current >= src && current <= src + len) {
                    const offset = current - src;
                    current = dest + offset;
                    break;
                }
            }
        }

        if (lowest > current) {
            lowest = current;
        }
    }

    console.log("Part 1: ", lowest);
}

async function solveB() {
    // TODO: come up with a better algorithm to check for lowest location faster, current design is still kind of brute force but faster

    // key idea: with a list of location (ascending order), find the corresponding seed number
    // check if the number falls within the number range, if not, continue with the next lowest location

    const lines = (
        await readInputFileByNewLines("../inputs/day05/input.txt")
    ).filter((x) => x != "");
    let mapKey = "";
    let seeds: number[][] = [];
    let lowest = Number.MAX_VALUE;
    for (const line of lines) {
        const lineData = line.split(" ");
        if (mapKeys.includes(lineData[0])) {
            mapKey = lineData[0];
            if (mapKey == "seeds:") {
                const seedsData = lineData.slice(1).map((x) => Number(x));
                for (let i = 0; i < seedsData.length; i += 2) {
                    seeds.push(seedsData.slice(i, i + 2));
                }
            } else {
                mappings.set(mapKey, new Array());
            }
        } else {
            if (lineData.length !== 3) {
                throw new Error(
                    "Invalid line data, expected src, dst, and length"
                );
            }

            mappings.get(mapKey)?.push(lineData.map((x) => Number(x))); // dst, src, len
        }
    }

    // get the min and max possible location
    let maxLoc = 0;
    const locMapData = mappings.get("humidity-to-location");
    if (!locMapData) {
        throw new Error("location map data does not exist");
    }
    for (const [dest, src, len] of locMapData) {
        if (dest + len - 1 > maxLoc) {
            maxLoc = dest + len - 1;
        }
    }

    const rMapKeys = mapKeys.toReversed().slice(0, mapKeys.length - 1);
    console.log(rMapKeys);

    for (let i = 0; i <= maxLoc; i++) {
        console.log("Checking location", i);
        let current = i;
        for (const mapKey of rMapKeys) {
            const mapData = mappings.get(mapKey);
            if (!mapData) {
                throw new Error("Invalid map data");
            }
            for (const [dest, src, len] of mapData) {
                if (current >= dest && current <= dest + len - 1) {
                    current = current - dest + src;
                    break;
                }
            }
        }

        for (const [ss, sr] of seeds) {
            if (current >= ss && current <= ss + sr - 1) {
                lowest = i;
                break;
            }
        }

        if (lowest != Number.MAX_VALUE) {
            break;
        }
    }

    console.log("Part 2: ", lowest);
}

console.log("--- Day 5: If You Give A Seed A Fertilizer ---");
solveA();
solveB();
