export {
    groupWordsByFirstLetter,
    groupWordsByRepeatingLetter,
    groupWordsByLetter,
    getWordGroups,
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

function getWordGroups(count) {
    const groups = []

    const orderedLetters = getKeysByAscendingCount(wordCountByLetter)
    const usedWords = []

    for (const letter of orderedLetters) {
        const words = []

        const wordsStarting = getWordsStarting(count / 2, letter, usedWords)
        const wordsRepeating = getWordsRepeating(count / 2, letter, usedWords)

        words.push(...wordsStarting, ...wordsRepeating)

        if (words.length < count) {
            const wordsContaining = getWordsContaining(count - words.length, letter, usedWords)

            words.push(...wordsContaining)
        }

        groups.push([letter, words])
    }

    groups.sort((a, b) => a[0].localeCompare(b[0], "uk"))
    groups.push(groups.shift())


    return Object.fromEntries(groups)
}