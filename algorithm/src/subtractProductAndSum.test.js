/**
 * @param {number} n
 * @return {number}
 */
const subtractProductAndSum = (n) => {
    // CONDITION: 1 <= n <= 10^5
    const hash = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]]
    for (let i = hash.length - 1; i >= 0; i--) {
        let base = (10 ** i)
        while (n >= base) {
            hash[i][1] += 1
            n -= (10 ** i)
        }
    }

    // pop
    const hashPop = () => {
        for (let i = hash.length - 1; i >= 0; i--) {
            const val = hash[i][1]
            if (val > 0) break
            hash.pop()
        }
    }

    hashPop()

    console.log(hash)

    const product = () => {
        let result = 1
        for (let i = 0; i < hash.length; i++) {
            const val = hash[i][1]
            // if (val > 0) result *= val
            result *= val
        }
        return result
    }

    const sum = () => {
        let result = 0
        for (let i = 0; i < hash.length; i++) {
            const val = hash[i][1]
            result += val
        }
        return result
    }

    return product() - sum()
}

// subtractProductAndSum(0)

describe('subtractProductAndSum', () => {
    test('', () => {
        expect(subtractProductAndSum(234)).toBe(15)
        expect(subtractProductAndSum(4421)).toBe(21)
        expect(subtractProductAndSum(705)).toBe(-12)
    })
})