/**
 * 
 * @param {number[]} ary
 * @param {number} target
 * @returns {number}
 */
const binarySearch = (ary, target) => {
    let head = 0
    let tail = ary.length - 1

    let counter = 0

    while (head <= tail) {
        counter++
        if (counter > 100) return -1

        let middle = Math.floor((head + tail) / 2)
        let middleVal = ary[middle]
        if (middleVal === target) return middle
        if (middleVal < target) head = middle
        if (middleVal > target) tail = middle
    }
    return -1
}

console.log(binarySearch([1, 2, 3, 4, 5], 4))

describe('binarySearch', () => {
    test('', () => {
        expect(binarySearch([1, 2, 3, 4, 5], 4)).toBe(3)
    })
    test('', () => {
        expect(binarySearch([1], 1)).toBe(0)
    })
    test('', () => {
        expect(binarySearch([1, 2, 3], 4)).toBe(-1)
    })
})