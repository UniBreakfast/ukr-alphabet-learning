export {
    countWordsByFirstLetter,
    countWordsByLetter,
    countWordsByRepeatingLetter, 
    getKeysBelowCount,
    getKeysByAscendingCount,
}

import { normalize } from "./utils.js";

function countWordsByFirstLetter(words) {
    const count = {}

    for (const { word } of words) {
        const letter = normalize(word[0])

        if (!count[letter]) count[letter] = 0

        count[letter]++
    }

    return count
}

function countWordsByLetter(words) {
    const count = {}

    for (const { word } of words) {
        for (const letter of new Set(normalize(word))) {
            if (!count[letter]) count[letter] = 0

            count[letter]++
        }
    }

    return count
}

function countWordsByRepeatingLetter(words) {
    const count = {}

    for (const { word } of words) {
        let letters = ''
        for (const letter of normalize(word)) {
            if (letters.includes(letter)) {
                if (!count[letter]) count[letter] = 0

                count[letter]++
            } else {
                letters += letter
            }
        }
    }

    return count
}

function getKeysBelowCount(obj, count) {
    const keys = []

    for (const key in obj) {
        if (obj[key] < count) keys.push(key)
    }

    return keys
}

function getKeysByAscendingCount(obj) {
    const keys = Object.keys(obj)

    keys.sort((a, b) => obj[a] - obj[b])

    return keys
}