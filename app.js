import { getWords } from './js/data.js'
import {
    wordCountByFirstLetter,
    wordCountByLetter,
    wordCountByRepeatingLetter,
} from './js/stats.js'

const words = await getWords()

const wordCountByFirstLetter = countWordsByFirstLetter()
const wordCountByLetter = countWordsByLetter()
const wordCountByRepeatingLetter = countWordsByRepeatingLetter()
const wordGroupByFirstLetter = groupWordsByFirstLetter()
const wordGroupByLetter = groupWordsByLetter()
const wordGroupByRepeatingLetter = groupWordsByRepeatingLetter()

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