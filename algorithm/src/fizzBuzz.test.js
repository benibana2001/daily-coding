/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = (n) => {
    let ary = []
    const x3 = (num) => num % 3 === 0
    const x5 = (num) => num % 5 === 0
    for(let i = 1; i <= n; i++) {
        const isX3 = x3(i)
        const isX5 = x5(i)
        if(isX3 && isX5) {
            ary.push("FizzBuzz")
            continue
        }
        if(isX3 || isX5){
            if(isX3) ary.push("Fizz")
            if(isX5) ary.push("Buzz")
            continue
        }
        ary.push(String(i))
    }

    console.log(ary)
    return ary
};
describe('fizzBuzz', () => {
    test('', () => {
        expect(fizzBuzz(15)).toEqual(
            [
                "1",
                "2",
                "Fizz",
                "4",
                "Buzz",
                "Fizz",
                "7",
                "8",
                "Fizz",
                "Buzz",
                "11",
                "Fizz",
                "13",
                "14",
                "FizzBuzz"
            ]
        )
    })
})