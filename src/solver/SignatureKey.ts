import getOr from "../utils/getOr";

type SignatureKey = Map<number, number>;
export default SignatureKey;

export const EmptySignatureKey = () => new Map<number, number>();
export const addSignatures = (
  signatureKey: SignatureKey,
  key: number,
  n: number
): SignatureKey => {
  const out = new Map(signatureKey);
  out.set(key, getOr(out.get(key), 0) + n);
  return out;
};

const byKey = ([a, _]: [number, number], [b, __]: [number, number]): number => {
  return b - a;
};

export const toString = (signatureKey: SignatureKey): string =>
  Array.from(signatureKey.entries())
    .sort(byKey)
    .map(([k, v]) => `${k}:${v}`)
    .join(",");
