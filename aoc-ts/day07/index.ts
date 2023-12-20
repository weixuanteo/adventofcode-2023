import { readInputFileByNewLines } from "../utils/reader";

const cardOrderRank = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
];

const cardOrderRank2 = [
    "A",
    "K",
    "Q",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "J",
];

async function solveA() {
    const lines = (
        await readInputFileByNewLines("../inputs/day07/input.txt")
    ).filter((x) => x != "");

    let total = 0;

    const handToBid = new Map<string, number>();
    for (const line of lines) {
        const data = line.split(" ");
        handToBid.set(data[0], Number(data[1]));
    }

    const hands = Array.from(handToBid.keys());
    hands.sort((a, b) => {
        const aMap = charCountMap(a);
        const bMap = charCountMap(b);
        const aCount = Math.max(...aMap.values());
        const bCount = Math.max(...bMap.values());
        if (aCount === bCount) {
            const aRemain = Array.from(aMap.values()).filter(
                (x) => x !== aCount
            );
            const bRemain = Array.from(bMap.values()).filter(
                (x) => x !== bCount
            );

            if (aRemain.length < bRemain.length) {
                return 1;
            } else if (aRemain.length > bRemain.length) {
                return -1;
            }
            // check for stronger card
            for (let i = 0; i < a.length; i++) {
                if (cardOrderRank.indexOf(a[i]) > cardOrderRank.indexOf(b[i])) {
                    return -1;
                } else if (
                    cardOrderRank.indexOf(a[i]) < cardOrderRank.indexOf(b[i])
                ) {
                    return 1;
                }
            }
            return 0;
        } else if (aCount > bCount) {
            return 1;
        } else {
            return -1;
        }
    });

    for (let i = 0; i < hands.length; i++) {
        const bid = handToBid.get(hands[i]);
        if (!bid) {
            throw new Error("Invalid bid");
        }
        total += bid * (i + 1);
    }

    console.log("Part 1:", total);
}

function charCountMap(str: string): Map<string, number> {
    return str.split("").reduce((map, s) => {
        map.set(s, (map.get(s) ?? 0) + 1);
        return map;
    }, new Map<string, number>());
}

function sortHand(hand: string[]): string[] {
    return Array();
}

// TODO: fix this code, not working on input.txt
async function solveB() {
    const lines = (
        await readInputFileByNewLines("../inputs/day07/input.txt")
    ).filter((x) => x != "");

    let total = 0;

    const handToBid = new Map<string, number>();
    for (const line of lines) {
        const data = line.split(" ");
        handToBid.set(data[0], Number(data[1]));
    }

    const hands = Array.from(handToBid.keys());
    hands.sort((a, b) => {
        const aMap = charCountMap(a);
        const bMap = charCountMap(b);
        let aCount = Math.max(
            ...Array.from(aMap)
                .filter(([k, v]) => k != "J")
                .map(([k, v]) => v)
        );
        let bCount = Math.max(
            ...Array.from(bMap)
                .filter(([k, v]) => k != "J")
                .map(([k, v]) => v)
        );
        // check for presence of J and add it to the max count
        if (aMap.has("J")) {
            aCount += aMap.get("J") ?? 0;
        }
        if (bMap.has("J")) {
            bCount += bMap.get("J") ?? 0;
        }

        if (aCount === bCount) {
            let aRemainLen,
                bRemainLen = 0;
            const aRemain = Array.from(aMap).filter(
                ([k, v]) => k != "J" && v !== aCount
            );
            const bRemain = Array.from(bMap).filter(
                ([k, v]) => k != "J" && v !== bCount
            );
            aRemainLen = aRemain.length;
            bRemainLen = bRemain.length;
            if (aMap.has("J") && aRemain.length > 0) {
                aRemainLen -= 1;
            }
            if (bMap.has("J") && bRemain.length > 0) {
                bRemainLen -= 1;
            }

            if (aRemainLen < bRemainLen) {
                return 1;
            } else if (aRemainLen > bRemainLen) {
                return -1;
            }
            // check for stronger card
            for (let i = 0; i < a.length; i++) {
                if (
                    cardOrderRank2.indexOf(a[i]) > cardOrderRank2.indexOf(b[i])
                ) {
                    return -1;
                } else if (
                    cardOrderRank2.indexOf(a[i]) < cardOrderRank2.indexOf(b[i])
                ) {
                    return 1;
                }
            }
            return 0;
        } else if (aCount > bCount) {
            return 1;
        } else {
            return -1;
        }
    });

    for (let i = 0; i < hands.length; i++) {
        const bid = handToBid.get(hands[i]);
        if (!bid) {
            throw new Error("Invalid bid");
        }
        total += bid * (i + 1);
    }

    console.log("Part 2:", total);
}

console.log("--- Day 7: Camel Cards ---");
solveA();
solveB();
