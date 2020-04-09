const reverseStr = require('./strReverse')

test('reversStr', () => {
    expect(reverseStr('str')).toEqual('rts')
    expect(reverseStr('s')).toEqual('s')
    expect(reverseStr('')).toEqual('')
})