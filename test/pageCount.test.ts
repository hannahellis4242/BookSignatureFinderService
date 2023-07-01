interface SignatureKey {
  [key: number]: number;
}
const pageCount = (_: SignatureKey) => 0;
describe("pageCount", () => {
  test.each([[{}, 0]])(
    "when I have a signature key of %s and I call pageCount, it should return %i",
    (signatureKey, expected) => expect(pageCount(signatureKey)).toBe(expected)
  );
});
