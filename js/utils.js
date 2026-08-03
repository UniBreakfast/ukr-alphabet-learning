export { normalize }

function normalize(str) {
    return str.replaceAll('á', 'а')
}