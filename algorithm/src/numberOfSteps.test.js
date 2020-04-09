/**
 * @param {number} num
 * @return {number}
 */
const numberOfSteps = (num) => {
    let acc = 0
    for (let i = num; ;) {
        if (i === 0) return acc
        if (i % 2 === 0) {
            acc++
            i = i / 2
            continue
        }
        if (i % 2 === 1) {
            acc++
            i = i - 1
            continue
        }
        // Can not reach here.
        throw 'Error'
    }
};

describe('numberOfSteps', () => {
    test('14', () => {
        expect(numberOfSteps(14)).toBe(6)
    })
    test('8', () => {
        expect(numberOfSteps(8)).toBe(4)
    })
    test('123', () => {
        expect(numberOfSteps(123)).toBe(12)
    })
})