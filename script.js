const words = await getWords()
const wordCountByFirstLetter = countWordsByFirstLetter()
const wordCountByLetter = countWordsByLetter()
const wordCountByRepeatingLetter = countWordsByRepeatingLetter()

const wordGroupByFirstLetter = groupWordsByFirstLetter()
const wordGroupByLetter = groupWordsByLetter()
const wordGroupByRepeatingLetter = groupWordsByRepeatingLetter()

const keysBelowCount = getKeysBelowCount(wordCountByLetter, 20)

const wordGroups = getWordGroups(10)

showWordGroups()

console.log(wordGroupByFirstLetter, wordGroupByLetter, wordGroupByRepeatingLetter)

console.log({ words, wordCountByFirstLetter, wordCountByLetter, wordCountByRepeatingLetter, keysBelowCount, wordGroups })

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

function normalize(str) {
    return str.replaceAll('á', 'а')
}

function countWordsByFirstLetter() {
    const count = {}

    for (const { word } of words) {
        const letter = normalize(word[0])

        if (!count[letter]) count[letter] = 0

        count[letter]++
    }

    return count
}

function countWordsByLetter() {
    const count = {}

    for (const { word } of words) {
        for (const letter of new Set(normalize(word))) {
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

function groupWordsByFirstLetter() {
    const groups = {}

    for (const { word } of words) {
        const letter = normalize(word[0])

        if (!groups[letter]) groups[letter] = []

        groups[letter].push(word)
    }

    return groups
}

function groupWordsByRepeatingLetter() {
    const groups = {}

    for (const { word } of words) {
        let letters = ''

        for (const letter of normalize(word)) {
            if (letters.includes(letter)) {
                if (!groups[letter]) groups[letter] = []

                groups[letter].push(word)

            } else {
                letters += letter
            }
        }
    }

    return groups
}

function groupWordsByLetter() {
    const groups = {}

    for (const { word } of words) {
        for (const letter of new Set(normalize(word))) {
            if (!groups[letter]) groups[letter] = []

            groups[letter].push(word)
        }
    }

    return groups
}

function getRandomItems(arg, count, usedItems = []) {
    const arr = [...arg]
    const items = []

    while (items.length < count && arr.length) {
        const i = Math.floor(Math.random() * arr.length)
        const item = arr[i]

        if (!usedItems.includes(item)) items.push(item)

        arr.splice(i, 1)
    }

    return items
}

function getWordsStarting(count, letter, usedWords) {
    const group = wordGroupByFirstLetter[letter] || []
    const words = getRandomItems(group, count, usedWords)

    return words
}

function getWordsRepeating(count, letter, usedWords) {
    const group = wordGroupByRepeatingLetter[letter] || []
    const words = getRandomItems(group, count, usedWords)

    return words
}

function getWordsContaining(count, letter, usedWords) {
    const group = wordGroupByLetter[letter] || []
    const words = getRandomItems(group, count, usedWords)

    return words
}

function getWordGroups(count) {
    const groups = {}

    const orderedLetters = getKeysByAscendingCount(wordCountByLetter)
    const usedWords = []

    for (const letter of orderedLetters) {
        const words = []

        const wordsStarting = getWordsStarting(count / 2, letter, usedWords)
        usedWords.push(...wordsStarting)

        const wordsRepeating = getWordsRepeating(count / 2, letter, usedWords)
        usedWords.push(...wordsRepeating)

        words.push(...wordsStarting, ...wordsRepeating)

        if (words.length < count) {
            const wordsContaining = getWordsContaining(count - words.length, letter, usedWords)

            usedWords.push(...wordsContaining)
            words.push(...wordsContaining)
        }

        groups[letter] = words
    }

    return groups
}

function buildCard(word, letter) {
    const card = document.createElement('li')
    let html = ''

    for (const char of word) {
        if (char == letter) {
            html += `<span class="color">${letter}</span>`

        } else {
            html += char
        }
    }

    card.innerHTML = `
        <figure>
            <img src="img/${word}.png" alt="">
            <figcaption>${html}</figcaption>
        </figure>
    `

    return card
}

function buildSection(letter, words) {
    const section = document.createElement('section')
    const h2 = document.createElement('h2')
    const ul = document.createElement('ul')

    const cards = words.map(word => buildCard(word, letter))

    h2.append(letter)
    ul.append(...cards)
    section.append(h2, ul)

    return section
}

function showWordGroups() {
    const main = document.querySelector('main')
    const sections = []

    for (const letter in wordGroups) {
        const group = wordGroups[letter]
        const section = buildSection(letter, group)

        sections.push(section)
    }

    sections.sort((a, b) => a.innerText[0].localeCompare(b.innerText[0], "uk"))
    sections.push(sections.shift())

    main.replaceChildren(...sections)
}