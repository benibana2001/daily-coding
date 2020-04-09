const romanToInt = require('./romanToInt')

describe('romanToInt', () => {
    test('input length is 1', () => {
        expect(romanToInt('I')).toBe(1)
        expect(romanToInt('V')).toBe(5)
        expect(romanToInt('X')).toBe(10)
        expect(romanToInt('L')).toBe(50)
        expect(romanToInt('C')).toBe(100)
        expect(romanToInt('D')).toBe(500)
        expect(romanToInt('M')).toBe(1000)
    })
    test('input length is 3', () => {
        expect(romanToInt('III')).toBe(3)
    })
    test('input IV', () => {
        expect(romanToInt('IV')).toBe(4)
    })
    test('input IX', () => {
        expect(romanToInt('IX')).toBe(9)
    })
    test('input LVIII', () => {
        expect(romanToInt('LVIII')).toBe(58)
    })
    test('input MCMXCIV', () => {
        expect(romanToInt('MCMXCIV')).toBe(1994)
    })
})