import { getWords } from './js/data.js'

import {
    countWordsByFirstLetter,
    countWordsByLetter,
    countWordsByRepeatingLetter,
    getKeysBelowCount,
} from './js/stats.js'

import {
    groupWordsByFirstLetter,
    groupWordsByLetter,
    groupWordsByRepeatingLetter,
    getWordGroups,
} from './js/grouping.js'

const words = await getWords()

const wordCountByFirstLetter = countWordsByFirstLetter(words)
const wordCountByLetter = countWordsByLetter(words)
const wordCountByRepeatingLetter = countWordsByRepeatingLetter(words)
const wordGroupByFirstLetter = groupWordsByFirstLetter(words)
const wordGroupByLetter = groupWordsByLetter(words)
const wordGroupByRepeatingLetter = groupWordsByRepeatingLetter(words)

const keysBelowCount = getKeysBelowCount(wordCountByLetter, 40)

let wordGroups = getWordGroups(18)

showAlphabet()

console.log({
    words,
    wordCountByFirstLetter,
    wordCountByLetter,
    wordCountByRepeatingLetter,
    keysBelowCount,
    wordGroupByFirstLetter,
    wordGroupByLetter,
    wordGroupByRepeatingLetter,
    wordGroups,
})