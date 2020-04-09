const aryFuncs = require('./array')
const { twoSum, twoSum2 } = aryFuncs

// test('hello', () => {
//     expect(hello()).toBe('hello')
// })

test('twoSum', () => {

    expect(twoSum([3, 4, 9, 2], 11)).toEqual([2, 3])
    expect(twoSum([3, 3], 6)).toEqual([0, 1])
    expect(twoSum([-1, 3], 2)).toEqual([0, 1])

    expect(twoSum2([3, 4, 9, 2], 11)).toEqual([2, 3])
    expect(twoSum2([3, 3], 6)).toEqual([0, 1])
    expect(twoSum2([-1, 3], 2)).toEqual([0, 1])
})