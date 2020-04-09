
/**
 * 
 * @param {number[]} ary 
 * @returns {number[]}
 */
const selectionSort = (ary) => {
    for (let i = 0; i < ary.length; i++) {
        let min = ary[i]
        let key = i
        for (let j = i + 1; j < ary.length; j++) {
            if (ary[j] < min) {
                min = ary[j]
                key = j
            }
        }
        let temp = ary[i]
        ary[i] = ary[key]
        ary[key] = temp
    }

    return ary
}

console.log(selectionSort([3, 5, 1, 9, 7]))