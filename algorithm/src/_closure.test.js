const compose = (f, g) => (arg) => f(g(arg));

const testCompose = () => {
  const add1 = (value) => value + 1;
  const add10 = (value) => value + 10;
  expect(compose(add1, add10)(1)).toBe(12);
  expect(compose(add1, add10)(1)).toBe(add1(add10(1)));
};

const object = {
  empty: () => null,

  set: (key, value) => (obj) => (queryKey) => {
    if (key === queryKey) return value;
    else return object.get(queryKey)(obj);
  },

  get: (key) => (obj) => obj(key),
};

const testObject = () => {
  const robots = compose(
    object.set("C3PO", "Star Wars"),
    object.set("HAL9000", "2001: a space odessay")
  )(object.empty());

  // robots is a closure
  expect(typeof robots).toBe('function')

  expect(object.get("HAL9000")(robots)).toEqual("2001: a space odessay");
  expect(object.get("C3PO")(robots)).toEqual("Star Wars");
};

describe("_closure", () => {
  test("compose", testCompose);
  test("object", testObject);
});
