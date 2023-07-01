import SignatureKey, { EmptySignatureKey } from "../src/solver/SignatureKey";
const addSignatures = (
  signatureKey: SignatureKey,
  key: number,
  n: number
): SignatureKey => {
  const out = new Map(signatureKey);
  out.set(key, n);
  return out;
};

describe("addSignatures", () => {
  test("empty", () => {
    const before = EmptySignatureKey();
    const after = addSignatures(before, 1, 1);
    expect(Array.from(after.entries())).toHaveLength(1);
    expect(after.has(1)).toBeTruthy();
    expect(after.get(1)).toBe(1);
  });
});
