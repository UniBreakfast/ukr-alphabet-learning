const words = await getWords()

console.log(words)

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