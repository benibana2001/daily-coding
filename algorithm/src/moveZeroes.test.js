/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const moveZeroes = nums => {
    let zeroCounter = 0
    let space = []
    for(let val of nums) {
        if(val !== 0) space.push(val)
        else zeroCounter++
    }
    // ゼロを追加
    while(zeroCounter > 0) {
        space.push(0)
        zeroCounter--
    }
    // 元の配列を上書き
    for(let i = 0; i < nums.length; i++) {
        nums[i] = space[i]
    }
}

const moveZeroes2 = nums => {
    let lastNonZeroFoundAt = 0
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] !== 0) {
            nums[lastNonZeroFoundAt++] = nums[i]
        }
        console.log(lastNonZeroFoundAt)
    }
    for(let i = lastNonZeroFoundAt; i < nums.length; i++) {
        nums[i] = 0
    }
}

describe('moveZeroes2', () => {
    test('', () => {
        let ary = [0, 1, 0, 3, 12]
        let ary2 = [1, 0, 9, 0, 12, 9, 0, 0, 0, 0, 3]
        moveZeroes2(ary)
        moveZeroes2(ary2)
        expect(ary).toEqual([1, 3, 12, 0, 0])
        expect(ary2).toEqual([1, 9, 12, 9, 3, 0, 0, 0, 0, 0, 0])
    })
})