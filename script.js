const words = await getWords()
const wordCountByFirstLetter = countWordsByFirstLetter()
const wordCountByLetter = countWordsByLetter()
const wordCountByRepeatingLetter = countWordsByRepeatingLetter()

const wordGroupByFirstLetter = groupWordsByFirstLetter()
const wordGroupByLetter = groupWordsByLetter()
const wordGroupByRepeatingLetter = groupWordsByRepeatingLetter()

const keysBelowCount = getKeysBelowCount(wordCountByLetter, 20)

getWordGroups(11)

console.log(wordGroupByFirstLetter, wordGroupByLetter, wordGroupByRepeatingLetter)

console.log({ words, wordCountByFirstLetter, wordCountByLetter, wordCountByRepeatingLetter, keysBelowCount })

async function getWords() {
    const response = await fetch('words.txt')
    const text = await response.text()
    const lines = text.split(/\r?\n/).filter(Boolean).map(line => line.trim())
    const words = []

    let category = ''

    for (const line of lines) {
        if (line == line.toUpperCase()) {
            category = line.toLowerCase()
        } else {
            const word = line
            words.push({ word, category })
        }
    }

    return words
}

function countWordsByFirstLetter() {
    const count = {}

    for (const { word } of words) {
        const letter = word[0]

        if (!count[letter]) count[letter] = 0

        count[letter]++
    }

    return count
}

function countWordsByLetter() {
    const count = {}

    for (const { word } of words) {
        for (const letter of new Set(word)) {
            if (!count[letter]) count[letter] = 0

            count[letter]++
        }
    }

    return count
}

function countWordsByRepeatingLetter() {
    const count = {}

    for (const { word } of words) {
        let letters = ''
        for (const letter of word) {
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

function groupWordsByFirstLetter() {
    const groups = {}

    for (const { word } of words) {
        const letter = word[0]

        if (!groups[letter]) groups[letter] = []

        groups[letter].push(word)
    }

    return groups
}

function groupWordsByRepeatingLetter() {

}

function groupWordsByLetter() {

}

function getWordGroups(count) {
    const groups = {}

    const orderedLetters = getKeysByAscendingCount(wordCountByLetter)

    for (const letter of orderedLetters) {
        // const wordsStarting = getWordsStarting(count, letter)
        // const wordsRepeating = getWordsRepeating(count, letter)

    }
    
    return groups
}