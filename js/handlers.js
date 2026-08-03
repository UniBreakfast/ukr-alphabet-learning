export { makeHandleAplhabetCLick }

import { showWordGroup } from './render.js'

function makeHandleAplhabetCLick(
    wordGroups,
    wordCountByLetter,
    wordGroupByFirstLetter,
    wordGroupByRepeatingLetter,
    wordGroupByLetter,
) {
    return function handleAplhabetCLick(e) {
        const btn = e.target

        if (!btn.matches('button')) return

        const letter = btn.textContent

        showWordGroup(
            letter,
            wordGroups,
            wordCountByLetter,
            wordGroupByFirstLetter,
            wordGroupByRepeatingLetter,
            wordGroupByLetter,
        )
    }
}