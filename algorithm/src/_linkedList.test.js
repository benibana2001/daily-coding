class SinglyLinkedListNode{
  constructor(data){
    this.data = data
    this.next = null
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }

  isEmpty() {
    return this.size === 0
  }

  insert(value) {
    if(this.head === null) {
      this.head = new SinglyLinkedListNode(value)
      this.size++
      return
    }

    const temp = this.head
    this.head = new SinglyLinkedListNode(value)
    this.head.next = temp
    this.size++
  }
}

describe('SinglyLinkedList', () => {
  test('insert', () => {
    const linkedList = new SinglyLinkedList()
    linkedList.insert(1)
    linkedList.insert(12)
    expect(linkedList.size).toBe(2)
    expect(linkedList.head.data).toBe(12)
    expect(linkedList.head.next).toEqual(
      {data: 1, next: null}
    )
  })
})