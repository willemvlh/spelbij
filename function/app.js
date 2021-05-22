const fs = require("fs").promises;
const shuffle = require("lodash").shuffle
const path = require("path")

const vowels = "aeiou";
const consonants = "bcdfghjklmnprstvwz"

const createGame = async () => {
    const file = path.resolve(__dirname, './assets/words.txt');
    let s = new Set();
    let words = [];

    randomElements(vowels, 3).forEach(e => s.add(e));
    randomElements(consonants, 6).forEach(e => s.add(e));

    let centerLetter = randomElement(s);
    let edgeLetters = Array.from(s).filter(l => l !== centerLetter);
    let allLetters = edgeLetters.concat(centerLetter);

    const r = await fs.readFile(file, {encoding: "utf-8"});
    let allWords = r.split("\n");
    words.push(...allWords.filter(w => w.includes(centerLetter)
        && Array.from(w).every(letter => allLetters.includes(letter))));
    return {
        centerLetter: centerLetter,
        edgeLetters: shuffle(edgeLetters),
        words: allWords,
    };
}

const randomElements = (collection, number) => {
    let count = number ?? 1;
    let elements = [];
    let arr = Array.from(collection)
    while (count > 0) {
        let index = Math.floor(Math.random() * arr.length);
        elements.push(arr[index])
        arr = arr.slice(0, index).concat(arr.slice(index + 1))
        count--;
    }
    return elements
}

const randomElement = collection => randomElements(collection, 1)[0]

exports.handler = async (_event, _context) => {
    try {
        const game = await createGame();
        return {
            statusCode: 200,
            body: JSON.stringify(game),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
    } catch (e) {
        return {
            statusCode: 500, body: JSON.stringify({error: e.toString()}), headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
    }
}
