/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = (nums) => {
    let hash = {}
    for (let item of nums) {
        const key = item.toString()
        if(hash[key] !== undefined) {
            delete hash[key]
            continue
        }
        hash[key] = 1
    }
    return parseInt(Object.keys(hash)[0])
}

describe('singleNumber', () => {
    test('', () => {
        expect(singleNumber([2, 2, 1])).toBe(1)
        expect(singleNumber([4, 1, 2, 1, 2])).toBe(4)
    })
})