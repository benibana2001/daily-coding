/**
 * 
 * @param {number} x 
 * @returns {number}
 */
const reverse = function (x) {
    const overflowVal = Math.pow(2, 31)
    // order to check overflow.
    const max = overflowVal
    const min = - 1 * overflowVal
    const isOverFlow = outOfRange(max)(min)
    if (isOverFlow(x)) return 0
    //
    // Chcek plus or minus
    const isMinus = x < 0 ? true : false
    //
    // Start main process
    const str = String(x)
    //
    // If minus value, delete first value (delete string '-').
    const ary = isMinus ? str.split('').slice(1) : str.split('')
    const result = isMinus ? Number(reverseJoin(ary)) * (-1) : Number(reverseJoin(ary))
    if (isOverFlow(result)) return 0
    // End main process
    return result
}
/**
 * Conver Ary to string
 * @param {string[]} array 
 * @return {string}
 */
const reverseJoin = (array) => array.reverse().join('')
/**
 * To check a number in a range
 * @param {number} max 
 * @returns {(min: number) => (x: number) => boolean}
 */
// const check = (max) => (min) => (x) => (min < x) && (x < max)
const outOfRange = (max) => (min) => (x) => (x <= min) || (max <= x)

module.exports = reverse