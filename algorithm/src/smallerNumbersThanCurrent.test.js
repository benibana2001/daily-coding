/**
 * @param {number[]} nums
 * @return {number[]}
 */
const smallerNumbersThanCurrent = nums => {
    const temp = nums.slice(0)
    const ary = nums.sort(compareNum)
    let hash = {}
    for (let i = 0, len = ary.length; i < len; i++) {
        if (ary[i] === 0) {
            hash[ary[i]] = 0
        }
        // Condition to skip
        if (hash[ary[i]] !== undefined) continue
        hash[ary[i]] = i
    }
    // console.log(hash)
    for (let i = 0, len = temp.length; i < len; i++) {
        temp[i] = hash[temp[i]]
    }
    // console.log(temp)
    return temp
};
const compareNum = (a, b) => a - b

describe('defangingIpaddr', () => {
    let ary = [8, 1, 2, 2, 3]
    test('sort', () => {
        expect(ary.sort(compareNum)).toEqual([1, 2, 2, 3, 8])
        // Array.sort は破壊的に変更を加える
        console.log(ary)
    })
    test('[8,1,2,2,3]', () => {
        expect(smallerNumbersThanCurrent([8, 1, 2, 2, 3])).toEqual([4, 0, 1, 1, 3])
    })
    test('[6,5,4,8]', () => {
        expect(smallerNumbersThanCurrent([6, 5, 4, 8])).toEqual([2, 1, 0, 3])
    })
    test('[7,7,7,7]', () => {
        expect(smallerNumbersThanCurrent([7, 7, 7, 7])).toEqual([0, 0, 0, 0])
    })
    test('[5,0,10,0,10,6]', () => {
        expect(smallerNumbersThanCurrent([5, 0, 10, 0, 10, 6])).toEqual([2, 0, 4, 0, 4, 3])
    })
})