const ary2str = (str) => str.split('')
const str2aryReverse = (ary) => {
    let str = ''
    for (let i = ary.length - 1; i >= 0; i--) str += ary.pop()
    return str
}
const reverseStr = (str) => str2aryReverse(ary2str(str))
module.exports = reverseStr