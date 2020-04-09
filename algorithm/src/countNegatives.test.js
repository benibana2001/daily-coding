/**
 * @param {number[][]} grid
 * @return {number}
 */
const countNegatives = grid => {
    let result = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] < 0) result++
        }
    }
    return result
};

describe('countNegatives', () => {
    const grid_01 = [[4, 3, 2, -1], [3, 2, 1, -1], [1, 1, -1, -2], [-1, -1, -2, -3]]
    const grid_02 = [[3, 2], [1, 0]]
    const grid_03 = [[1, -1], [-1, -1]]
    const grid_04 = [[-1]]
    test('', () => {
        expect(countNegatives(grid_01)).toBe(8)
    })
    test('', () => {
        expect(countNegatives(grid_02)).toBe(0)
    })
    test('', () => {
        expect(countNegatives(grid_03)).toBe(3)
    })
    test('', () => {
        expect(countNegatives(grid_04)).toBe(1)
    })
})