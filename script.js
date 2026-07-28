const words = []


const response = await fetch('words.txt')
const text = await response.text()
const lines = text.split(/\r?\n/).filter(Boolean).map(line => line.trim())

console.log(lines)