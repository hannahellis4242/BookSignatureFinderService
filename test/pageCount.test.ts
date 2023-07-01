type SignatureKey = Map<number, number>;
const pageCount = (key: SignatureKey) =>
  Array.from(key.entries())
    .map(([k, v]) => 4 * k * v)
    .reduce((a, b) => a + b, 0);

interface SignatureObject {
  [key: number]: number;
}
const keyFrom = (obj: SignatureObject): SignatureKey =>
  Object.entries(obj)
    .map(([k, v]) => [Number.parseInt(k), v])
    .filter(([k, _]) => !isNaN(k))
    .reduce((acc, [k, v]) => {
      acc.set(k, v);
      return acc;
    }, new Map<number, number>());

describe("pageCount", () => {
  test.each([
    [{}, 0],
    [{ 1: 1 }, 4],
    [{ 2: 2 }, 16],
    [{ 2: 2, 3: 1 }, 28],
    [{ hello: 5 }, 0],
  ])(
    "when I have a signature key of %j and I call pageCount, it should return %i",
    (list, expected) => expect(pageCount(keyFrom(list))).toBe(expected)
  );
});
