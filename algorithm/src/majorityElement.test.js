/**
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = (nums) => {
    const m = new Map()
    const len = nums.length
    for (let i = 0; i < len; i++) {
        const key = nums[i]
        const val = m.get(nums[i])
        if (val === undefined) {
            m.set(key, 1)
        } else {
            m.set(nums[i], val + 1)
        }
    }
    console.log(m)

    for (let entry of m) {
        const key = entry[0]
        const val = entry[1]
        if(val > len/2) return key
    }
    // unreachable
    return 0
};
majorityElement([3, 2, 3])
describe('majorityElement', () => {
    test('', () => {
        expect(majorityElement([3, 2, 3])).toBe(3)
        expect(majorityElement([2, 2, 1, 1, 1, 2, 2])).toBe(2)
    })
})