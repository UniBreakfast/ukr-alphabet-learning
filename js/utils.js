export { normalize, getRandomItems }

function normalize(str) {
    return str.replaceAll('á', 'а')
}

function getRandomItems(arg, count, usedItems = []) {
    const arr = [...arg]
    const items = []

    while (items.length < count && arr.length) {
        const i = Math.floor(Math.random() * arr.length)
        const item = arr[i]

        if (!usedItems.includes(item)) {
            items.push(item)
            usedItems.push(item)
        }

        arr.splice(i, 1)
    }

    return items
}
