export {
    countWordsByFirstLetter,
    countWordsByLetter,
    countWordsByRepeatingLetter, 
    getKeysBelowCount,
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
