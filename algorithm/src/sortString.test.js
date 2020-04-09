// /**
//  * @param {string} s
//  * @return {string}
//  */
// const sortString = s => {
//     function compareNumeric(a, b) {
//         if (a > b) return 1;
//         if (a == b) return 0;
//         if (a < b) return -1;
//     }
//     let ary = []
//     for (let i = 0; i < s.length; i++) {
//         ary.push(s[i])
//     }
//     ary.sort(compareNumeric)

//     let result = ''
//     let resultAry = []
//     for(let i = 0; i < ary.length; i++) {
//         const s = ary[i]
//         resultAry.push({
//             s: 0
//         })
//     }



//     return result
// };

// describe('sortString', () => {
//     test('', () => {
//         expect(sortString('aaaabbbbcccc')).toBe('abccbaabccba')
//     })
// })