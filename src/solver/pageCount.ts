import SignatureKey from "./SignatureKey";

const pageCount = (key: SignatureKey) =>
  Array.from(key.entries())
    .map(([k, v]) => 4 * k * v)
    .reduce((a, b) => a + b, 0);
export default pageCount;
