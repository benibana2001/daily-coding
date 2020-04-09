test('Proof of 0.1 is rounded. ', () => {
    console.log(0.1 + 0.2)
    console.log(Number.EPSILON)

    expect(0.1 + 0.2).not.toBe(0.3)
    expect(0.1 + 0.2 === 0.3).toBeFalsy()
    expect(0.1 + 0.2 > 0.3).toBeTruthy()
    expect(0.3 - (0.1 + 0.2) < Number.EPSILON).toBeTruthy()
    expect(0.3 - (0.1 + 0.2) < Number.MIN_SAFE_INTEGER).not.toBeTruthy()
})

test('Check the typeof Number object', () => {
    expect(typeof Number).toBe('function')
    expect(typeof Number.EPSILON).toBe('number')
    expect(typeof Number.MAX_SAFE_INTEGER).toBe('number')

    expect(Infinity > Number.MAX_SAFE_INTEGER).toBeTruthy()
})

const countFactor2 = (num) => {
    let result = 0
    while (num % 2 == 0) {
        result++
        num = num / 2
    }
    return result
}

const counterFactor3 = (num) => {
    let result = 0
    for (let i = num; i % 3 == 0; i = i / 3) {
        result++
    }
    return result
}

test('Test CountFactor2', () => {
    expect(countFactor2(10)).toBe(1)
    expect(countFactor2(100)).toBe(2)
})
test('Test CountFactor3', () => {
    expect(counterFactor3(10)).toBe(0)
    expect(counterFactor3(3)).toBe(1)
    expect(counterFactor3(4)).toBe(0)
})

const twoSum = (nums, target) => {
    for (let i = 0; i < nums.length; i += 1) {
        const want = target - nums[i]
        const startIndex = i + 1
        const newAry = nums.slice(startIndex, nums.length)
        const findIndex = newAry.findIndex((elem) => elem === want)
        if (findIndex >= 0) return [i, findIndex + startIndex]
    }
}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum2 = function(nums, target) {
    let map = new Map();
    
    for(let i = 0; i < nums.length; i ++) {
        if(map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i];
        } else {
            map.set(nums[i], i);
        }
    }
	return [];
};

test('towSum', () => {
    expect(twoSum([3, 11, 3, 15], 6)).toEqual([0, 2])
    expect(twoSum([44, 3, 3, 15], 6)).toEqual([1, 2])
    expect(twoSum([3, 3], 6)).toEqual([0, 1])
    expect(twoSum([44, 3, -1, 9], 8)).toEqual([2, 3])
})