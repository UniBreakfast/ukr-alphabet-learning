export { showAlphabet, showWordGroup }

import { main } from './elements.js'
import { makeHandleAplhabetCLick } from "./handlers.js";
import { getWordGroups } from './grouping.js';

function showAlphabet(
    wordGroups,
    wordCountByLetter,
    wordGroupByFirstLetter,
    wordGroupByRepeatingLetter,
    wordGroupByLetter,
) {
    const ul = document.createElement('ul')
    const items = buildAlphabet(wordGroups)

    ul.classList.add('alphabet')
    ul.append(...items)

    ul.onclick = makeHandleAplhabetCLick(
        wordGroups,
        wordCountByLetter,
        wordGroupByFirstLetter,
        wordGroupByRepeatingLetter,
        wordGroupByLetter,
    )

    main.replaceChildren(ul)
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

    ul.classList.add('cards')

    const cards = words.map(word => buildCard(word, letter))

    h2.append(letter)
    ul.append(...cards)
    section.append(h2, ul)

    return section
}

function showWordGroups() {
    const sections = []

    for (const letter in wordGroups) {
        const group = wordGroups[letter]
        const section = buildSection(letter, group)

        sections.push(section)
    }


    main.replaceChildren(...sections)
}

function showWordGroup(
    letter,
    wordGroups,
    wordCountByLetter,
    wordGroupByFirstLetter,
    wordGroupByRepeatingLetter,
    wordGroupByLetter,
) {
    const group = wordGroups[letter]
    const section = buildSection(letter, group)
    const backBtn = document.createElement('button')
    const regenerateBtn = document.createElement('button')

    backBtn.append('←')
    backBtn.classList.add('back')
    backBtn.onclick = () => showAlphabet(
        wordGroups,
        wordCountByLetter,
        wordGroupByFirstLetter,
        wordGroupByRepeatingLetter,
        wordGroupByLetter,
    )

    regenerateBtn.append('↻')
    regenerateBtn.classList.add('regenerate')
    regenerateBtn.onclick = () => {
        wordGroups = getWordGroups(
            18,
            wordGroups,
            wordGroupByFirstLetter,
            wordGroupByRepeatingLetter,
            wordGroupByLetter,
        )
        showWordGroup(
            letter,
            wordGroups,
            wordCountByLetter,
            wordGroupByFirstLetter,
            wordGroupByRepeatingLetter,
            wordGroupByLetter,
        )
    }

    section.prepend(backBtn)
    section.append(regenerateBtn)

    main.replaceChildren(section)
}

function buildAlphabet(wordGroups) {
    const items = []

    for (const key in wordGroups) {
        const li = document.createElement('li')
        const button = document.createElement('button')

        button.append(key)
        li.append(button)

        items.push(li)
    }

    return items
}
