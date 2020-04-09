/**
 * @param {string[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = (s) => {
    for(let i = 0, j = s.length -1; i < j; i++, j--) {
        const temp = s[i]
        s[i] = s[j]
         s[j] = temp
    }
 }
describe('reverseString', () => {
    test('', () => {
        let hello = ["h","e","l","l","o"]
        let hannar = ["H","a","n","n","a","h"]
        reverseString(hello)
        reverseString(hannar)

        expect(hello).toEqual(["o","l","l","e","h"])
        expect(hannar).toEqual(["h","a","n","n","a","H"])
    })
})