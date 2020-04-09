/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0) return false
    if (x === 0) return true
    if (x % 10 === 0) return false
    if (x === Number(String(x).split('').reverse().join(''))) return true
    return false
};

module.exports = isPalindrome