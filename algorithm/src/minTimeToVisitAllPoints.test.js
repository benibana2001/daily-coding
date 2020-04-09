/**
 * @param {number[][]} points
 * @return {number}
 */
const minTimeToVisitAllPoints = (points) => {
    let result = 0
    const getAbs = (num) => num > 0 ? num : -1 * num
    for (let i = 1; i < points.length; i++) {
        const difX = getAbs(points[i][0] - points[i - 1][0])
        const difY = getAbs(points[i][1] - points[i - 1][1])
        const larger = difX >= difY ? difX : difY
        result += larger
    }
    return result
}

describe('minTimeToVisitAllPoints', () => {
    test('', () => {
        expect(minTimeToVisitAllPoints([[1, 1], [3, 4], [-1, 0]])).toBe(7)
    })
    test('', () => {
        expect(minTimeToVisitAllPoints([[3,2],[-2,2]])).toBe(5)
    })
})