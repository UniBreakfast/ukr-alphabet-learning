const words = await getWords()
const wordCountByFirstLetter = countWordsByFirstLetter()
const wordCountByLetter = countWordsByLetter()
const wordCountByRepeatingLetter = countWordsByRepeatingLetter()

console.log({words, wordCountByFirstLetter, wordCountByLetter, wordCountByRepeatingLetter})

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

    for (const {word} of words) {
        const letter = word[0]

        if (!count[letter]) count[letter] = 0

        count[letter]++
    }

    return count
}

function countWordsByLetter() {
    const count = {}

    for (const {word} of words) {
        for (const letter of new Set(word)) {
            if (!count[letter]) count[letter] = 0

            count[letter]++
        }
    }

    return count
}

function countWordsByRepeatingLetter() {
    const count = {}

    for (const {word} of words) {
        for (const letter of word) {
            const regex = new RegExp(letter, 'g')
            const mathes = word.match(regex)    
            
            if (!count[letter]) count[letter] = 0

            if (mathes && mathes.length > 1) count[letter]++
        }
        
    }
    
    return count
}