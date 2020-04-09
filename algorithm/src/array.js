const compareFunc = (x, y) => x - y
const twoSum = (arr, weight) => {
    let hashtable = {}
    for (let i = 0, arrLength = arr.length; i < arrLength; i++) {
        let currentElement = arr[i]
        let difference = weight - currentElement
        // chech the right one already exists
        // console.log(`hash[2]: ${hashtable[2]}`)
        if (hashtable[difference] !== undefined) {
            // 小さい順番にソート
            return [i, hashtable[difference]].sort(compareFunc)
        } else {
            // store index
            hashtable[currentElement] = i
        }
    }
    return -1
}
const twoSum2 = (nums, target) => {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }

};

let aryFuncs = {
    hello: () => 'hello',
    world: () => 'world!',
    twoSum: twoSum,
    twoSum2: twoSum2
}

module.exports = aryFuncs