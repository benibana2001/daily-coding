const isPalindrome = require('./palindromeNumber')

describe('isPalindrome', () => {
    test('121 - simple some value', () => {
        expect(isPalindrome(121)).toBe(true)
    })
    test('-121 - minus value', () => {
        expect(isPalindrome(-121)).toBe(false)
    })
    test('10 - first digit is zero', ()=>{
        expect(isPalindrome(10)).toBe(false)
    })
    test('0', () => {
        expect(isPalindrome(0)).toBe(true)
    })
    test('123', () => {
        expect(isPalindrome(123)).toBe(false)
    })
})