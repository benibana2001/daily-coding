/**
 * 隣り合う値を比較し続ける。
 * @param {number[]} ary 
 * @returns {number[]}
 */
const bubbleSort = (ary) => {
    for (let i = 0; i < ary.length; i++) {
        for (let j = ary.length - 1; i < j; j--) {
            if(ary[j] < ary[j-1]) {
                const temp = ary[j-1]
                ary[j-1] = ary[j]
                ary[j] = temp
            }
        }
    }
    return ary
}
console.log(bubbleSort([3, 4, 9, 7, 2, 1, 6]))

describe('bubbleSort', () => {
    test('', () => {
        expect(bubbleSort([3, 4, 9, 7, 2, 1, 6])).toEqual([1, 2, 3, 4, 6, 7, 9])
    })
})