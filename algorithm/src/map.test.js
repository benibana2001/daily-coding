
describe('simple map', () => {
  test('', () => {
    const map = new Map()
    map.set('1', 'str1')
    map.set(1, 'num1')
    map.set(true, 'bool1')
    expect(map.get(1)).toBe('num1')
    expect(map.get('1')).toBe('str1')
    expect(map.get(true)).toBe('bool1')
  })

  test('Use object as a key', () => {
    const visitsCountMap = new Map()
    const visitsCountObj = {}
    const john = { name: "John" }
    visitsCountMap.set(john, 123)
    visitsCountObj[john] = -1
    expect(visitsCountMap.get(john)).toBe(123)
    expect(visitsCountObj["[object Object]"]).toBe(-1)
  })

  test('vegetable map', () => {
    const recipeMap = new Map([
      ['cucumber', 500],
      ['tomatoes', 350],
      ['onion', 50]
    ])
    const vegeKeys = () => {
      let str = ''
      for (let vege of recipeMap.keys()) { str += vege }
      return str
    }
    const vegeVals = () => {
      let num = 0
      for (let amount of recipeMap.values()) { num += amount }
      return num
    }
    const vege = () => {
      let ary = []
      for (let entry of recipeMap) { ary.push(entry) }
      return ary
    }
    expect(vegeKeys()).toBe('cucumbertomatoesonion')
    expect(vegeVals()).toBe(900)
    expect(vege()).toEqual([['cucumber', 500], ['tomatoes', 350], ['onion', 50]])
  })
})