/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram =  (s, t) => {
    let targets = t.split('')
    for(let i = 0; i < targets.length; i++) {
        let v = targets[i]
        if(s.includes(v)) {
            s = s.replace(v, '')
            continue
        }
        // if the source has anagram, we cannot reach here
        return false
    }
    // sometimes the target length is less than the source length
    //  like; (s = ab, t = a)
    //  in this case, we have to return False
    if(s.length !== 0) return false
    return true
};

describe('isAnagram', () => {
    test('', () => {
        expect(isAnagram("anagram", "nagaram")).toBeTruthy()
        expect(isAnagram("rat", "car")).toBeFalsy()
        expect(isAnagram("ab", "a")).toBeFalsy()
    })
})