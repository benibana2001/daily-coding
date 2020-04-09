const checkVar = () => {
    if (true) {
        var x = 10
    }
    return x
}
const checkLet = () => {
    if (true) {
        let x = 10
    }
    throw new Error('x is not defined!')
    // Is not reachable here.
    return x
}
test('checkVar return 10', () => {
    expect(checkVar(true, true)).toBe(10)
})
test('checkLet will be Error', () => {
    const errorCheck = () => checkLet()
    expect(errorCheck).toThrow
})

const objX = {}
const objY = {}
test('{} === {} would be false', () => {
    expect(objX === objY).toBeFalsy()
})