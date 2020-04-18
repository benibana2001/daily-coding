class Queue {
  /**
   * @param {any[]} array
   */
  constructor(array = null) {
    this.array = [];
    if (array) this.array = array;
  }

  getBuffer() {
    return this.array.slice();
  }

  isEmpty() {
    this.array.length === 0;
  }

  peek() {
    return this.array[0];
  }

  enqueue(value) {
    return this.array.push(value);
  }

  dequeue() {
    return this.array.shift();
  }
}

describe("Queue", () => {
  let queue1 = new Queue();
  const initializeQueue = array => () => (queue1 = new Queue(array));
  const resetQueue = initializeQueue()

  afterEach(resetQueue);

  test("enqueue", () => {
    queue1.enqueue(1);
    queue1.enqueue(2);
    queue1.enqueue(3);

    expect(queue1).toEqual({ array: [1, 2, 3] });
  });

  test("dequeue", () => {
    initializeQueue([1, 2, 3])()
    queue1.dequeue();

    expect(queue1).toEqual({ array: [2, 3] });

    console.log(queue1.getBuffer()[0])
    console.log(queue1.getBuffer()[1])
    console.log(queue1.getBuffer().length)
  });
});
