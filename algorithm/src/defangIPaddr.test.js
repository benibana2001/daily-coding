/**
 * @param {string} address
 * @return {string}
 */
const defangIPaddr = (address) => address.split('.').join('[.]')

describe('defangingIpaddr', () => {
    test('1.1.1.1', () => {
        expect(defangIPaddr('1.1.1.1')).toBe('1[.]1[.]1[.]1')
    })
    test('255.100.50.0', () => {
        expect(defangIPaddr('255.100.50.0')).toBe('255[.]100[.]50[.]0')
    })
})