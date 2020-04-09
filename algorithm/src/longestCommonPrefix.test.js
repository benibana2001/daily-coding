/**
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = (strs) => {
    let prefix = strs[0] || ''
    for (let i = 1, len = strs.length; i < len; i++) {
        const target = strs[i]
        prefix = searchMatchPrefix(prefix, target)
    }
    return prefix
}
/**
 * @param {string} prefix 
 * @param {string} target 
 */
const searchMatchPrefix = (prefix, target) => {
    for (; target.indexOf(prefix) != 0;) {
        prefix = prefix.substring(0, prefix.length - 1)
        if (prefix.length < -1) return ''
    }
    return prefix
}

describe('longestcommonprefix', () => {
    test('searchMatchPrefix', () => {
        expect(searchMatchPrefix('abc', 'abc')).toBe('abc')
        expect(searchMatchPrefix('a', 'abc')).toBe('a')
        expect(searchMatchPrefix('ab', 'abc')).toBe('ab')
        expect(searchMatchPrefix('cd', 'abc')).toBe('')
        expect(searchMatchPrefix('flower', 'flow')).toBe('flow')
    })

    const example1 = ["flower", "flow", "flight"]
    const example2 = ["dog", "racecar", "car"]
    test('Normal pattern. Match prefix exist.', () => {
        expect(longestCommonPrefix(example1)).toBe('fl')
    })
    test('Abnormal pattern. Match prefix is none.', () => {
        expect(longestCommonPrefix(example2)).toBe('')
    })
    test('Abnormal pattern. [].', () => {
        expect(longestCommonPrefix([])).toBe('')
    })
})
