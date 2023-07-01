import pageCount from "../src/solver/pageCount";
import SignatureKey from "../src/solver/SignatureKey";
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
  ])(
    "when I have a signature key of %j and I call pageCount, it should return %i",
    (list, expected) => expect(pageCount(keyFrom(list))).toBe(expected)
  );
});
