const reverse = require('./reverseInt')

describe('reverse', () => {
    test('one digit', ()=>{
        expect(reverse(1)).toBe(1)
    })
    test('several degit', () => {
        expect(reverse(12345)).toBe(54321)
    })
    test('max number', () => {
        expect(reverse(1534236469)).toBe(0)
    })
    test('one digit, minus', () => {
        expect(reverse(-1)).toBe(-1)
    })
    test('several digit, minus', () => {
        expect(reverse(-12345)).toBe(-54321)
    })
})