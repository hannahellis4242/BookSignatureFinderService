import SignatureKey, { EmptySignatureKey } from "../src/solver/SignatureKey";
import getOr from "../src/utils/getOr";

const addSignatures = (
  signatureKey: SignatureKey,
  key: number,
  n: number
): SignatureKey => {
  const out = new Map(signatureKey);
  out.set(key, getOr(out.get(key), 0) + n);
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
  test("add to existing entry", () => {
    const before = EmptySignatureKey();
    before.set(1, 3);
    const after = addSignatures(before, 1, 1);
    expect(Array.from(after.entries())).toHaveLength(1);
    expect(after.has(1)).toBeTruthy();
    expect(after.get(1)).toBe(4);
  });
  test("add to non-existant entry", () => {
    const before = EmptySignatureKey();
    before.set(1, 3);
    const after = addSignatures(before, 2, 9);
    expect(Array.from(after.entries())).toHaveLength(2);
    expect(after.has(1)).toBeTruthy();
    expect(after.get(1)).toBe(3);
    expect(after.has(2)).toBeTruthy();
    expect(after.get(2)).toBe(9);
  });
});
