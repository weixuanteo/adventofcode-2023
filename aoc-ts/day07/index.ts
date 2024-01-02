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

    console.log("Part 1:", getScore(hands, handToBid));
}

function charCountMap(str: string): Map<string, number> {
    return str.split("").reduce((map, s) => {
        map.set(s, (map.get(s) ?? 0) + 1);
        return map;
    }, new Map<string, number>());
}

function getScore(hands: string[], bids: Map<string, number>): number {
    let total = 0;
    for (let i = 0; i < hands.length; i++) {
        const bid = bids.get(hands[i]);
        if (!bid) {
            throw new Error("Invalid bid");
        }
        total += bid * (i + 1);
    }
    return total;
}

async function solveB() {
    const lines = (
        await readInputFileByNewLines("../inputs/day07/input.txt")
    ).filter((x) => x != "");

    const handToBid = new Map<string, number>();
    for (const line of lines) {
        const data = line.split(" ");
        handToBid.set(data[0], Number(data[1]));
    }
    const oldToNewHand = new Map<string, string>();
    const hands = Array.from(handToBid.keys());

    // for each hand, if there's a J, replace it with the highest count card in the hand
    for (let i = 0; i < hands.length; i++) {
        const hand = hands[i];
        const filteredHand = hand.replaceAll("J", "");
        // edge case: if all cards are J, then just keep the hand as is
        if (filteredHand === "") {
            oldToNewHand.set(hand, hand);
            continue;
        }
        const handMap = charCountMap(filteredHand);
        if (hand.includes("J")) {
            const maxCount = Math.max(...handMap.values());
            const maxCountCards = Array.from(handMap.keys()).filter(
                (x) => handMap.get(x) === maxCount
            );
            const maxCountCard = maxCountCards[0];
            const newHand = hand.replaceAll("J", maxCountCard);
            oldToNewHand.set(hand, newHand);
        } else {
            oldToNewHand.set(hand, hand);
        }
    }

    hands.sort((a, b) => {
        const newA = oldToNewHand.get(a);
        const newB = oldToNewHand.get(b);
        if (!newA || !newB) {
            throw new Error("Invalid hand, cannot find old hand");
        }
        const aMap = charCountMap(newA);
        const bMap = charCountMap(newB);
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

    console.log("Part 2:", getScore(hands, handToBid));
}

console.log("--- Day 7: Camel Cards ---");
solveA();
solveB();
