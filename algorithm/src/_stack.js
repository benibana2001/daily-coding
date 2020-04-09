class Stack {
    /**
     * @param {any[]} ary 
     */
    constructor(ary) {
        if (ary) this.ary = ary
    }
    getBuffer() {
        return this.ary.slice()
    }
    isEmpty() {
        return this.ary.length === 0
    }
    peek() {
        return this.ary[this.ary.length - 1]
    }
    push(value) {
        return this.ary.push(value)
    }
    pop() {
        return this.ary.pop()
    }
}
/**
 * @param {Stack} stack
 * @param {number} n
 */
const stackAccessNthTopNode = (stack, n) => {
    const bufferArray = stack.getBuffer()
    if (n <= 0) throw 'error';
    const bufferStack = new Stack(bufferArray)
    while (--n !== 0) {
        bufferStack.pop()
    }
    return bufferStack.pop()
}
/**
 * 
 * @param {Stack} stack 
 * @param {any} element 
 */
const stackSearch = (stack, element) => {
    const bufferArray = stack.getBuffer()
    const bufferStack = new Stack(bufferArray)
    while (!bufferStack.isEmpty()) {
        if (bufferStack.pop() === element) return true
    }
    return false
}

const stack1 = new Stack([1, 2, 3, 4, 5, 6, 7])

console.log(stackAccessNthTopNode(stack1, 3))  // 5 
console.log(stack1.getBuffer())  // [1, 2, 3, 4, 5, 6, 7]
console.log(stackSearch(stack1, 3))  // true
console.log(stackSearch(stack1, 8))  // false